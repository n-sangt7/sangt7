<?php
session_start();
require_once 'connect.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Chưa đăng nhập']);
    exit;
}

$userId = $_SESSION['user_id'];
$stmt = $conn->prepare("SELECT Avatar FROM user WHERE UserID = ?");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    $avatar_url = $user['Avatar'] ? '../' . $user['Avatar'] : '../img/default-avatar.png';
    
    // Cập nhật session
    $_SESSION['avatar'] = $user['Avatar'];
    
    echo json_encode([
        'success' => true, 
        'avatar_url' => $avatar_url,
        'from_database' => true
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Không tìm thấy user']);
}

$stmt->close();
$conn->close();
?>