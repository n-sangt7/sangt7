<?php
session_start();
require_once 'connect.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng đăng nhập']);
    exit;
}

$user_id = $_SESSION['user_id'];
$action = $_GET['action'] ?? '';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        switch ($action) {
            case 'add':
                addToCart($user_id, $input);
                break;
            case 'update':
                updateCartItem($user_id, $input);
                break;
            case 'remove':
                removeCartItem($user_id, $input);
                break;
            case 'clear':
                clearCart($user_id);
                break;
            case 'get':
                getCart($user_id);
                break;
            default:
                echo json_encode(['success' => false, 'message' => 'Action không hợp lệ: ' . $action]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Method không hợp lệ']);
    }
} catch (Exception $e) {
    error_log("Cart API Error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Lỗi server: ' . $e->getMessage()]);
}

function addToCart($user_id, $data) {
    global $conn;
    
    if (!isset($data['product_id']) || !isset($data['quantity'])) {
        echo json_encode(['success' => false, 'message' => 'Thiếu thông tin sản phẩm']);
        return;
    }
    
    $product_id = $conn->real_escape_string($data['product_id']);
    $quantity = intval($data['quantity']);
    
    // Kiểm tra sản phẩm tồn tại
    $product_check = $conn->query("SELECT * FROM sanpham WHERE MaSP = '$product_id'");
    if ($product_check->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Sản phẩm không tồn tại']);
        return;
    }
    
    $product = $product_check->fetch_assoc();
    
    // Kiểm tra số lượng tồn kho
    if ($product['SoLuong'] < $quantity) {
        echo json_encode(['success' => false, 'message' => 'Số lượng sản phẩm trong kho không đủ']);
        return;
    }
    
    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    $cart_check = $conn->query("SELECT * FROM giohang WHERE UserID = $user_id AND MaSP = '$product_id'");
    
    if ($cart_check->num_rows > 0) {
        // Cập nhật số lượng
        $cart_item = $cart_check->fetch_assoc();
        $new_quantity = $cart_item['SoLuong'] + $quantity;
        
        if ($product['SoLuong'] < $new_quantity) {
            echo json_encode(['success' => false, 'message' => 'Số lượng sản phẩm vượt quá tồn kho']);
            return;
        }
        
        $update_stmt = $conn->prepare("UPDATE giohang SET SoLuong = ? WHERE MaGioHang = ?");
        $update_stmt->bind_param("ii", $new_quantity, $cart_item['MaGioHang']);
        
        if ($update_stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Đã cập nhật số lượng sản phẩm trong giỏ hàng']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Lỗi khi cập nhật giỏ hàng: ' . $conn->error]);
        }
    } else {
        // Thêm mới vào giỏ hàng
        $insert_stmt = $conn->prepare("INSERT INTO giohang (UserID, MaSP, SoLuong) VALUES (?, ?, ?)");
        $insert_stmt->bind_param("isi", $user_id, $product_id, $quantity);
        
        if ($insert_stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Đã thêm sản phẩm vào giỏ hàng']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Lỗi khi thêm vào giỏ hàng: ' . $conn->error]);
        }
    }
}

function updateCartItem($user_id, $data) {
    global $conn;
    
    if (!isset($data['cart_id']) || !isset($data['quantity'])) {
        echo json_encode(['success' => false, 'message' => 'Thiếu thông tin']);
        return;
    }
    
    $cart_id = intval($data['cart_id']);
    $quantity = intval($data['quantity']);
    
    // Kiểm tra quyền sở hữu
    $check = $conn->query("SELECT g.*, s.SoLuong as stock FROM giohang g 
                          JOIN sanpham s ON g.MaSP = s.MaSP 
                          WHERE g.MaGioHang = $cart_id AND g.UserID = $user_id");
    
    if ($check->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Sản phẩm không tồn tại trong giỏ hàng']);
        return;
    }
    
    $item = $check->fetch_assoc();
    
    // Kiểm tra tồn kho
    if ($quantity > $item['stock']) {
        echo json_encode(['success' => false, 'message' => 'Số lượng vượt quá tồn kho (chỉ còn ' . $item['stock'] . ' sản phẩm)']);
        return;
    }
    
    $update_stmt = $conn->prepare("UPDATE giohang SET SoLuong = ? WHERE MaGioHang = ?");
    $update_stmt->bind_param("ii", $quantity, $cart_id);
    
    if ($update_stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Đã cập nhật số lượng']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi khi cập nhật']);
    }
}

function removeCartItem($user_id, $data) {
    global $conn;
    
    if (!isset($data['cart_id'])) {
        echo json_encode(['success' => false, 'message' => 'Thiếu thông tin']);
        return;
    }
    
    $cart_id = intval($data['cart_id']);
    
    // Kiểm tra quyền sở hữu
    $check = $conn->query("SELECT * FROM giohang WHERE MaGioHang = $cart_id AND UserID = $user_id");
    
    if ($check->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Sản phẩm không tồn tại trong giỏ hàng']);
        return;
    }
    
    $delete_stmt = $conn->prepare("DELETE FROM giohang WHERE MaGioHang = ?");
    $delete_stmt->bind_param("i", $cart_id);
    
    if ($delete_stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Đã xóa sản phẩm khỏi giỏ hàng']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi khi xóa sản phẩm']);
    }
}

function clearCart($user_id) {
    global $conn;
    
    $delete_stmt = $conn->prepare("DELETE FROM giohang WHERE UserID = ?");
    $delete_stmt->bind_param("i", $user_id);
    
    if ($delete_stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Đã xóa toàn bộ giỏ hàng']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi khi xóa giỏ hàng']);
    }
}

function getCart($user_id) {
    global $conn;
    
    // SỬA LỖI: Loại bỏ NgayThem không tồn tại
    $query = "SELECT g.MaGioHang as cart_id, g.MaSP, g.SoLuong as quantity, 
                     s.TenSP as name, s.Gia as price, s.AnhSP as image, 
                     s.SoLuong as stock, d.TenDM as category,
                     (g.SoLuong * s.Gia) as item_total
              FROM giohang g
              JOIN sanpham s ON g.MaSP = s.MaSP
              JOIN danhmuc d ON s.MaDM = d.MaDM
              WHERE g.UserID = $user_id
              ORDER BY g.MaGioHang DESC";
    
    $result = $conn->query($query);
    
    $cart_items = [];
    $total = 0;
    $total_items = 0;
    
    while ($row = $result->fetch_assoc()) {
        $cart_items[] = $row;
        $total += $row['item_total'];
        $total_items += $row['quantity'];
    }
    
    echo json_encode([
        'success' => true,
        'cart_items' => $cart_items,
        'total' => $total,
        'total_items' => $total_items
    ]);
}

$conn->close();
?>