<?php
header('Content-Type: application/json');
require_once 'connect.php';

$response = ['success' => false, 'message' => ''];

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $id = $data['id'] ?? 0;
    $username = $data['username'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';
    $role = $data['role'] ?? 'user';

    if (empty($id)) {
        throw new Exception("ID user không hợp lệ");
    }

    $roleValue = ($role === 'admin') ? 1 : 0;

    $sql = "UPDATE user SET username = ?, email = ?, mobile = ?, role = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssii", $username, $email, $phone, $roleValue, $id);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Cập nhật user thành công';
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