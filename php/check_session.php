<?php
session_start();
require_once 'connect.php'; // THÊM DÒNG NÀY

header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');

// Kiểm tra session timeout (30 phút)
$timeout = 1800;
if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity']) > $timeout) {
    session_unset();
    session_destroy();
    echo json_encode(['logged_in' => false]);
    exit();
}

$_SESSION['last_activity'] = time();

if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    // LẤY AVATAR TRỰC TIẾP TỪ DATABASE - THÊM PHẦN NÀY
    $avatar_url = '../img/default-avatar.png'; // default
    
    if (isset($_SESSION['user_id'])) {
        $stmt = $conn->prepare("SELECT Avatar FROM user WHERE UserID = ?");
        $stmt->bind_param("i", $_SESSION['user_id']);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($user = $result->fetch_assoc()) {
            if (!empty($user['Avatar'])) {
                $avatar_url = '../' . $user['Avatar'];
            }
        }
        $stmt->close();
    }
    
    echo json_encode([
        'logged_in' => true,
        'user_id' => $_SESSION['user_id'] ?? 0,
        'username' => $_SESSION['username'] ?? '',
        'email' => $_SESSION['email'] ?? '',
        'phone' => $_SESSION['phone'] ?? '',
        'sex' => $_SESSION['sex'] ?? '',
        'birthday' => $_SESSION['birthday'] ?? '',
        'address' => $_SESSION['address'] ?? '',
        'avatar' => $avatar_url  // DÙNG AVATAR TỪ DATABASE
    ]);
} else {
    echo json_encode([
        'logged_in' => false
    ]);
}

$conn->close();
?>