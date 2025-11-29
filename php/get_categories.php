<?php
include 'connect.php';
header('Content-Type: application/json');

try {
    $maDMCha = isset($_GET['maDMCha']) ? $_GET['maDMCha'] : '';
    
    if ($maDMCha === '') {
        echo json_encode([
            'success' => false,
            'message' => 'Thiếu tham số maDMCha'
        ]);
        exit;
    }

    // Lấy danh mục con TRỰC TIẾP của danh mục cha
    $categoriesQuery = $conn->query("
        SELECT d.*, 
               (SELECT COUNT(*) FROM SanPham WHERE MaDM = d.MaDM) as SoSanPham
        FROM DanhMuc d 
        WHERE d.MaDMCha = '$maDMCha'
        ORDER BY d.MaDM
    ");
    
    $categories = [];
    while ($row = $categoriesQuery->fetch_assoc()) {
        $categories[] = $row;
    }

    echo json_encode([
        'success' => true,
        'categories' => $categories
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>