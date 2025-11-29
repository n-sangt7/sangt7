<?php
require_once 'connect.php';

class CartManager {
    private $conn;
    
    public function __construct($connection) {
        $this->conn = $connection;
    }
    
    // Thêm sản phẩm vào giỏ hàng
    public function addToCart($userId, $productId, $quantity = 1) {
        // Kiểm tra sản phẩm tồn tại và còn hàng
        $productCheck = $this->conn->prepare("SELECT SoLuong FROM sanpham WHERE MaSP = ?");
        $productCheck->bind_param("s", $productId);
        $productCheck->execute();
        $result = $productCheck->get_result();
        
        if ($result->num_rows === 0) {
            return ['success' => false, 'message' => 'Sản phẩm không tồn tại'];
        }
        
        $product = $result->fetch_assoc();
        if ($product['SoLuong'] < $quantity) {
            return ['success' => false, 'message' => 'Số lượng sản phẩm không đủ'];
        }
        
        // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
        $checkQuery = $this->conn->prepare("SELECT * FROM giohang WHERE UserID = ? AND MaSP = ?");
        $checkQuery->bind_param("is", $userId, $productId);
        $checkQuery->execute();
        $checkResult = $checkQuery->get_result();
        
        if ($checkResult->num_rows > 0) {
            // Cập nhật số lượng nếu đã có
            $updateQuery = $this->conn->prepare("UPDATE giohang SET SoLuong = SoLuong + ? WHERE UserID = ? AND MaSP = ?");
            $updateQuery->bind_param("iis", $quantity, $userId, $productId);
            $success = $updateQuery->execute();
        } else {
            // Thêm mới vào giỏ hàng
            $insertQuery = $this->conn->prepare("INSERT INTO giohang (UserID, MaSP, SoLuong) VALUES (?, ?, ?)");
            $insertQuery->bind_param("isi", $userId, $productId, $quantity);
            $success = $insertQuery->execute();
        }
        
        if ($success) {
            return ['success' => true, 'message' => 'Đã thêm vào giỏ hàng'];
        } else {
            return ['success' => false, 'message' => 'Lỗi khi thêm vào giỏ hàng'];
        }
    }
    
    // Lấy giỏ hàng đơn giản (dùng cho get_cart.php)
    public function getCartSimple($userId) {
        $query = $this->conn->prepare("
            SELECT g.MaGioHang, g.MaSP, g.SoLuong, 
                   s.TenSP, s.Gia, s.AnhSP, s.SoLuong as TonKho,
                   d.TenDM,
                   (g.SoLuong * s.Gia) as item_total
            FROM giohang g
            JOIN sanpham s ON g.MaSP = s.MaSP
            JOIN danhmuc d ON s.MaDM = d.MaDM
            WHERE g.UserID = ?
            ORDER BY g.NgayThem DESC
        ");
        $query->bind_param("i", $userId);
        $query->execute();
        $result = $query->get_result();
        
        $cartItems = [];
        $totalPrice = 0;
        $totalItems = 0;
        
        while ($row = $result->fetch_assoc()) {
            $itemTotal = $row['Gia'] * $row['SoLuong'];
            $totalPrice += $itemTotal;
            $totalItems += $row['SoLuong'];
            
            $cartItems[] = [
                'cart_id' => $row['MaGioHang'],
                'product_id' => $row['MaSP'],
                'product_name' => $row['TenSP'],
                'price' => $row['Gia'],
                'quantity' => $row['SoLuong'],
                'image' => $row['AnhSP'],
                'stock' => $row['TonKho'],
                'category' => $row['TenDM'],
                'item_total' => $itemTotal
            ];
        }
        
        return [
            'items' => $cartItems,
            'total_price' => $totalPrice,
            'total_items' => $totalItems
        ];
    }
    
    // Lấy số lượng sản phẩm trong giỏ hàng
    public function getCartCount($userId) {
        $query = $this->conn->prepare("SELECT SUM(SoLuong) as total FROM giohang WHERE UserID = ?");
        $query->bind_param("i", $userId);
        $query->execute();
        $result = $query->get_result();
        $row = $result->fetch_assoc();
        
        return $row['total'] ? $row['total'] : 0;
    }
    
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    public function updateCartItem($cartId, $userId, $quantity) {
        if ($quantity <= 0) {
            return $this->removeFromCart($cartId, $userId);
        }
        
        // Kiểm tra quyền sở hữu
        $checkQuery = $this->conn->prepare("SELECT g.MaSP, s.SoLuong as TonKho FROM giohang g JOIN sanpham s ON g.MaSP = s.MaSP WHERE g.MaGioHang = ? AND g.UserID = ?");
        $checkQuery->bind_param("ii", $cartId, $userId);
        $checkQuery->execute();
        $result = $checkQuery->get_result();
        
        if ($result->num_rows === 0) {
            return ['success' => false, 'message' => 'Sản phẩm không tồn tại trong giỏ hàng'];
        }
        
        $item = $result->fetch_assoc();
        if ($item['TonKho'] < $quantity) {
            return ['success' => false, 'message' => 'Số lượng sản phẩm không đủ'];
        }
        
        $updateQuery = $this->conn->prepare("UPDATE giohang SET SoLuong = ? WHERE MaGioHang = ? AND UserID = ?");
        $updateQuery->bind_param("iii", $quantity, $cartId, $userId);
        
        if ($updateQuery->execute()) {
            return ['success' => true, 'message' => 'Đã cập nhật giỏ hàng'];
        } else {
            return ['success' => false, 'message' => 'Lỗi khi cập nhật giỏ hàng'];
        }
    }
    
    // Xóa sản phẩm khỏi giỏ hàng
    public function removeFromCart($cartId, $userId) {
        $query = $this->conn->prepare("DELETE FROM giohang WHERE MaGioHang = ? AND UserID = ?");
        $query->bind_param("ii", $cartId, $userId);
        
        if ($query->execute()) {
            return ['success' => true, 'message' => 'Đã xóa sản phẩm khỏi giỏ hàng'];
        } else {
            return ['success' => false, 'message' => 'Lỗi khi xóa sản phẩm'];
        }
    }
    
    // Xóa toàn bộ giỏ hàng
    public function clearCart($userId) {
        $query = $this->conn->prepare("DELETE FROM giohang WHERE UserID = ?");
        $query->bind_param("i", $userId);
        
        if ($query->execute()) {
            return ['success' => true, 'message' => 'Đã xóa toàn bộ giỏ hàng'];
        } else {
            return ['success' => false, 'message' => 'Lỗi khi xóa giỏ hàng'];
        }
    }
}

// Khởi tạo CartManager
$cartManager = new CartManager($conn);
?>