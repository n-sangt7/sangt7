<?php
include '../php/connect.php';
header('Content-Type: application/json');

// Get total users
$userResult = $conn->query("SELECT COUNT(*) as total FROM user");
$totalUsers = $userResult->fetch_assoc()['total'];

// Get total products
$productResult = $conn->query("SELECT COUNT(*) as total FROM sanpham");
$totalProducts = $productResult->fetch_assoc()['total'];

// Get total categories
$categoryResult = $conn->query("SELECT COUNT(*) as total FROM danhmuc");
$totalCategories = $categoryResult->fetch_assoc()['total'];

// Get total orders
$orderResult = $conn->query("SELECT COUNT(*) as total FROM donhang");
$totalOrders = $orderResult->fetch_assoc()['total'];

// Get recent orders (5 orders mới nhất)
$recentOrdersResult = $conn->query("
    SELECT dh.*, u.Username, u.Email 
    FROM donhang dh 
    LEFT JOIN user u ON dh.UserID = u.UserID 
    ORDER BY dh.NgayDat DESC 
    LIMIT 5
");

$recentOrders = [];
while ($row = $recentOrdersResult->fetch_assoc()) {
    $recentOrders[] = $row;
}

echo json_encode([
    'success' => true,
    'totalUsers' => $totalUsers,
    'totalProducts' => $totalProducts,
    'totalCategories' => $totalCategories,
    'totalOrders' => $totalOrders,
    'recentOrders' => $recentOrders
]);
?>