<?php
header('Content-Type: application/json');
require_once 'connect.php';

$response = [
    'success' => false,
    'message' => '',
    'orders' => []
];

try {
    $sql = "SELECT d.id, u.username as customer_name, d.tongtien as total_amount, 
                   d.trangthai as status
            FROM donhang d 
            LEFT JOIN user u ON d.iduser = u.id 
            ORDER BY d.id DESC 
            LIMIT 5";
    
    $result = $conn->query($sql);
    
    if($result) {
        while($row = $result->fetch_assoc()) {
            $row['order_date'] = date('d/m/Y');
            $response['orders'][] = $row;
        }
        $response['success'] = true;
    }
} catch(Exception $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
$conn->close();
?>