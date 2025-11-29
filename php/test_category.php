<?php
header('Content-Type: application/json');
require_once 'connect.php';

// Test data
$test_data = [
    'name' => 'Test Category',
    'image' => 'https://via.placeholder.com/100'
];

try {
    // Test INSERT
    $sql = "INSERT INTO danhmuc (tendanhmuc, hinhanh) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    
    if ($stmt) {
        $stmt->bind_param("ss", $test_data['name'], $test_data['image']);
        
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Test INSERT thành công',
                'insert_id' => $stmt->insert_id
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Lỗi execute: ' . $stmt->error
            ]);
        }
        $stmt->close();
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Lỗi prepare: ' . $conn->error
        ]);
    }
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Exception: ' . $e->getMessage()
    ]);
}

$conn->close();
?>