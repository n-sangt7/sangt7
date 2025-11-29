<?php
include 'cart_functions.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $userId = isset($input['user_id']) ? (int)$input['user_id'] : 0;
    $productId = isset($input['product_id']) ? (int)$input['product_id'] : 0;
    $quantity = isset($input['quantity']) ? (int)$input['quantity'] : 1;
    
    if ($userId <= 0 || $productId <= 0) {
        echo json_encode(['success' => false, 'message' => 'Thông tin không hợp lệ']);
        exit;
    }
    
    // Kiểm tra số lượng tồn kho
    if (!checkStock($productId, $quantity)) {
        echo json_encode(['success' => false, 'message' => 'Số lượng sản phẩm trong kho không đủ']);
        exit;
    }
    
    if (updateCartQuantity($userId, $productId, $quantity)) {
        $cartCount = getCartCount($userId);
        echo json_encode(['success' => true, 'cart_count' => $cartCount]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Không thể cập nhật giỏ hàng']);
    }
}
?>