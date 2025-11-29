<?php
session_start();
require_once 'connect.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng đăng nhập']);
    exit;
}

$user_id = $_SESSION['user_id'];
$order_id = $_GET['order_id'] ?? 0;

if (!$order_id) {
    echo json_encode(['success' => false, 'message' => 'Thiếu mã đơn hàng']);
    exit;
}

try {
    // Lấy thông tin đơn hàng
    $order_stmt = $conn->prepare("
        SELECT d.*, v.DiaChiNhan, v.NguoiNhan, v.SoDienThoai, t.PhuongThuc, t.TrangThai as TrangThaiThanhToan
        FROM donhang d
        LEFT JOIN vanchuyen v ON d.MaDH = v.MaDH
        LEFT JOIN thanhtoan t ON d.MaDH = t.MaDH
        WHERE d.MaDH = ? AND d.UserID = ?
    ");
    $order_stmt->bind_param("ii", $order_id, $user_id);
    $order_stmt->execute();
    $order_result = $order_stmt->get_result();
    
    if ($order_result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Đơn hàng không tồn tại']);
        exit;
    }
    
    $order = $order_result->fetch_assoc();
    
    // Lấy chi tiết đơn hàng
    $details_stmt = $conn->prepare("
        SELECT c.*, s.TenSP, s.AnhSP
        FROM chitietdonhang c
        JOIN sanpham s ON c.MaSP = s.MaSP
        WHERE c.MaDH = ?
    ");
    $details_stmt->bind_param("i", $order_id);
    $details_stmt->execute();
    $details_result = $details_stmt->get_result();
    
    $order_details = [];
    while ($detail = $details_result->fetch_assoc()) {
        $order_details[] = $detail;
    }
    
    $order['chi_tiet'] = $order_details;
    
    echo json_encode([
        'success' => true,
        'order' => $order
    ]);
    
} catch (Exception $e) {
    error_log("Get order details error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Lỗi khi tải thông tin đơn hàng']);
}

$conn->close();
?>