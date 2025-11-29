<?php
$host = "localhost";
$user = "root"; 
$pass = "123456";     
$db = "dataonline";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Kết nối CSDL thất bại: " . $conn->connect_error);
}
?>