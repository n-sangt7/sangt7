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
    $_SESSION['avatar'] = $user['Avatar'];
    echo json_encode([
        'success' => true, 
        'avatar_url' => $user['Avatar'],
        'session_avatar' => $_SESSION['avatar']
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Không tìm thấy user']);
}

$stmt->close();
$conn->close();
?>