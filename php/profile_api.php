<?php
session_start();
require_once 'connect.php';

header('Content-Type: application/json');

// Kiểm tra đăng nhập
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Chưa đăng nhập']);
    exit;
}

$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Lấy thông tin user
    $sql = "SELECT UserID, Username, Email, Phone, Avatar FROM user WHERE UserID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    
    // Lấy đơn hàng
    $sql_orders = "SELECT dh.MaDH, dh.NgayDat, dh.TongTien, dh.TrangThai 
                   FROM donhang dh 
                   WHERE dh.UserID = ? 
                   ORDER BY dh.NgayDat DESC";
    $stmt_orders = $conn->prepare($sql_orders);
    $stmt_orders->bind_param("i", $user_id);
    $stmt_orders->execute();
    $orders_result = $stmt_orders->get_result();
    $orders = [];
    
    while ($order = $orders_result->fetch_assoc()) {
        $orders[] = $order;
    }
    
    echo json_encode([
        'success' => true,
        'user' => $user,
        'orders' => $orders
    ]);
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Cập nhật thông tin user
    $fullname = $_POST['fullname'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $new_password = $_POST['new_password'] ?? '';
    
    $success = true;
    $message = 'Cập nhật thành công';
    
    // Cập nhật thông tin cơ bản
    if (!empty($fullname) || !empty($phone)) {
        $sql = "UPDATE user SET Username = ?, Phone = ? WHERE UserID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssi", $fullname, $phone, $user_id);
        
        if (!$stmt->execute()) {
            $success = false;
            $message = 'Lỗi cập nhật thông tin';
        }
    }
    
    // Cập nhật mật khẩu nếu có
    if (!empty($new_password) && $success) {
        $sql = "UPDATE user SET Password = ? WHERE UserID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $new_password, $user_id);
        
        if (!$stmt->execute()) {
            $success = false;
            $message = 'Lỗi đổi mật khẩu';
        }
    }
    
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
}
?>