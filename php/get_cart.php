<?php
session_start();
include 'cart_functions.php';
header('Content-Type: application/json');

// Lấy user_id từ session
$userId = isset($_SESSION['user_id']) ? (int)$_SESSION['user_id'] : 0;

if ($userId <= 0) {
    echo json_encode(['success' => false, 'message' => 'Vui lòng đăng nhập để xem giỏ hàng']);
    exit;
}

try {
    $cartData = $cartManager->getCartSimple($userId);
    $cartCount = $cartManager->getCartCount($userId);

    echo json_encode([
        'success' => true,
        'cart_items' => $cartData['items'],
        'cart_count' => $cartCount,
        'total_items' => $cartData['total_items'],
        'total_price' => $cartData['total_price']
    ]);
} catch (Exception $e) {
    error_log("Get cart error: " . $e->getMessage());
    echo json_encode([
        'success' => false, 
        'message' => 'Lỗi khi tải giỏ hàng: ' . $e->getMessage()
    ]);
}
?>