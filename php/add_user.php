<?php
header('Content-Type: application/json');
require_once 'connect.php';

$response = ['success' => false, 'message' => ''];

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = $data['username'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    $phone = $data['phone'] ?? '';
    $role = $data['role'] ?? 'user';

    // Validate dữ liệu
    if (empty($username) || empty($email) || empty($password)) {
        throw new Exception("Vui lòng điền đầy đủ thông tin");
    }

    // Kiểm tra email đã tồn tại chưa
    $checkEmail = $conn->prepare("SELECT id FROM user WHERE email = ?");
    $checkEmail->bind_param("s", $email);
    $checkEmail->execute();
    if ($checkEmail->get_result()->num_rows > 0) {
        throw new Exception("Email đã tồn tại");
    }

    // Mã hóa mật khẩu
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $roleValue = ($role === 'admin') ? 1 : 0;

    $sql = "INSERT INTO user (username, email, pass, mobile, role, name) 
            VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssis", $username, $email, $hashedPassword, $phone, $roleValue, $username);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Thêm user thành công';
    } else {
        throw new Exception("Lỗi database: " . $stmt->error);
    }

    $stmt->close();
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
$conn->close();
?>