<?php
session_start();
require_once 'connect.php'; // Sửa lại để dùng connect.php thay vì config.php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm-password'];
    
    $errors = [];
    
    // Kiểm tra xác nhận mật khẩu
    if ($password !== $confirm_password) {
        $errors[] = "Mật khẩu xác nhận không khớp!";
    }
    
    // Kiểm tra email đã tồn tại
    $stmt = $conn->prepare("SELECT UserID FROM user WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    if ($stmt->get_result()->num_rows > 0) {
        $errors[] = "Email đã được sử dụng!";
    }
    $stmt->close();
    
    if (empty($errors)) {
        // Mã hóa mật khẩu
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        
        // Tạo username từ email (lấy phần trước @)
        $username = explode('@', $email)[0];
        
        // Thêm user mới với cấu trúc bảng user chính xác
        $stmt = $conn->prepare("INSERT INTO user (Username, Password, Email, Phone, Role, Avatar) VALUES (?, ?, ?, '', 'user', NULL)");
        $stmt->bind_param("sss", $username, $hashed_password, $email);
        
        if ($stmt->execute()) {
            // Lấy thông tin user vừa đăng ký
            $user_id = $stmt->insert_id;
            
            // Tự động đăng nhập sau khi đăng ký
            $_SESSION['user_id'] = $user_id;
            $_SESSION['username'] = $username;
            $_SESSION['email'] = $email;
            $_SESSION['logged_in'] = true;
            
            echo json_encode([
                'success' => true,
                'message' => 'Đăng ký thành công!',
                'redirect' => '../html/index.html'
            ]);
            exit();
        } else {
            $errors[] = "Có lỗi xảy ra khi đăng ký: " . $conn->error;
        }
        $stmt->close();
    }
    
    // Nếu có lỗi
    echo json_encode([
        'success' => false,
        'message' => implode('<br>', $errors)
    ]);
    exit();
}

// Nếu không phải POST request, trả về lỗi
echo json_encode([
    'success' => false,
    'message' => 'Phương thức không hợp lệ!'
]);
?>