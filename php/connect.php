<?php
$host = "localhost";
$dbname = "quanlybanhang";
$username = "root";
$password = "123456"; // hoặc mật khẩu MySQL của bạn

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}
mysqli_set_charset($conn, "utf8");
?>
