<?php
include '../php/connect.php';
header('Content-Type: application/json');

// GET: Lấy danh sách danh mục với số sản phẩm
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $search = isset($_GET['search']) ? $conn->real_escape_string($_GET['search']) : '';
    
    $where = '';
    if (!empty($search)) {
        $where = " WHERE d1.TenDM LIKE '%$search%' OR d1.MoTa LIKE '%$search%' OR d1.MaDM LIKE '%$search%'";
    }
    
    $result = $conn->query("
        SELECT d1.*, 
            d2.TenDM as TenDMCha,
            (SELECT COUNT(*) FROM sanpham WHERE MaDM = d1.MaDM) as SoSanPham
        FROM danhmuc d1 
        LEFT JOIN danhmuc d2 ON d1.MaDMCha = d2.MaDM 
        $where
        ORDER BY d1.MaDM
    ");
    
    $categories = [];
    while ($row = $result->fetch_assoc()) {
        $categories[] = $row;
    }

    echo json_encode([
        'success' => true,
        'categories' => $categories
    ]);
}

// POST: Thêm danh mục mới
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $maDM = isset($data['maDM']) ? $conn->real_escape_string(trim($data['maDM'])) : null;
    $tenDM = $conn->real_escape_string(trim($data['tenDM']));
    $moTa = isset($data['moTa']) ? $conn->real_escape_string(trim($data['moTa'])) : '';
    $anhDM = isset($data['anhDM']) ? $conn->real_escape_string(trim($data['anhDM'])) : '';
    
    // SỬA PHẦN NÀY: Xử lý danh mục cha đúng cách
    $maDMCha = '';
    if (isset($data['maDMCha']) && !empty(trim($data['maDMCha']))) {
        $maDMCha = "'" . $conn->real_escape_string(trim($data['maDMCha'])) . "'";
    } else {
        $maDMCha = 'NULL';
    }

    // Kiểm tra dữ liệu đầu vào
    if (empty($maDM) || empty($tenDM)) {
        echo json_encode(['success' => false, 'message' => 'Mã danh mục và tên danh mục không được để trống']);
        exit;
    }

    // Kiểm tra mã danh mục đã tồn tại chưa
    $check = $conn->query("SELECT COUNT(*) as count FROM danhmuc WHERE MaDM = '$maDM'");
    $count = $check->fetch_assoc()['count'];
    
    if ($count > 0) {
        echo json_encode(['success' => false, 'message' => 'Mã danh mục đã tồn tại']);
        exit;
    }

    // Kiểm tra danh mục cha có tồn tại không (nếu có)
    if ($maDMCha !== 'NULL') {
        $parentMaDM = str_replace("'", "", $maDMCha);
        $parentCheck = $conn->query("SELECT COUNT(*) as count FROM danhmuc WHERE MaDM = '$parentMaDM'");
        $parentCount = $parentCheck->fetch_assoc()['count'];
        
        if ($parentCount === 0) {
            echo json_encode(['success' => false, 'message' => 'Danh mục cha không tồn tại']);
            exit;
        }
    }

    $sql = "INSERT INTO danhmuc (MaDM, TenDM, MoTa, AnhDM, MaDMCha) 
            VALUES ('$maDM', '$tenDM', '$moTa', '$anhDM', $maDMCha)";
    
    if ($conn->query($sql)) {
        echo json_encode(['success' => true, 'message' => 'Thêm danh mục thành công']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $conn->error]);
    }
}

// PUT: Cập nhật danh mục
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $oldMaDM = $conn->real_escape_string(trim($data['oldMaDM']));
    $maDM = $conn->real_escape_string(trim($data['maDM']));
    $tenDM = $conn->real_escape_string(trim($data['tenDM']));
    $moTa = isset($data['moTa']) ? $conn->real_escape_string(trim($data['moTa'])) : '';
    $anhDM = isset($data['anhDM']) ? $conn->real_escape_string(trim($data['anhDM'])) : '';
    
    // SỬA PHẦN NÀY: Xử lý danh mục cha đúng cách
    $maDMCha = '';
    if (isset($data['maDMCha']) && !empty(trim($data['maDMCha']))) {
        $maDMCha = "'" . $conn->real_escape_string(trim($data['maDMCha'])) . "'";
    } else {
        $maDMCha = 'NULL';
    }

    // Kiểm tra dữ liệu đầu vào
    if (empty($maDM) || empty($tenDM)) {
        echo json_encode(['success' => false, 'message' => 'Mã danh mục và tên danh mục không được để trống']);
        exit;
    }

    // Kiểm tra danh mục cũ có tồn tại không
    $checkOld = $conn->query("SELECT COUNT(*) as count FROM danhmuc WHERE MaDM = '$oldMaDM'");
    $oldCount = $checkOld->fetch_assoc()['count'];
    
    if ($oldCount === 0) {
        echo json_encode(['success' => false, 'message' => 'Danh mục cần cập nhật không tồn tại']);
        exit;
    }

    // Nếu mã danh mục thay đổi
    if ($oldMaDM !== $maDM) {
        // Kiểm tra mã mới có tồn tại không
        $checkNew = $conn->query("SELECT COUNT(*) as count FROM danhmuc WHERE MaDM = '$maDM'");
        $newCount = $checkNew->fetch_assoc()['count'];
        
        if ($newCount > 0) {
            echo json_encode(['success' => false, 'message' => 'Mã danh mục mới đã tồn tại']);
            exit;
        }
        
        // Cập nhật tất cả các bảng liên quan trong transaction
        $conn->begin_transaction();
        
        try {
            // 1. Cập nhật sản phẩm
            $conn->query("UPDATE sanpham SET MaDM = '$maDM' WHERE MaDM = '$oldMaDM'");
            
            // 2. Cập nhật danh mục con
            $conn->query("UPDATE danhmuc SET MaDMCha = '$maDM' WHERE MaDMCha = '$oldMaDM'");
            
            // 3. Cập nhật danh mục chính
            $sql = "UPDATE danhmuc SET 
                MaDM = '$maDM', 
                TenDM = '$tenDM', 
                MoTa = '$moTa', 
                AnhDM = '$anhDM',
                MaDMCha = $maDMCha 
                WHERE MaDM = '$oldMaDM'";
            $conn->query($sql);
            
            $conn->commit();
            echo json_encode(['success' => true, 'message' => 'Cập nhật danh mục thành công']);
            
        } catch (Exception $e) {
            $conn->rollback();
            echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
        }
        
    } else {
        // Mã không thay đổi, update bình thường
        $sql = "UPDATE danhmuc SET 
                TenDM = '$tenDM', 
                MoTa = '$moTa', 
                AnhDM = '$anhDM',
                MaDMCha = $maDMCha 
                WHERE MaDM = '$maDM'";
        
        if ($conn->query($sql)) {
            echo json_encode(['success' => true, 'message' => 'Cập nhật danh mục thành công']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $conn->error]);
        }
    }
}

// DELETE: Xóa danh mục
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $maDM = $conn->real_escape_string(trim($data['maDM']));

    // Kiểm tra danh mục có tồn tại không
    $checkExist = $conn->query("SELECT COUNT(*) as count FROM danhmuc WHERE MaDM = '$maDM'");
    $existCount = $checkExist->fetch_assoc()['count'];
    
    if ($existCount === 0) {
        echo json_encode(['success' => false, 'message' => 'Danh mục không tồn tại']);
        exit;
    }

    // Kiểm tra xem danh mục có sản phẩm không
    $checkProducts = $conn->query("SELECT COUNT(*) as count FROM sanpham WHERE MaDM = '$maDM'");
    $productCount = $checkProducts->fetch_assoc()['count'];

    if ($productCount > 0) {
        echo json_encode(['success' => false, 'message' => 'Không thể xóa danh mục có sản phẩm']);
        exit;
    }

    // Kiểm tra xem danh mục có danh mục con không
    $checkChildren = $conn->query("SELECT COUNT(*) as count FROM danhmuc WHERE MaDMCha = '$maDM'");
    $childrenCount = $checkChildren->fetch_assoc()['count'];

    if ($childrenCount > 0) {
        echo json_encode(['success' => false, 'message' => 'Không thể xóa danh mục có danh mục con']);
        exit;
    }

    $sql = "DELETE FROM danhmuc WHERE MaDM = '$maDM'";
    
    if ($conn->query($sql)) {
        echo json_encode(['success' => true, 'message' => 'Xóa danh mục thành công']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $conn->error]);
    }
}
?>