<?php
session_start();
require_once 'connect.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng đăng nhập để đặt hàng']);
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Dữ liệu không hợp lệ');
    }
    
    $shipping_info = $input['shipping_info'];
    $cart_items = $input['cart_items'];
    $total_amount = $input['total_amount'];
    
    // Kiểm tra giỏ hàng
    if (empty($cart_items)) {
        echo json_encode(['success' => false, 'message' => 'Giỏ hàng trống']);
        exit;
    }
    
    // Bắt đầu transaction
    $conn->begin_transaction();
    
    try {
        // 1. Tạo đơn hàng
        $order_stmt = $conn->prepare("INSERT INTO donhang (UserID, TongTien, TrangThai) VALUES (?, ?, 'Chờ xử lý')");
        $order_stmt->bind_param("id", $user_id, $total_amount);
        
        if (!$order_stmt->execute()) {
            throw new Exception('Lỗi khi tạo đơn hàng: ' . $conn->error);
        }
        
        $order_id = $conn->insert_id;
        
        // 2. Thêm chi tiết đơn hàng và cập nhật tồn kho
        $detail_stmt = $conn->prepare("INSERT INTO chitietdonhang (MaDH, MaSP, SoLuong, DonGia) VALUES (?, ?, ?, ?)");
        $update_stock_stmt = $conn->prepare("UPDATE sanpham SET SoLuong = SoLuong - ? WHERE MaSP = ?");
        
        foreach ($cart_items as $item) {
            // Thêm chi tiết đơn hàng
            $detail_stmt->bind_param("isid", $order_id, $item['product_id'], $item['quantity'], $item['price']);
            if (!$detail_stmt->execute()) {
                throw new Exception('Lỗi khi thêm chi tiết đơn hàng: ' . $conn->error);
            }
            
            // Cập nhật tồn kho
            $update_stock_stmt->bind_param("is", $item['quantity'], $item['product_id']);
            if (!$update_stock_stmt->execute()) {
                throw new Exception('Lỗi khi cập nhật tồn kho: ' . $conn->error);
            }
        }
        
        // 3. Thêm thông tin vận chuyển
        $shipping_stmt = $conn->prepare("INSERT INTO vanchuyen (MaDH, DiaChiNhan, NguoiNhan, SoDienThoai, TrangThai) VALUES (?, ?, ?, ?, 'Đang xử lý')");
        $shipping_stmt->bind_param("isss", $order_id, $shipping_info['address'], $shipping_info['fullName'], $shipping_info['phone']);
        
        if (!$shipping_stmt->execute()) {
            throw new Exception('Lỗi khi thêm thông tin vận chuyển: ' . $conn->error);
        }
        
        // 4. Thêm thông tin thanh toán
        $payment_method = $shipping_info['paymentMethod'] === 'cash' ? 'Tiền mặt' : 'Chuyển khoản';
        $payment_stmt = $conn->prepare("INSERT INTO thanhtoan (MaDH, PhuongThuc, TrangThai, SoTien) VALUES (?, ?, 'Chờ thanh toán', ?)");
        $payment_stmt->bind_param("isd", $order_id, $payment_method, $total_amount);
        
        if (!$payment_stmt->execute()) {
            throw new Exception('Lỗi khi thêm thông tin thanh toán: ' . $conn->error);
        }
        
        // Commit transaction
        $conn->commit();
        
        echo json_encode([
            'success' => true,
            'message' => 'Đặt hàng thành công! Mã đơn hàng: DH' . str_pad($order_id, 6, '0', STR_PAD_LEFT),
            'order_id' => $order_id
        ]);
        
    } catch (Exception $e) {
        // Rollback transaction nếu có lỗi
        $conn->rollback();
        throw $e;
    }
    
} catch (Exception $e) {
    error_log("Place order error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Lỗi khi đặt hàng: ' . $e->getMessage()]);
}

$conn->close();
?>