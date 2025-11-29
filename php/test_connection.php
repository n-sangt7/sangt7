<?php
header('Content-Type: application/json');

// Test kết nối database
try {
    include 'connect.php';
    
    // Test query đơn giản
    $result = $conn->query("SELECT 1 as test");
    
    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Kết nối database thành công',
            'data' => $result->fetch_assoc()
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Lỗi query: ' . $conn->error
        ]);
    }
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Lỗi: ' . $e->getMessage()
    ]);
}
?>