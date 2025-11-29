<?php
include '../php/connect.php';
header('Content-Type: application/json');

try {
    // GET: Lấy danh sách tags hoặc tags của sản phẩm
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $search = isset($_GET['search']) ? $conn->real_escape_string($_GET['search']) : '';
        
        // Lấy tags của sản phẩm cụ thể
        if (isset($_GET['productId'])) {
            $productId = $conn->real_escape_string($_GET['productId']);
            
            if (empty($productId)) {
                throw new Exception('Product ID không hợp lệ');
            }
            
            // Tags hiện tại của sản phẩm
            $currentTags = $conn->query("
                SELECT t.MaTag, t.TenTag 
                FROM tag t 
                INNER JOIN sanpham_tag st ON t.MaTag = st.MaTag 
                WHERE st.MaSP = '$productId'
            ");
            
            $current = [];
            while ($row = $currentTags->fetch_assoc()) {
                $current[] = $row;
            }
            
            // Tất cả tags có sẵn
            $availableTags = $conn->query("
                SELECT t.MaTag, t.TenTag 
                FROM tag t 
                WHERE t.MaTag NOT IN (
                    SELECT MaTag FROM sanpham_tag WHERE MaSP = '$productId'
                )
            ");
            
            $available = [];
            while ($row = $availableTags->fetch_assoc()) {
                $available[] = $row;
            }
            
            echo json_encode([
                'success' => true,
                'currentTags' => $current,
                'availableTags' => $available
            ]);
            exit;
        } else {
            // Lấy tất cả tags với số sản phẩm
            $where = '';
            if (!empty($search)) {
                $where = " WHERE t.TenTag LIKE '%$search%' OR t.MoTa LIKE '%$search%'";
            }
            
            $result = $conn->query("
                SELECT t.*, 
                       COUNT(st.MaSP) as SoSanPham
                FROM tag t 
                LEFT JOIN sanpham_tag st ON t.MaTag = st.MaTag 
                $where
                GROUP BY t.MaTag 
                ORDER BY t.TenTag
            ");
            
            $tags = [];
            while ($row = $result->fetch_assoc()) {
                $tags[] = $row;
            }

            echo json_encode([
                'success' => true,
                'tags' => $tags
            ]);
            exit;
        }
    }

    // POST: Thêm tag mới
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && !isset($_GET['action'])) {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Dữ liệu JSON không hợp lệ');
        }
        
        $tenTag = trim($conn->real_escape_string($data['tenTag']));
        $moTa = trim($conn->real_escape_string($data['moTa']));

        if (empty($tenTag)) {
            throw new Exception('Tên tag không được để trống');
        }

        // Kiểm tra tag đã tồn tại chưa
        $check = $conn->query("SELECT COUNT(*) as count FROM tag WHERE TenTag = '$tenTag'");
        $count = $check->fetch_assoc()['count'];
        
        if ($count > 0) {
            throw new Exception('Tag đã tồn tại');
        }

        $sql = "INSERT INTO tag (TenTag, MoTa) VALUES ('$tenTag', '$moTa')";
        
        if ($conn->query($sql)) {
            echo json_encode(['success' => true, 'message' => 'Thêm tag thành công']);
        } else {
            throw new Exception('Lỗi database: ' . $conn->error);
        }
        exit;
    }

    // PUT: Cập nhật tag
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Dữ liệu JSON không hợp lệ');
        }
        
        $maTag = (int)$data['maTag'];
        $tenTag = trim($conn->real_escape_string($data['tenTag']));
        $moTa = trim($conn->real_escape_string($data['moTa']));

        if (empty($tenTag)) {
            throw new Exception('Tên tag không được để trống');
        }

        // Kiểm tra tag đã tồn tại (trừ tag hiện tại)
        $check = $conn->query("SELECT COUNT(*) as count FROM tag WHERE TenTag = '$tenTag' AND MaTag != $maTag");
        $count = $check->fetch_assoc()['count'];
        
        if ($count > 0) {
            throw new Exception('Tag đã tồn tại');
        }

        $sql = "UPDATE tag SET TenTag = '$tenTag', MoTa = '$moTa' WHERE MaTag = $maTag";
        
        if ($conn->query($sql)) {
            echo json_encode(['success' => true, 'message' => 'Cập nhật tag thành công']);
        } else {
            throw new Exception('Lỗi database: ' . $conn->error);
        }
        exit;
    }

    // DELETE: Xóa tag
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Dữ liệu JSON không hợp lệ');
        }
        
        $maTag = (int)$data['maTag'];

        // Xóa các liên kết trong bảng sanpham_tag trước
        $conn->query("DELETE FROM sanpham_tag WHERE MaTag = $maTag");
        
        $sql = "DELETE FROM tag WHERE MaTag = $maTag";
        
        if ($conn->query($sql)) {
            echo json_encode(['success' => true, 'message' => 'Xóa tag thành công']);
        } else {
            throw new Exception('Lỗi database: ' . $conn->error);
        }
        exit;
    }

    // POST: Quản lý tags của sản phẩm
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'update_product_tags') {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception('Dữ liệu JSON không hợp lệ');
        }
        
        $maSP = $conn->real_escape_string($data['maSP']);
        $tags = $data['tags']; // Mảng các MaTag

        if (empty($maSP)) {
            throw new Exception('Product ID không hợp lệ');
        }

        // Kiểm tra sản phẩm có tồn tại không
        $checkProduct = $conn->query("SELECT COUNT(*) as count FROM sanpham WHERE MaSP = '$maSP'");
        $productCount = $checkProduct->fetch_assoc()['count'];
        
        if ($productCount === 0) {
            throw new Exception('Sản phẩm không tồn tại');
        }

        // Xóa tất cả tags hiện tại của sản phẩm
        $conn->query("DELETE FROM sanpham_tag WHERE MaSP = '$maSP'");
        
        // Thêm tags mới
        $success = true;
        $errorMsg = '';
        
        if (!empty($tags)) {
            foreach ($tags as $maTag) {
                $maTag = (int)$maTag;
                if ($maTag > 0) {
                    // Kiểm tra tag có tồn tại không
                    $checkTag = $conn->query("SELECT COUNT(*) as count FROM tag WHERE MaTag = $maTag");
                    $tagCount = $checkTag->fetch_assoc()['count'];
                    
                    if ($tagCount > 0) {
                        $sql = "INSERT INTO sanpham_tag (MaSP, MaTag) VALUES ('$maSP', $maTag)";
                        if (!$conn->query($sql)) {
                            $success = false;
                            $errorMsg = $conn->error;
                            break;
                        }
                    }
                }
            }
        }
        
        if ($success) {
            echo json_encode(['success' => true, 'message' => 'Cập nhật tags thành công']);
        } else {
            throw new Exception('Lỗi khi cập nhật tags: ' . $errorMsg);
        }
        exit;
    }

    // Nếu không khớp method nào
    throw new Exception('Method không được hỗ trợ');

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
    exit;
}
?>