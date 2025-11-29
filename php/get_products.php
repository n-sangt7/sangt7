<?php
include 'connect.php';
header('Content-Type: application/json');

try {
    $maDM = isset($_GET['maDM']) ? $_GET['maDM'] : '';
    $maDMCha = isset($_GET['maDMCha']) ? $_GET['maDMCha'] : '';
    
    if ($maDM === '' && $maDMCha === '') {
        echo json_encode([
            'success' => false,
            'message' => 'Thiếu tham số maDM hoặc maDMCha'
        ]);
        exit;
    }
    
    if ($maDM === '' && $maDMCha !== '') {
        // Lấy tất cả sản phẩm thuộc danh mục cha và TẤT CẢ các danh mục con (bao gồm cả cấp 2, cấp 3)
        $sql = "
            WITH RECURSIVE CategoryTree AS (
                -- Danh mục gốc
                SELECT MaDM, MaDMCha
                FROM DanhMuc 
                WHERE MaDM = '$maDMCha'
                
                UNION ALL
                
                -- Các danh mục con
                SELECT d.MaDM, d.MaDMCha
                FROM DanhMuc d
                INNER JOIN CategoryTree ct ON d.MaDMCha = ct.MaDM
            )
            SELECT sp.*, dm.TenDM,
                   CASE 
                     WHEN LENGTH(sp.MoTa) > 0 THEN sp.MoTa
                     ELSE 'Sản phẩm chất lượng cao với thiết kế hiện đại và tính năng tiên tiến.'
                   END as MoTaFormatted
            FROM SanPham sp 
            INNER JOIN DanhMuc dm ON sp.MaDM = dm.MaDM 
            WHERE dm.MaDM IN (SELECT MaDM FROM CategoryTree)
            ORDER BY dm.MaDM, sp.MaSP DESC
        ";
    } else {
        // Lấy sản phẩm theo danh mục cụ thể
        $sql = "
            SELECT sp.*, dm.TenDM,
                   CASE 
                     WHEN LENGTH(sp.MoTa) > 0 THEN sp.MoTa
                     ELSE 'Sản phẩm chất lượng cao với thiết kế hiện đại và tính năng tiên tiến.'
                   END as MoTaFormatted
            FROM SanPham sp 
            INNER JOIN DanhMuc dm ON sp.MaDM = dm.MaDM 
            WHERE dm.MaDM = '$maDM'
            ORDER BY sp.MaSP DESC
        ";
    }
    
    $result = $conn->query($sql);
    
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    echo json_encode([
        'success' => true,
        'products' => $products
    ]);

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>