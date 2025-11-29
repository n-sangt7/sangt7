<?php
require_once 'connect.php';

header('Content-Type: application/json');

if ($conn->connect_error) {
    echo json_encode([
        'success' => false, 
        'message' => 'Database connection failed: ' . $conn->connect_error
    ]);
} else {
    // Test query
    $result = $conn->query("SELECT 1 as test");
    if ($result) {
        echo json_encode([
            'success' => true, 
            'message' => 'Database connection successful'
        ]);
    } else {
        echo json_encode([
            'success' => false, 
            'message' => 'Database query failed: ' . $conn->error
        ]);
    }
}

$conn->close();
?>