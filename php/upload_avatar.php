<?php
session_start();
require_once 'connect.php';

header('Content-Type: application/json');

// LOG CHI TIẾT
error_log("=== AVATAR UPLOAD DEBUG ===");
error_log("Time: " . date('Y-m-d H:i:s'));
error_log("Request Method: " . $_SERVER['REQUEST_METHOD']);
error_log("Content Type: " . ($_SERVER['CONTENT_TYPE'] ?? 'NOT SET'));
error_log("POST: " . print_r($_POST, true));
error_log("FILES: " . print_r($_FILES, true));
error_log("SESSION: " . print_r($_SESSION, true));

// TẠM THỜI: Chấp nhận mọi method để test
// if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
//     error_log("REJECTED: Invalid method - " . $_SERVER['REQUEST_METHOD']);
//     echo json_encode(['success' => false, 'message' => 'Phương thức không hợp lệ: ' . $_SERVER['REQUEST_METHOD']]);
//     exit;
// }

if (!isset($_SESSION['user_id'])) {
    error_log("REJECTED: User not logged in");
    echo json_encode(['success' => false, 'message' => 'Chưa đăng nhập']);
    exit;
}

if (!isset($_FILES['avatar'])) {
    error_log("REJECTED: No file uploaded");
    echo json_encode(['success' => false, 'message' => 'Không có file được upload']);
    exit;
}

if ($_FILES['avatar']['error'] !== UPLOAD_ERR_OK) {
    error_log("REJECTED: File upload error - " . $_FILES['avatar']['error']);
    echo json_encode(['success' => false, 'message' => 'Lỗi upload file: ' . $_FILES['avatar']['error']]);
    exit;
}

$userId = $_SESSION['user_id'];
$file = $_FILES['avatar'];

error_log("PROCESSING: File for user $userId - " . $file['name']);

// Xử lý upload
$uploadDir = '../uploads/avatars/';
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
$newFileName = 'avatar_' . $userId . '_' . time() . '.' . $fileExtension;
$filePath = $uploadDir . $newFileName;

if (move_uploaded_file($file['tmp_name'], $filePath)) {
    $avatarUrl = 'uploads/avatars/' . $newFileName;
    $stmt = $conn->prepare("UPDATE user SET Avatar = ? WHERE UserID = ?");
    $stmt->bind_param("si", $avatarUrl, $userId);
    
    if ($stmt->execute()) {
        $_SESSION['avatar'] = $avatarUrl;
        error_log("SUCCESS: Avatar updated - $avatarUrl");
        
        // THÊM: Cập nhật tất cả thông tin session để đồng bộ
        $stmt_select = $conn->prepare("SELECT Username, Email, Phone, Sex, Birthday, Address FROM user WHERE UserID = ?");
        $stmt_select->bind_param("i", $userId);
        $stmt_select->execute();
        $result = $stmt_select->get_result();
        
        if ($userData = $result->fetch_assoc()) {
            $_SESSION['username'] = $userData['Username'];
            $_SESSION['email'] = $userData['Email'];
            $_SESSION['phone'] = $userData['Phone'];
            $_SESSION['sex'] = $userData['Sex'];
            $_SESSION['birthday'] = $userData['Birthday'];
            $_SESSION['address'] = $userData['Address'];
        }
        $stmt_select->close();
        
        echo json_encode([
            'success' => true, 
            'avatar_url' => $avatarUrl,
            'message' => 'Upload thành công',
            'debug_method' => $_SERVER['REQUEST_METHOD']
        ]);
    } else {
        unlink($filePath);
        error_log("DB ERROR: " . $stmt->error);
        echo json_encode(['success' => false, 'message' => 'Lỗi database: ' . $stmt->error]);
    }
    $stmt->close();
} else {
    error_log("MOVE FILE ERROR");
    echo json_encode(['success' => false, 'message' => 'Lỗi lưu file']);
}

$conn->close();
error_log("=== AVATAR UPLOAD COMPLETE ===");
?>