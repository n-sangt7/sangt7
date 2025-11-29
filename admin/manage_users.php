<?php
include '../php/connect.php';
header('Content-Type: application/json');

// GET: Lấy danh sách users
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
    $offset = ($page - 1) * $limit;

    $search = isset($_GET['search']) ? $_GET['search'] : '';
    
    $where = '';
    if (!empty($search)) {
        $where = " WHERE Username LIKE '%$search%' OR Email LIKE '%$search%'";
    }

    // Lấy tổng số records
    $countResult = $conn->query("SELECT COUNT(*) as total FROM user" . $where);
    $totalRecords = $countResult->fetch_assoc()['total'];

    // Lấy dữ liệu
    $result = $conn->query("SELECT UserID, Username, Email, Phone, Role, Avatar FROM user $where ORDER BY UserID DESC LIMIT $limit OFFSET $offset");
    
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode([
        'success' => true,
        'users' => $users,
        'totalRecords' => $totalRecords,
        'totalPages' => ceil($totalRecords / $limit)
    ]);
}

// POST: Thêm user mới
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = $conn->real_escape_string($data['username']);
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    $email = $conn->real_escape_string($data['email']);
    $phone = $conn->real_escape_string($data['phone']);
    $role = $conn->real_escape_string($data['role']);

    $sql = "INSERT INTO user (Username, Password, Email, Phone, Role) 
            VALUES ('$username', '$password', '$email', '$phone', '$role')";
    
    if ($conn->query($sql)) {
        echo json_encode(['success' => true, 'message' => 'Thêm user thành công']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $conn->error]);
    }
}

// PUT: Cập nhật user
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $userID = (int)$data['userID'];
    $username = $conn->real_escape_string($data['username']);
    $email = $conn->real_escape_string($data['email']);
    $phone = $conn->real_escape_string($data['phone']);
    $role = $conn->real_escape_string($data['role']);

    $sql = "UPDATE user SET 
            Username = '$username', 
            Email = '$email', 
            Phone = '$phone', 
            Role = '$role' 
            WHERE UserID = $userID";
    
    if ($conn->query($sql)) {
        echo json_encode(['success' => true, 'message' => 'Cập nhật user thành công']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $conn->error]);
    }
}

// DELETE: Xóa user
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $userID = (int)$data['userID'];

    $sql = "DELETE FROM user WHERE UserID = $userID";
    
    if ($conn->query($sql)) {
        echo json_encode(['success' => true, 'message' => 'Xóa user thành công']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $conn->error]);
    }
}
?>