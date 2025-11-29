<?php
include '../php/connect.php';
header('Content-Type: application/json');

// GET: Lấy danh sách đơn hàng hoặc chi tiết đơn hàng
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Nếu có orderId thì lấy chi tiết đơn hàng
    if (isset($_GET['orderId'])) {
        $orderId = (int)$_GET['orderId'];
        
        // Lấy thông tin đơn hàng
        $orderQuery = $conn->query("
            SELECT dh.*, u.Username, u.Email, tt.PhuongThuc, vc.*
            FROM donhang dh
            LEFT JOIN user u ON dh.UserID = u.UserID
            LEFT JOIN thanhtoan tt ON dh.MaDH = tt.MaDH
            LEFT JOIN vanchuyen vc ON dh.MaDH = vc.MaDH
            WHERE dh.MaDH = $orderId
        ");
        
        if ($orderQuery->num_rows > 0) {
            $order = $orderQuery->fetch_assoc();
            
            // Lấy chi tiết sản phẩm trong đơn hàng
            $itemsQuery = $conn->query("
                SELECT ctdh.*, sp.TenSP, sp.AnhSP
                FROM chitietdonhang ctdh
                LEFT JOIN sanpham sp ON ctdh.MaSP = sp.MaSP
                WHERE ctdh.MaDH = $orderId
            ");
            
            $orderItems = [];
            while ($item = $itemsQuery->fetch_assoc()) {
                $orderItems[] = $item;
            }
            
            echo json_encode([
                'success' => true,
                'order' => $order,
                'orderItems' => $orderItems
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Không tìm thấy đơn hàng']);
        }
    } else {
        // Lấy danh sách đơn hàng (code hiện tại)
        $status = isset($_GET['status']) ? $_GET['status'] : '';
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 0;
        
        $where = '';
        if ($status && $status !== 'all') {
            $where = " WHERE dh.TrangThai = '$status'";
        }
        
        $limitClause = '';
        if ($limit > 0) {
            $limitClause = " LIMIT $limit";
        }
        
        $result = $conn->query("
            SELECT dh.*, u.Username, u.Email, tt.PhuongThuc
            FROM donhang dh
            LEFT JOIN user u ON dh.UserID = u.UserID
            LEFT JOIN thanhtoan tt ON dh.MaDH = tt.MaDH
            $where
            ORDER BY dh.NgayDat DESC
            $limitClause
        ");
        
        $orders = [];
        while ($row = $result->fetch_assoc()) {
            $orders[] = $row;
        }

        echo json_encode([
            'success' => true,
            'orders' => $orders
        ]);
    }
}

// PUT: Cập nhật trạng thái đơn hàng (giữ nguyên)
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $maDH = (int)$data['maDH'];
    $trangThai = $conn->real_escape_string($data['trangThai']);

    $sql = "UPDATE donhang SET TrangThai = '$trangThai' WHERE MaDH = $maDH";
    
    if ($conn->query($sql)) {
        echo json_encode(['success' => true, 'message' => 'Cập nhật trạng thái thành công']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $conn->error]);
    }
}
?>