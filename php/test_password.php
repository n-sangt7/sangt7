<?php
require_once 'connect.php';

$user_id = 8; // Thay bằng ID của bạn
$test_password = '123123Dr@'; // Thay bằng mật khẩu bạn đang dùng

$stmt = $conn->prepare("SELECT Password FROM user WHERE UserID = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    echo "Password hash from DB: " . $user['Password'] . "<br>";
    echo "Test password: " . $test_password . "<br>";
    echo "Password verify result: " . (password_verify($test_password, $user['Password']) ? 'TRUE' : 'FALSE') . "<br>";
} else {
    echo "User not found";
}
?>