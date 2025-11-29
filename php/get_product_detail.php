<?php
include 'connect.php';
header('Content-Type: application/json');

try {
    $productId = isset($_GET['id']) ? $conn->real_escape_string($_GET['id']) : '';
    
    if (empty($productId)) {
        throw new Exception('ID sản phẩm không hợp lệ');
    }

    $sql = "
        SELECT sp.*, dm.TenDM 
        FROM SanPham sp 
        INNER JOIN DanhMuc dm ON sp.MaDM = dm.MaDM 
        WHERE sp.MaSP = ?
    ";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $productId);     
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $product = $result->fetch_assoc();
        echo json_encode([
            'success' => true,
            'product' => $product
        ]);
    } else {
        throw new Exception('Không tìm thấy sản phẩm');
    }

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>