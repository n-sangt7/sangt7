<?php
include '../php/connect.php';
header('Content-Type: application/json');

// GET: Lấy danh sách sản phẩm
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
    $offset = ($page - 1) * $limit;

    $search = isset($_GET['search']) ? $_GET['search'] : '';
    $maDM = isset($_GET['maDM']) ? $conn->real_escape_string($_GET['maDM']) : '';
    
    $where = ' WHERE 1=1';
    if (!empty($search)) {
        $where .= " AND (sp.TenSP LIKE '%$search%' OR sp.MaSP LIKE '%$search%' OR sp.MoTa LIKE '%$search%')";
    }
    if (!empty($maDM)) {
        $where .= " AND sp.MaDM = '$maDM'";
    }

    // Lấy tổng số records
    $countResult = $conn->query("SELECT COUNT(*) as total FROM sanpham sp" . $where);
    $totalRecords = $countResult->fetch_assoc()['total'];

    // Lấy dữ liệu
    $result = $conn->query("
        SELECT sp.*, dm.TenDM 
        FROM sanpham sp 
        LEFT JOIN danhmuc dm ON sp.MaDM = dm.MaDM 
        $where 
        ORDER BY sp.MaSP DESC 
        LIMIT $limit OFFSET $offset
    ");

    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    // Thêm categories vào response để dùng cho filter
    $categoriesResult = $conn->query("SELECT MaDM, TenDM FROM danhmuc ORDER BY TenDM");
    $categories = [];
    while ($row = $categoriesResult->fetch_assoc()) {
        $categories[] = $row;
    }

    echo json_encode([
        'success' => true,
        'products' => $products,
        'categories' => $categories,
        'totalRecords' => $totalRecords,
        'totalPages' => ceil($totalRecords / $limit)
    ]);
}

// POST: Thêm sản phẩm mới
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $tenSP = $conn->real_escape_string(trim($data['tenSP']));
    $moTa = $conn->real_escape_string(trim($data['moTa']));
    $gia = (float)$data['gia'];
    $soLuong = (int)$data['soLuong'];
    $maDM = $conn->real_escape_string(trim($data['maDM']));
    $anhSP = isset($data['anhSP']) ? $conn->real_escape_string(trim($data['anhSP'])) : '';

    // Kiểm tra dữ liệu đầu vào
    if (empty($tenSP) || empty($maDM)) {
        echo json_encode(['success' => false, 'message' => 'Tên SP và Danh mục không được để trống']);
        exit;
    }

    // TỰ ĐỘNG TẠO MÃ SẢN PHẨM DỰA TRÊN DANH MỤC
    // Lấy số lượng sản phẩm trong danh mục để tạo mã mới
    $countResult = $conn->query("SELECT COUNT(*) as count FROM sanpham WHERE MaDM = '$maDM'");
    $count = $countResult->fetch_assoc()['count'];
    $nextNumber = $count + 1;
    
    // Tạo mã sản phẩm: [MãDM][Số thứ tự]
    $categoryResult = $conn->query("SELECT MaDM FROM danhmuc WHERE MaDM = '$maDM'");
    $category = $categoryResult->fetch_assoc();
    $maSP = $category['MaDM'] . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);

    // Kiểm tra mã sản phẩm đã tồn tại chưa (phòng trường hợp trùng)
    $check = $conn->query("SELECT COUNT(*) as count FROM sanpham WHERE MaSP = '$maSP'");
    $existingCount = $check->fetch_assoc()['count'];
    
    // Nếu mã đã tồn tại, thử các số tiếp theo
    $attempt = 1;
    while ($existingCount > 0 && $attempt < 100) {
        $nextNumber = $count + $attempt;
        $maSP = $category['MaDM'] . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
        $check = $conn->query("SELECT COUNT(*) as count FROM sanpham WHERE MaSP = '$maSP'");
        $existingCount = $check->fetch_assoc()['count'];
        $attempt++;
    }

    // Kiểm tra danh mục có tồn tại không
    $checkCategory = $conn->query("SELECT COUNT(*) as count FROM danhmuc WHERE MaDM = '$maDM'");
    $categoryCount = $checkCategory->fetch_assoc()['count'];
    
    if ($categoryCount === 0) {
        echo json_encode(['success' => false, 'message' => 'Danh mục không tồn tại']);
        exit;
    }

    // Thêm sản phẩm mới
    $sql = "INSERT INTO sanpham (MaSP, TenSP, MoTa, Gia, SoLuong, MaDM, AnhSP) 
            VALUES ('$maSP', '$tenSP', '$moTa', $gia, $soLuong, '$maDM', '$anhSP')";
    
    if ($conn->query($sql)) {
        echo json_encode(['success' => true, 'message' => 'Thêm sản phẩm thành công: ' . $maSP, 'maSP' => $maSP]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Lỗi SQL: ' . $conn->error]);
    }
}

// PUT: Cập nhật sản phẩm - CHO PHÉP SỬA ID
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $oldMaSP = $conn->real_escape_string(trim($data['oldMaSP']));
    $maSP = $conn->real_escape_string(trim($data['maSP']));
    $tenSP = $conn->real_escape_string(trim($data['tenSP']));
    $moTa = $conn->real_escape_string(trim($data['moTa']));
    $gia = (float)$data['gia'];
    $soLuong = (int)$data['soLuong'];
    $maDM = $conn->real_escape_string(trim($data['maDM']));
    $anhSP = isset($data['anhSP']) ? $conn->real_escape_string(trim($data['anhSP'])) : '';

    // Kiểm tra dữ liệu đầu vào
    if (empty($maSP) || empty($tenSP) || empty($maDM)) {
        echo json_encode(['success' => false, 'message' => 'Mã SP, Tên SP và Danh mục không được để trống']);
        exit;
    }

    // Kiểm tra sản phẩm cũ có tồn tại không
    $checkOld = $conn->query("SELECT COUNT(*) as count FROM sanpham WHERE MaSP = '$oldMaSP'");
    $oldCount = $checkOld->fetch_assoc()['count'];
    
    if ($oldCount === 0) {
        echo json_encode(['success' => false, 'message' => 'Sản phẩm cần cập nhật không tồn tại']);
        exit;
    }

    // Nếu mã sản phẩm thay đổi
    if ($oldMaSP !== $maSP) {
        // Kiểm tra mã mới có tồn tại không
        $checkNew = $conn->query("SELECT COUNT(*) as count FROM sanpham WHERE MaSP = '$maSP'");
        $newCount = $checkNew->fetch_assoc()['count'];
        
        if ($newCount > 0) {
            echo json_encode(['success' => false, 'message' => 'Mã sản phẩm mới đã tồn tại']);
            exit;
        }
        
        // Cập nhật tất cả các bảng liên quan trong transaction
        $conn->begin_transaction();
        
        try {
            // 1. Cập nhật bảng sanpham_tag
            $conn->query("UPDATE sanpham_tag SET MaSP = '$maSP' WHERE MaSP = '$oldMaSP'");
            
            // 2. Cập nhật bảng chitietdonhang
            $conn->query("UPDATE chitietdonhang SET MaSP = '$maSP' WHERE MaSP = '$oldMaSP'");
            
            // 3. Cập nhật bảng giohang
            $conn->query("UPDATE giohang SET MaSP = '$maSP' WHERE MaSP = '$oldMaSP'");
            
            // 4. Cập nhật sản phẩm chính
            $conn->query("UPDATE sanpham SET 
                MaSP = '$maSP',
                TenSP = '$tenSP', 
                MoTa = '$moTa', 
                Gia = $gia, 
                SoLuong = $soLuong, 
                MaDM = '$maDM',
                AnhSP = '$anhSP' 
                WHERE MaSP = '$oldMaSP'");
            
            $conn->commit();
            echo json_encode(['success' => true, 'message' => 'Cập nhật sản phẩm thành công', 'newMaSP' => $maSP]);
            
        } catch (Exception $e) {
            $conn->rollback();
            echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()]);
        }
        
    } else {
        // Mã không thay đổi, update bình thường
        $sql = "UPDATE sanpham SET 
                TenSP = '$tenSP', 
                MoTa = '$moTa', 
                Gia = $gia, 
                SoLuong = $soLuong, 
                MaDM = '$maDM',
                AnhSP = '$anhSP' 
                WHERE MaSP = '$maSP'";
        
        if ($conn->query($sql)) {
            echo json_encode(['success' => true, 'message' => 'Cập nhật sản phẩm thành công']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Lỗi: ' . $conn->error]);
        }
    }
}

// DELETE: Xóa sản phẩm
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $maSP = $conn->real_escape_string($data['maSP']);

    // Kiểm tra sản phẩm có tồn tại không
    $checkProduct = $conn->query("SELECT COUNT(*) as count FROM sanpham WHERE MaSP = '$maSP'");
    $productCount = $checkProduct->fetch_assoc()['count'];
    
    if ($productCount === 0) {
        echo json_encode(['success' => false, 'message' => 'Sản phẩm không tồn tại: ' . $maSP]);
        exit;
    }

    // Bắt đầu transaction
    $conn->begin_transaction();
    
    try {
        // 1. Xóa các tag liên quan trước
        $conn->query("DELETE FROM sanpham_tag WHERE MaSP = '$maSP'");
        
        // 2. Xóa chi tiết đơn hàng
        $conn->query("DELETE FROM chitietdonhang WHERE MaSP = '$maSP'");
        
        // 3. Xóa khỏi giỏ hàng
        $conn->query("DELETE FROM giohang WHERE MaSP = '$maSP'");
        
        // 4. Xóa sản phẩm chính
        $conn->query("DELETE FROM sanpham WHERE MaSP = '$maSP'");
        
        $conn->commit();
        echo json_encode(['success' => true, 'message' => 'Xóa sản phẩm thành công: ' . $maSP]);
        
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(['success' => false, 'message' => 'Lỗi khi xóa sản phẩm: ' . $e->getMessage()]);
    }
}

$conn->close();
?>