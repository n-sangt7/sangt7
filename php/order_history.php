<?php
session_start();
require_once 'connect.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng đăng nhập']);
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    // Lấy danh sách đơn hàng của user
    $stmt = $conn->prepare("
        SELECT 
            d.MaDH,
            d.NgayDat,
            d.TongTien,
            d.TrangThai,
            v.DiaChiNhan,
            v.NguoiNhan,
            v.SoDienThoai,
            t.PhuongThuc,
            t.TrangThai as TrangThaiThanhToan
        FROM donhang d
        LEFT JOIN vanchuyen v ON d.MaDH = v.MaDH
        LEFT JOIN thanhtoan t ON d.MaDH = t.MaDH
        WHERE d.UserID = ?
        ORDER BY d.NgayDat DESC
    ");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $orders = [];
    while ($row = $result->fetch_assoc()) {
        // Lấy chi tiết từng đơn hàng
        $detail_stmt = $conn->prepare("
            SELECT c.*, s.TenSP, s.AnhSP, s.MaSP
            FROM chitietdonhang c
            JOIN sanpham s ON c.MaSP = s.MaSP
            WHERE c.MaDH = ?
        ");
        $detail_stmt->bind_param("i", $row['MaDH']);
        $detail_stmt->execute();
        $detail_result = $detail_stmt->get_result();
        
        $order_details = [];
        while ($detail = $detail_result->fetch_assoc()) {
            $order_details[] = $detail;
        }
        
        $row['chi_tiet'] = $order_details;
        $orders[] = $row;
        $detail_stmt->close();
    }
    
    echo json_encode([
        'success' => true,
        'orders' => $orders
    ]);
    
} catch (Exception $e) {
    error_log("Order history error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Lỗi khi tải lịch sử đơn hàng']);
}

$conn->close();
?>