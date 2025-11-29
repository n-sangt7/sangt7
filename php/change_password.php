<?php
session_start();
require_once 'connect.php';

header('Content-Type: application/json');

// DEBUG: Bật error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    echo json_encode(['success' => false, 'message' => 'Chưa đăng nhập!']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // DEBUG: Log input data
    error_log("Password Change Request - User ID: " . $_SESSION['user_id']);
    
    $user_id = $_SESSION['user_id'];
    $current_password = trim($input['current_password'] ?? '');
    $new_password = trim($input['new_password'] ?? '');
    $confirm_password = trim($input['confirm_password'] ?? '');
    
    // Validate data - SỬA: Gộp tất cả validation lại
    $errors = [];
    
    if (empty($current_password) || empty($new_password) || empty($confirm_password)) {
        $errors[] = 'Vui lòng điền đầy đủ thông tin!';
    }
    
    if ($new_password !== $confirm_password) {
        $errors[] = 'Mật khẩu mới và xác nhận mật khẩu không khớp!';
    }
    
    if (strlen($new_password) < 6) {
        $errors[] = 'Mật khẩu mới phải có ít nhất 6 ký tự!';
    }
    
    // Nếu có lỗi validation, trả về ngay
    if (!empty($errors)) {
        echo json_encode(['success' => false, 'message' => $errors[0]]);
        $conn->close();
        exit();
    }
    
    try {
        // Lấy thông tin user hiện tại
        $stmt = $conn->prepare("SELECT Password FROM user WHERE UserID = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($user = $result->fetch_assoc()) {
            // DEBUG: Log để kiểm tra
            error_log("Checking current password for user: " . $user_id);
            
            // Kiểm tra mật khẩu hiện tại
            $password_verified = password_verify($current_password, $user['Password']);
            error_log("Password verification result: " . ($password_verified ? 'TRUE' : 'FALSE'));
            
            if (!$password_verified) {
                error_log("Password verification FAILED for user: " . $user_id);
                echo json_encode(['success' => false, 'message' => 'Mật khẩu hiện tại không đúng!']);
                $stmt->close();
                $conn->close();
                exit();
            }
            
            // Kiểm tra mật khẩu mới không được trùng với mật khẩu cũ
            if (password_verify($new_password, $user['Password'])) {
                echo json_encode(['success' => false, 'message' => 'Mật khẩu mới không được trùng với mật khẩu cũ!']);
                $stmt->close();
                $conn->close();
                exit();
            }
            
            // Cập nhật mật khẩu mới
            $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
            $update_stmt = $conn->prepare("UPDATE user SET Password = ? WHERE UserID = ?");
            $update_stmt->bind_param("si", $hashed_password, $user_id);
            
            if ($update_stmt->execute()) {
                error_log("Password updated SUCCESSFULLY for user: " . $user_id);
                echo json_encode([
                    'success' => true,
                    'message' => 'Đổi mật khẩu thành công!'
                ]);
            } else {
                error_log("Database update FAILED: " . $update_stmt->error);
                echo json_encode([
                    'success' => false,
                    'message' => 'Lỗi cập nhật mật khẩu!'
                ]);
            }
            
            $update_stmt->close();
        } else {
            error_log("User not found: " . $user_id);
            echo json_encode([
                'success' => false,
                'message' => 'Không tìm thấy thông tin người dùng!'
            ]);
        }
        
        $stmt->close();
    } catch (Exception $e) {
        error_log("Exception: " . $e->getMessage());
        echo json_encode([
            'success' => false,
            'message' => 'Lỗi hệ thống: ' . $e->getMessage()
        ]);
    }
    
    // Đóng kết nối
    $conn->close();
    exit(); // ĐẢM BẢO THOÁT HOÀN TOÀN
    
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Phương thức không hợp lệ!'
    ]);
    exit();
}
?>