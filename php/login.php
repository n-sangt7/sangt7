<?php
session_start();
require_once 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    $stmt = $conn->prepare("SELECT * FROM user WHERE Email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        if (password_verify($password, $user['Password'])) {
            // Đăng nhập thành công - cập nhật session
            $_SESSION['user_id'] = $user['UserID'];
            $_SESSION['username'] = $user['Username'];
            $_SESSION['email'] = $user['Email'];
            $_SESSION['phone'] = $user['Phone'] ?? '';
            $_SESSION['sex'] = $user['Sex'] ?? '';
            $_SESSION['birthday'] = $user['Birthday'] ?? '';
            $_SESSION['address'] = $user['Address'] ?? '';
            $_SESSION['avatar'] = $user['Avatar'] ?? '../img/default-avatar.jpg';
            $_SESSION['logged_in'] = true;
            $_SESSION['last_activity'] = time();
            
            echo json_encode([
                'success' => true,
                'message' => 'Đăng nhập thành công!',
                'redirect' => '../html/index.html',
                'user' => [
                    'id' => $user['UserID'],
                    'username' => $user['Username'],
                    'email' => $user['Email'],
                    'phone' => $user['Phone'] ?? '',
                    'sex' => $user['Sex'] ?? '', 
                    'birthday' => $user['Birthday'] ?? '', 
                    'address' => $user['Address'] ?? '',
                    'avatar' => $user['Avatar'] ? $user['Avatar'] : '../img/default-avatar.jpg'
                ]
            ]);
            exit();
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Mật khẩu không chính xác!'
            ]);
            exit();
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Email không tồn tại!'
        ]);
        exit();
    }
    
    $stmt->close();
}

echo json_encode([
    'success' => false,
    'message' => 'Phương thức không hợp lệ!'
]);
?>