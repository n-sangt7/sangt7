<?php
session_start();
require_once 'connect.php';

header('Content-Type: application/json');

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    echo json_encode(['success' => false, 'message' => 'Chưa đăng nhập!']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $user_id = $_SESSION['user_id'];
    $username = trim($input['username']);
    $phone = trim($input['phone']);
    $address = trim($input['address']);
    $sex = trim($input['sex']);
    $birthday = trim($input['birthday']);
    
    // Validate data
    if (empty($username)) {
        echo json_encode(['success' => false, 'message' => 'Tên không được để trống!']);
        exit();
    }
    
    try {
        // Update user information - ĐÃ SỬA: thêm Address
        $stmt = $conn->prepare("UPDATE user SET Username = ?, Phone = ?, Sex = ?, Birthday = ?, Address = ? WHERE UserID = ?");
        $stmt->bind_param("sssssi", $username, $phone, $sex, $birthday, $address, $user_id);
        
        if ($stmt->execute()) {
            // Update session
            $_SESSION['username'] = $username;
            $_SESSION['phone'] = $phone;
            $_SESSION['address'] = $address;
            $_SESSION['sex'] = $sex;
            $_SESSION['birthday'] = $birthday;
            
            echo json_encode([
                'success' => true,
                'message' => 'Cập nhật thông tin thành công!'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Lỗi cập nhật thông tin!'
            ]);
        }
        
        $stmt->close();
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Lỗi hệ thống: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Phương thức không hợp lệ!'
    ]);
}

$conn->close();
?>