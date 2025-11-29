// admin.js
document.addEventListener('DOMContentLoaded', function() {
    // Biến toàn cục
    let currentPage = 'dashboard';
    let currentEditId = null;

    // Khởi tạo
    initAdmin();

    function initAdmin() {
        setupEventListeners();
        loadDashboardData();
        setupModalHandlers();
    }

    // ==================== EVENT LISTENERS ====================
    function setupEventListeners() {
        // Navigation
        document.querySelectorAll('.admin-nav-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.getAttribute('data-page');
                if (page) {
                    switchPage(page);
                }
            });
        });

        // Toggle sidebar
        document.querySelector('.toggle-sidebar').addEventListener('click', toggleSidebar);

        // Search và filter
        document.getElementById('user-search').addEventListener('input', debounce(loadUsers, 300));
        document.getElementById('category-search').addEventListener('input', debounce(loadCategories, 300));
        document.getElementById('product-search').addEventListener('input', debounce(loadProducts, 300));
        document.getElementById('category-filter').addEventListener('change', loadProducts);
        document.getElementById('order-status-filter').addEventListener('change', loadOrders);
        document.getElementById('date-filter').addEventListener('change', loadDashboardData);

        // Nút thêm mới
        document.getElementById('add-user-btn').addEventListener('click', showAddUserModal);
        document.getElementById('add-category-btn').addEventListener('click', showAddCategoryModal);
        document.getElementById('add-product-btn').addEventListener('click', showAddProductModal);

        // Nút lưu
        document.getElementById('save-user-btn').addEventListener('click', saveUser);
        document.getElementById('save-category-btn').addEventListener('click', saveCategory);
        document.getElementById('save-product-btn').addEventListener('click', saveProduct);

        // Settings form
        document.getElementById('settings-form').addEventListener('submit', saveSettings);

        // Thêm vào setupEventListeners()
        document.getElementById('add-tag-btn').addEventListener('click', showAddTagModal);
        document.getElementById('save-tag-btn').addEventListener('click', saveTag);
        document.getElementById('tag-search').addEventListener('input', debounce(loadTags, 300));
        document.getElementById('product-tags-filter').addEventListener('change', loadProductTags);
        document.getElementById('save-product-tags-btn').addEventListener('click', saveProductTags);
    }

    function setupModalHandlers() {
        // Đóng modal khi click ra ngoài hoặc nút close
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', closeAllModals);
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeAllModals();
                }
            });
        });
    }

    // ==================== PAGE MANAGEMENT ====================
    function switchPage(page) {
        // Ẩn tất cả pages
        document.querySelectorAll('.page-content').forEach(p => {
            p.classList.remove('active');
        });

        // Bỏ active tất cả nav items
        document.querySelectorAll('.admin-nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Hiển thị page được chọn
        document.getElementById(`${page}-page`).classList.add('active');
        
        // Active nav item tương ứng
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        // Cập nhật title
        document.getElementById('page-title').textContent = 
            document.querySelector(`[data-page="${page}"] span`).textContent;

        // Load dữ liệu tương ứng
        currentPage = page;
        switch(page) {
            case 'dashboard':
                loadDashboardData();
                break;
            case 'users':
                loadUsers();
                break;
            case 'categories':
                loadCategories();
                break;
            case 'products':
                loadProducts();
                break;
            case 'orders':
                loadOrders();
                break;
            case 'tags':
                loadTags();
                break;
            case 'product-tags':
                loadProductsForTagManagement();
                break;
        }
    }

    function toggleSidebar() {
        document.querySelector('.admin-sidebar').classList.toggle('collapsed');
        document.querySelector('.admin-main').classList.toggle('expanded');
    }

    // ==================== MODAL MANAGEMENT ====================
    function showModal(modalId) {
        document.getElementById(modalId).style.display = 'flex';
    }

    function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    resetForms();
    currentEditId = null;
    
    // Ẩn trường password khi đóng modal user
    const passwordField = document.getElementById('password');
    if (passwordField) {
        passwordField.closest('.form-group').style.display = 'block';
    }
    
    // Ẩn trường ID sản phẩm khi đóng modal (để khi mở lại là thêm mới)
    document.getElementById('product-id-group').style.display = 'none';
}

    function resetForms() {
        document.querySelectorAll('form').forEach(form => {
            form.reset();
        });
    }

    function showAddUserModal() {
        currentEditId = null;
        document.querySelector('#add-user-modal .modal-header h3').textContent = 'Thêm User mới';
        document.querySelector('#save-user-btn').textContent = 'Thêm User';
        document.getElementById('password').closest('.form-group').style.display = 'block';
        showModal('add-user-modal');
    }

    function showAddCategoryModal() {
        currentEditId = null;
        document.querySelector('#add-category-modal .modal-header h3').textContent = 'Thêm Danh mục mới';
        document.querySelector('#save-category-btn').textContent = 'Thêm Danh mục';
        showModal('add-category-modal');
    }

    function showAddProductModal() {
        currentEditId = null;
        document.querySelector('#add-product-modal .modal-header h3').textContent = 'Thêm Sản phẩm mới';
        document.querySelector('#save-product-btn').textContent = 'Thêm Sản phẩm';
        loadCategoriesForSelect();
        showModal('add-product-modal');
    }

    // ==================== API CALLS ====================
    async function apiCall(url, options = {}) {
        try {
            console.log('🔵 API Call:', url, options);
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            // Log response status
            console.log('📡 Response status:', response.status, response.statusText);

            const text = await response.text();
            console.log('📄 Raw response:', text);

            // Try to parse as JSON
            let data;
            try {
                data = JSON.parse(text);
            } catch (parseError) {
                console.error('❌ JSON parse error:', parseError);
                throw new Error(`Invalid JSON response: ${text.substring(0, 100)}...`);
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, message: ${data.message || 'Unknown error'}`);
            }

            console.log('🟢 API Response:', data);
            return data;
        } catch (error) {
            console.error('🔴 API call failed:', error);
            showNotification('Lỗi kết nối đến server: ' + error.message, 'error');
            return { success: false, message: error.message };
        }
    }

    // ==================== DASHBOARD ====================
    async function loadDashboardData() {
        try {
            console.log('🔄 Loading dashboard data...');
            const data = await apiCall('../admin/manage_dashboard.php');
            
            if (data.success) {
                document.getElementById('total-users').textContent = data.totalUsers || 0;
                document.getElementById('total-products').textContent = data.totalProducts || 0;
                document.getElementById('total-categories').textContent = data.totalCategories || 0;
                document.getElementById('total-orders').textContent = data.totalOrders || 0;
                
                // Load recent orders với đầy đủ trạng thái
                loadRecentOrders();
            } else {
                showNotification('Lỗi tải dữ liệu dashboard', 'error');
            }
        } catch (error) {
            console.error('Error loading dashboard:', error);
            showNotification('Lỗi tải dữ liệu dashboard', 'error');
        }
    }

    async function loadRecentOrders() {
        try {
            const data = await apiCall('../admin/manage_orders.php?limit=5');
            
            if (data.success) {
                renderRecentOrders(data.orders || []);
            }
        } catch (error) {
            console.error('Error loading recent orders:', error);
        }
    }

    function renderRecentOrders(orders) {
        const tbody = document.querySelector('#recent-orders-table tbody');
        tbody.innerHTML = '';

        if (orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center">Không có đơn hàng nào</td></tr>';
            return;
        }

        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>#${order.MaDH}</td>
                <td>${order.Username || order.Email || 'N/A'}</td>
                <td>${formatDate(order.NgayDat)}</td>
                <td>${formatCurrency(order.TongTien)}</td>
                <td>
                    <span class="status-badge status-${order.TrangThai}">
                        ${getStatusText(order.TrangThai)}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewOrderDetail(${order.MaDH})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="editOrderStatus(${order.MaDH})">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // ==================== USERS MANAGEMENT ====================
    async function loadUsers() {
        const search = document.getElementById('user-search').value;
        let url = '../admin/manage_users.php';
        if (search) {
            url += `?search=${encodeURIComponent(search)}`;
        }

        try {
            const data = await apiCall(url);
            
            if (data.success) {
                renderUsersTable(data.users);
            }
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }

    function renderUsersTable(users) {
        const tbody = document.querySelector('#users-table tbody');
        tbody.innerHTML = '';

        if (users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center">Không có user nào</td></tr>';
            return;
        }

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.UserID}</td>
                <td>${user.Username}</td>
                <td>${user.Email}</td>
                <td>${user.Phone || 'N/A'}</td>
                <td><span class="role-badge role-${user.Role}">${user.Role}</span></td>
                <td>${formatDate(user.created_at)}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editUser(${user.UserID})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.UserID})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    async function editUser(userId) {
        try {
            console.log('🔄 Loading user data for edit:', userId);
            const data = await apiCall('../admin/manage_users.php');
            if (data.success && data.users) {
                const user = data.users.find(u => u.UserID == userId);
                if (user) {
                    currentEditId = userId;
                    document.getElementById('username').value = user.Username;
                    document.getElementById('email').value = user.Email;
                    document.getElementById('phone').value = user.Phone || '';
                    document.getElementById('role').value = user.Role;
                    
                    // Ẩn trường password khi edit
                    document.getElementById('password').closest('.form-group').style.display = 'none';
                    
                    document.querySelector('#add-user-modal .modal-header h3').textContent = 'Sửa User';
                    document.querySelector('#save-user-btn').textContent = 'Cập nhật User';
                    showModal('add-user-modal');
                } else {
                    showNotification('Không tìm thấy user', 'error');
                }
            }
        } catch (error) {
            console.error('Error loading user:', error);
            showNotification('Lỗi khi tải thông tin user', 'error');
        }
    }

    async function saveUser() {
        const formData = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            role: document.getElementById('role').value
        };

        // Thêm password nếu là thêm mới
        if (!currentEditId) {
            formData.password = document.getElementById('password').value;
        }

        if (!formData.username || !formData.email) {
            showNotification('Vui lòng điền đầy đủ thông tin', 'error');
            return;
        }

        if (!currentEditId && !formData.password) {
            showNotification('Vui lòng nhập mật khẩu', 'error');
            return;
        }

        try {
            const url = '../admin/manage_users.php';
            const method = currentEditId ? 'PUT' : 'POST';
            
            if (currentEditId) {
                formData.userID = currentEditId;
            }

            console.log('💾 Saving user:', formData);
            const data = await apiCall(url, {
                method: method,
                body: JSON.stringify(formData)
            });

            if (data.success) {
                showNotification(data.message, 'success');
                closeAllModals();
                loadUsers();
            } else {
                showNotification(data.message, 'error');
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    }

    async function deleteUser(userId) {
        if (!confirm('Bạn có chắc muốn xóa user này?')) return;

        try {
            const data = await apiCall('../admin/manage_users.php', {
                method: 'DELETE',
                body: JSON.stringify({ userID: userId })
            });

            if (data.success) {
                showNotification(data.message, 'success');
                loadUsers();
            } else {
                showNotification(data.message, 'error');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    // ==================== CATEGORIES MANAGEMENT ====================
    async function loadCategories() {
    const search = document.getElementById('category-search').value;
    let url = '../admin/manage_categories.php';
    
    if (search) {
        url += `?search=${encodeURIComponent(search)}`;
    }

    try {
        const data = await apiCall(url);
        
        console.log('📊 Categories data:', data); // DEBUG
        
        if (data.success) {
            renderCategoriesTable(data.categories);
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

    function renderCategoriesTable(categories) {
        const tbody = document.querySelector('#categories-table tbody');
        tbody.innerHTML = '';

        if (categories.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center">Không có danh mục nào</td></tr>';
            return;
        }

        categories.forEach(category => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${category.MaDM}</td>
                <td>
                    <strong>${category.TenDM}</strong>
                    ${category.MoTa ? `<br><small class="text-muted">${category.MoTa}</small>` : ''}
                </td>
                <td>
                    ${category.TenDMCha ? 
                        `<span class="text-primary">${category.TenDMCha}</span>` : 
                        '<span class="text-muted">Không có</span>'
                    }
                </td>
                <td>
                    ${category.AnhDM ? 
                        `<img src="${category.AnhDM}" alt="${category.TenDM}" class="table-image" onerror="this.style.display='none'">` : 
                        '<i class="fas fa-image text-muted"></i>'
                    }
                </td>
                <td>
                    <span class="badge badge-info">${category.SoSanPham || 0} sản phẩm</span>
                </td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editCategory('${category.MaDM}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCategory('${category.MaDM}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    async function showAddCategoryModal() {
        currentEditId = null;
        document.querySelector('#add-category-modal .modal-header h3').textContent = 'Thêm Danh mục mới';
        document.querySelector('#save-category-btn').textContent = 'Thêm Danh mục';
        document.getElementById('category-id').disabled = false; // Cho phép nhập mã khi thêm mới
        await loadCategoriesForParentSelect();
        showModal('add-category-modal');
    }

    async function editCategory(categoryId) {
        try {
            console.log('🔄 Loading category data for edit:', categoryId);
            const data = await apiCall('../admin/manage_categories.php');
            if (data.success && data.categories) {
                // QUAN TRỌNG: So sánh chuỗi với chuỗi
                const category = data.categories.find(c => c.MaDM === categoryId.toString());
                if (category) {
                    currentEditId = categoryId; // Giữ nguyên là string
                    document.getElementById('category-id').value = category.MaDM;
                    document.getElementById('category-id').disabled = false;
                    document.getElementById('category-name').value = category.TenDM;
                    document.getElementById('category-description').value = category.MoTa || '';
                    document.getElementById('category-image-url').value = category.AnhDM || '';
                    
                    await loadCategoriesForParentSelect();
                    document.getElementById('category-parent').value = category.MaDMCha || '';
                    
                    document.querySelector('#add-category-modal .modal-header h3').textContent = 'Sửa Danh mục';
                    document.querySelector('#save-category-btn').textContent = 'Cập nhật Danh mục';
                    showModal('add-category-modal');
                } else {
                    showNotification('Không tìm thấy danh mục', 'error');
                }
            }
        } catch (error) {
            console.error('Error loading category:', error);
            showNotification('Lỗi khi tải thông tin danh mục', 'error');
        }
    }


    async function loadCategoriesForParentSelect() {
        try {
            const data = await apiCall('../admin/manage_categories.php');
            const select = document.getElementById('category-parent');
            
            if (data.success && data.categories) {
                // Giữ lại option đầu tiên
                const firstOption = select.options[0];
                select.innerHTML = '';
                select.appendChild(firstOption);
                
                // Thêm các danh mục (loại trừ danh mục đang edit nếu có)
                data.categories.forEach(category => {
                    // Không cho phép chọn chính nó làm danh mục cha khi edit
                    if (currentEditId && category.MaDM == currentEditId) {
                        return;
                    }
                    
                    const option = document.createElement('option');
                    option.value = category.MaDM;
                    option.textContent = category.TenDM;
                    select.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Error loading categories for parent select:', error);
        }
    }

    // Trong hàm saveCategory()
    async function saveCategory() {
    const formData = {
        tenDM: document.getElementById('category-name').value,
        moTa: document.getElementById('category-description').value,
        anhDM: document.getElementById('category-image-url').value || 'https://via.placeholder.com/300'
    };

    const maDM = document.getElementById('category-id').value.trim();
    formData.maDM = maDM;


    // Lấy giá trị danh mục cha
    const maDMCha = document.getElementById('category-parent').value;
    formData.maDMCha = maDMCha;


    // DEBUG CHI TIẾT
    console.log('=== DEBUG CATEGORY SAVE ===');
    console.log('📌 Mã DM:', formData.maDM);
    console.log('📝 Tên DM:', formData.tenDM);
    console.log('👨‍👦 Danh mục cha:', formData.maDMCha, '(type:', typeof formData.maDMCha + ')');
    console.log('🖼️ Link ảnh:', formData.anhDM);
    console.log('📋 Mô tả:', formData.moTa);
    console.log('==========================');

    if (!formData.maDM || !formData.tenDM) {
        showNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
        return;
    }

    // Kiểm tra link ảnh
    if (formData.anhDM && !isValidUrl(formData.anhDM)) {
        showNotification('Link hình ảnh không hợp lệ', 'error');
        return;
    }

    try {
        const url = '../admin/manage_categories.php';
        const method = currentEditId ? 'PUT' : 'POST';
        
        if (currentEditId) {
            formData.oldMaDM = currentEditId;
        }

        console.log('📤 Gửi dữ liệu đến server...');
        const data = await apiCall(url, {
            method: method,
            body: JSON.stringify(formData)
        });

        if (data.success) {
            showNotification(data.message, 'success');
            closeAllModals();
            loadCategories();
        } else {
            showNotification(data.message, 'error');
        }
    } catch (error) {
        console.error('Error saving category:', error);
    }
}

// Hàm kiểm tra URL hợp lệ
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

    async function deleteCategory(categoryId) {
        if (!confirm('Bạn có chắc muốn xóa danh mục này?')) return;

        try {
            const data = await apiCall('../admin/manage_categories.php', {
                method: 'DELETE',
                body: JSON.stringify({ maDM: categoryId }) // categoryId đã là string
            });

            if (data.success) {
                showNotification(data.message, 'success');
                loadCategories();
            } else {
                showNotification(data.message, 'error');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    }

    // ==================== PRODUCTS MANAGEMENT ====================
async function loadProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const search = document.getElementById('product-search').value;
    
    let url = '../admin/manage_products.php';
    const params = [];
    
    if (categoryFilter && categoryFilter !== 'all') {
        params.push(`maDM=${categoryFilter}`);
    }
    if (search) {
        params.push(`search=${encodeURIComponent(search)}`);
    }
    
    // THÊM: Gỡ bỏ giới hạn phân trang, hiển thị tất cả sản phẩm
    params.push('limit=5000'); // Hiển thị tối đa 5000 sản phẩm
    
    if (params.length > 0) {
        url += '?' + params.join('&');
    }

    try {
        const data = await apiCall(url);
        
        if (data.success) {
            renderProductsTable(data.products);
            if (document.getElementById('category-filter').options.length <= 1) {
                loadCategoriesForFilter(data.categories || []);
            }
            
            // THÊM: Hiển thị tổng số sản phẩm
            console.log(`📊 Loaded ${data.products.length} products`);
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function renderProductsTable(products) {
    const tbody = document.querySelector('#products-table tbody');
    tbody.innerHTML = '';

    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center">Không có sản phẩm nào</td></tr>';
        return;
    }

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.MaSP}</td>
            <td>
                ${product.AnhSP ? 
                    `<img src="${product.AnhSP}" alt="${product.TenSP}" class="table-image" onerror="this.style.display='none'">` : 
                    '<i class="fas fa-image text-muted"></i>'
                }
            </td>
            <td>${product.TenSP}</td>
            <td>${product.TenDM || 'N/A'}</td>
            <td>${formatCurrency(product.Gia)}</td>
            <td>${product.SoLuong}</td>
            <td>
                <span class="status-badge ${product.SoLuong > 0 ? 'status-completed' : 'status-cancelled'}">
                    ${product.SoLuong > 0 ? 'Còn hàng' : 'Hết hàng'}
                </span>
            </td>
            <td>
                <!-- ĐẢM BẢO TRUYỀN ĐÚNG MaSP DẠNG STRING -->
                <button class="btn btn-sm btn-warning" onclick="editProduct('${product.MaSP}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product.MaSP}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}


// hàm showAddProductModal
function showAddProductModal() {
    currentEditId = null;
    document.querySelector('#add-product-modal .modal-header h3').textContent = 'Thêm Sản phẩm mới';
    document.querySelector('#save-product-btn').textContent = 'Thêm Sản phẩm';
    document.getElementById('product-id-group').style.display = 'none'; // Ẩn trường ID khi thêm mới
    document.getElementById('product-id').value = ''; // Xóa giá trị ID
    loadCategoriesForSelect();
    showModal('add-product-modal');
}





async function editProduct(productId) {
    try {
        console.log('🔄 Loading product data for edit:', productId);
        
        // Load tất cả sản phẩm không giới hạn
        const data = await apiCall('../admin/manage_products.php?limit=1000');
        
        if (data.success && data.products) {
            // Tìm sản phẩm với điều kiện linh hoạt
            const product = data.products.find(p => {
                // So sánh linh hoạt cả string và number
                return p.MaSP == productId || 
                       p.MaSP === productId.toString() || 
                       p.MaSP.toString() === productId.toString();
            });
            
            if (product) {
                currentEditId = product.MaSP; // Luôn dùng mã từ server
                
                // Hiển thị và cho phép sửa ID khi edit
                document.getElementById('product-id-group').style.display = 'block';
                document.getElementById('product-id').value = product.MaSP;
                document.getElementById('product-id').disabled = false;
                document.getElementById('product-name').value = product.TenSP;
                document.getElementById('product-description').value = product.MoTa || '';
                document.getElementById('product-price').value = product.Gia;
                document.getElementById('product-quantity').value = product.SoLuong;
                document.getElementById('product-image-url').value = product.AnhSP || '';
                
                // Load categories và chọn đúng category
                await loadCategoriesForSelect();
                document.getElementById('product-category').value = product.MaDM;
                
                document.querySelector('#add-product-modal .modal-header h3').textContent = 'Sửa Sản phẩm';
                document.querySelector('#save-product-btn').textContent = 'Cập nhật Sản phẩm';
                showModal('add-product-modal');
            } else {
                console.error('❌ Product not found:', {
                    requestedId: productId,
                    availableIds: data.products.map(p => p.MaSP)
                });
                showNotification('Không tìm thấy sản phẩm trong hệ thống', 'error');
            }
        } else {
            showNotification('Lỗi tải danh sách sản phẩm', 'error');
        }
    } catch (error) {
        console.error('Error loading product:', error);
        showNotification('Lỗi khi tải thông tin sản phẩm: ' + error.message, 'error');
    }
}

async function deleteProduct(productId) {
    console.log('🗑️ Attempting to delete product:', productId);
    console.log('🗑️ Product ID type:', typeof productId);
    
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;

    try {
        // ĐẢM BẢO productId là string
        const requestBody = { maSP: productId.toString() };
        console.log('📤 Sending delete request:', requestBody);
        
        const data = await apiCall('../admin/manage_products.php', {
            method: 'DELETE',
            body: JSON.stringify(requestBody)
        });

        console.log('📥 Delete response:', data);

        if (data.success) {
            showNotification(data.message, 'success');
            loadProducts();
        } else {
            showNotification(data.message || 'Lỗi không xác định khi xóa sản phẩm', 'error');
        }
    } catch (error) {
        console.error('❌ Error deleting product:', error);
        showNotification('Lỗi kết nối khi xóa sản phẩm: ' + error.message, 'error');
    }
}





async function saveProduct() {
    const formData = {
        tenSP: document.getElementById('product-name').value,
        moTa: document.getElementById('product-description').value,
        gia: parseFloat(document.getElementById('product-price').value),
        soLuong: parseInt(document.getElementById('product-quantity').value),
        maDM: document.getElementById('product-category').value,
        anhSP: document.getElementById('product-image-url').value || 'https://via.placeholder.com/300'
    };

    console.log('💾 Saving product:', formData);

    // Kiểm tra link ảnh hợp lệ
    if (formData.anhSP && !isValidUrl(formData.anhSP)) {
        showNotification('Link hình ảnh không hợp lệ', 'error');
        return;
    }

    if (!formData.tenSP || !formData.gia || !formData.maDM) {
        showNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
        return;
    }

    try {
        const url = '../admin/manage_products.php';
        const method = currentEditId ? 'PUT' : 'POST';
        
        if (currentEditId) {
            // Nếu là sửa, thêm ID cũ và mới
            formData.oldMaSP = currentEditId;
            formData.maSP = document.getElementById('product-id').value.trim();
            
            // Kiểm tra mã sản phẩm mới không được trống khi sửa
            if (!formData.maSP) {
                showNotification('Mã sản phẩm không được để trống', 'error');
                return;
            }
        }
        // Nếu là thêm mới, KHÔNG gửi maSP - để server tự tạo

        const data = await apiCall(url, {
            method: method,
            body: JSON.stringify(formData)
        });

        if (data.success) {
            showNotification(data.message, 'success');
            closeAllModals();
            loadProducts();
        } else {
            showNotification(data.message, 'error');
        }
    } catch (error) {
        console.error('Error saving product:', error);
        showNotification('Lỗi khi lưu sản phẩm: ' + error.message, 'error');
    }
}

    async function loadCategoriesForSelect() {
        try {
            const data = await apiCall('../admin/manage_categories.php');
            const select = document.getElementById('product-category');
            
            if (data.success && data.categories) {
                select.innerHTML = '<option value="">Chọn danh mục</option>';
                data.categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.MaDM;
                    option.textContent = category.TenDM;
                    select.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Error loading categories for select:', error);
        }
    }

    function loadCategoriesForFilter(categories) {
        const select = document.getElementById('category-filter');
        select.innerHTML = '<option value="all">Tất cả danh mục</option>';
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.MaDM;
            option.textContent = category.TenDM;
            select.appendChild(option);
        });
    }

    // ==================== ORDERS MANAGEMENT ====================
    async function loadOrders() {
        const statusFilter = document.getElementById('order-status-filter').value;
        let url = '../admin/manage_orders.php';
        
        if (statusFilter && statusFilter !== 'all') {
            url += `?status=${statusFilter}`;
        }

        try {
            const data = await apiCall(url);
            
            if (data.success) {
                renderOrdersTable(data.orders);
            }
        } catch (error) {
            console.error('Error loading orders:', error);
        }
    }

    function renderOrdersTable(orders) {
        const tbody = document.querySelector('#orders-table tbody');
        tbody.innerHTML = '';

        if (orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center">Không có đơn hàng nào</td></tr>';
            return;
        }

        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>#${order.MaDH}</td>
                <td>${order.Username || order.Email || 'N/A'}</td>
                <td>${formatDate(order.NgayDat)}</td>
                <td>${formatCurrency(order.TongTien)}</td>
                <td>${order.PhuongThuc || 'COD'}</td>
                <td>
                    <select class="status-select" data-order-id="${order.MaDH}" onchange="updateOrderStatus(${order.MaDH}, this.value)">
                        <option value="Chờ xử lý" ${order.TrangThai === 'Chờ xử lý' ? 'selected' : ''}>Chờ xử lý</option>
                        <option value="Đang xử lý" ${order.TrangThai === 'Đang xử lý' ? 'selected' : ''}>Đang xử lý</option>
                        <option value="Đang giao" ${order.TrangThai === 'Đang giao' ? 'selected' : ''}>Đang giao</option>
                        <option value="Hoàn thành" ${order.TrangThai === 'Hoàn thành' ? 'selected' : ''}>Hoàn thành</option>
                        <option value="Đã hủy" ${order.TrangThai === 'Đã hủy' ? 'selected' : ''}>Đã hủy</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewOrderDetail(${order.MaDH})">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    async function updateOrderStatus(orderId, newStatus) {
        if (!confirm(`Bạn có chắc muốn đổi trạng thái đơn hàng #${orderId} thành "${newStatus}"?`)) {
            // Reset về giá trị cũ nếu không confirm
            const select = document.querySelector(`select[data-order-id="${orderId}"]`);
            const currentStatus = getCurrentOrderStatus(orderId);
            if (select && currentStatus) {
                select.value = currentStatus;
            }
            return;
        }

        try {
            console.log('🔄 Updating order status:', orderId, newStatus);
            const data = await apiCall('../admin/manage_orders.php', {
                method: 'PUT',
                body: JSON.stringify({ 
                    maDH: orderId, 
                    trangThai: newStatus 
                })
            });

            if (data.success) {
                showNotification(`✅ Đã cập nhật trạng thái đơn hàng #${orderId} thành "${newStatus}"`, 'success');
                // Reload orders to reflect changes
                loadOrders();
                if (currentPage === 'dashboard') {
                    loadRecentOrders();
                }
            } else {
                showNotification(`❌ Lỗi: ${data.message}`, 'error');
                // Reset về giá trị cũ nếu có lỗi
                const select = document.querySelector(`select[data-order-id="${orderId}"]`);
                const currentStatus = getCurrentOrderStatus(orderId);
                if (select && currentStatus) {
                    select.value = currentStatus;
                }
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            showNotification('❌ Lỗi khi cập nhật trạng thái đơn hàng', 'error');
            // Reset về giá trị cũ nếu có lỗi
            const select = document.querySelector(`select[data-order-id="${orderId}"]`);
            const currentStatus = getCurrentOrderStatus(orderId);
            if (select && currentStatus) {
                select.value = currentStatus;
            }
        }
    }

    function getCurrentOrderStatus(orderId) {
        // Lấy trạng thái hiện tại từ dữ liệu đã load
        // Trong thực tế, bạn nên lưu trạng thái hiện tại khi load dữ liệu
        return 'Chờ xử lý'; // Tạm thời return giá trị mặc định
    }

    async function editOrderStatus(orderId) {
        const newStatus = prompt('Nhập trạng thái mới (Chờ xử lý, Đang xử lý, Đang giao, Hoàn thành, Đã hủy):');
        if (newStatus && ['Chờ xử lý', 'Đang xử lý', 'Đang giao', 'Hoàn thành', 'Đã hủy'].includes(newStatus)) {
            await updateOrderStatus(orderId, newStatus);
        } else if (newStatus) {
            showNotification('Trạng thái không hợp lệ', 'error');
        }
    }



// ==================== TAGS MANAGEMENT ====================
async function loadTags() {
    const search = document.getElementById('tag-search').value;
    let url = '../admin/manage_tags.php';
    if (search) {
        url += `?search=${encodeURIComponent(search)}`;
    }

    try {
        const data = await apiCall(url);
        
        if (data.success) {
            renderTagsTable(data.tags);
        } else {
            showNotification('Lỗi tải tags: ' + data.message, 'error');
        }
    } catch (error) {
        console.error('Error loading tags:', error);
        showNotification('Lỗi khi tải danh sách tag', 'error');
    }
}

function renderTagsTable(tags) {
    const tbody = document.querySelector('#tags-table tbody');
    tbody.innerHTML = '';

    if (tags.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">Không có tag nào</td></tr>';
        return;
    }

    tags.forEach(tag => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tag.MaTag}</td>
            <td>
                <span class="badge badge-primary" style="background: #007bff; color: white; padding: 4px 8px; border-radius: 4px;">
                    ${tag.TenTag}
                </span>
            </td>
            <td>${tag.MoTa || 'N/A'}</td>
            <td>
                <span class="badge badge-info" style="background: #17a2b8; color: white; padding: 4px 8px; border-radius: 4px;">
                    ${tag.SoSanPham || 0} sản phẩm
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editTag(${tag.MaTag})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteTag(${tag.MaTag})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function showAddTagModal() {
    currentEditId = null;
    document.querySelector('#add-tag-modal .modal-header h3').textContent = 'Thêm Tag mới';
    document.querySelector('#save-tag-btn').textContent = 'Thêm Tag';
    document.getElementById('tag-name').value = '';
    document.getElementById('tag-description').value = '';
    showModal('add-tag-modal');
}

async function editTag(tagId) {
    try {
        const data = await apiCall('../admin/manage_tags.php');
        if (data.success && data.tags) {
            const tag = data.tags.find(t => t.MaTag == tagId);
            if (tag) {
                currentEditId = tagId;
                document.getElementById('tag-name').value = tag.TenTag;
                document.getElementById('tag-description').value = tag.MoTa || '';
                
                document.querySelector('#add-tag-modal .modal-header h3').textContent = 'Sửa Tag';
                document.querySelector('#save-tag-btn').textContent = 'Cập nhật Tag';
                showModal('add-tag-modal');
            } else {
                showNotification('Không tìm thấy tag', 'error');
            }
        }
    } catch (error) {
        console.error('Error loading tag:', error);
        showNotification('Lỗi khi tải thông tin tag', 'error');
    }
}

async function saveTag() {
    const formData = {
        tenTag: document.getElementById('tag-name').value.trim(),
        moTa: document.getElementById('tag-description').value.trim()
    };

    if (!formData.tenTag) {
        showNotification('Vui lòng nhập tên tag', 'error');
        return;
    }

    try {
        const url = '../admin/manage_tags.php';
        const method = currentEditId ? 'PUT' : 'POST';
        
        if (currentEditId) {
            formData.maTag = currentEditId;
        }

        const data = await apiCall(url, {
            method: method,
            body: JSON.stringify(formData)
        });

        if (data.success) {
            showNotification(data.message, 'success');
            closeAllModals();
            loadTags();
            // Nếu đang ở trang product-tags, reload lại dữ liệu
            if (currentPage === 'product-tags') {
                loadProductTags();
            }
        } else {
            showNotification(data.message, 'error');
        }
    } catch (error) {
        console.error('Error saving tag:', error);
        showNotification('Lỗi khi lưu tag: ' + error.message, 'error');
    }
}

async function deleteTag(tagId) {
    if (!confirm('Bạn có chắc muốn xóa tag này? Tất cả liên kết với sản phẩm sẽ bị xóa.')) return;

    try {
        const data = await apiCall('../admin/manage_tags.php', {
            method: 'DELETE',
            body: JSON.stringify({ maTag: tagId })
        });

        if (data.success) {
            showNotification(data.message, 'success');
            loadTags();
            // Nếu đang ở trang product-tags, reload lại dữ liệu
            if (currentPage === 'product-tags') {
                loadProductTags();
            }
        } else {
            showNotification(data.message, 'error');
        }
    } catch (error) {
        console.error('Error deleting tag:', error);
        showNotification('Lỗi khi xóa tag: ' + error.message, 'error');
    }
}

// ==================== PRODUCT TAGS MANAGEMENT ====================
let currentProductTags = [];
let availableProductTags = [];
let selectedProductId = null;

async function loadProductsForTagManagement() {
    try {
        const data = await apiCall('../admin/manage_products.php?limit=1000');
        const select = document.getElementById('product-tags-filter');
        
        if (data.success && data.products) {
            select.innerHTML = '<option value="">Chọn sản phẩm...</option>';
            data.products.forEach(product => {
                const option = document.createElement('option');
                option.value = product.MaSP;
                option.textContent = `${product.TenSP} (${product.MaSP})`;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading products for tag management:', error);
        showNotification('Lỗi khi tải danh sách sản phẩm', 'error');
    }
}

async function loadProductTags() {
    const productId = document.getElementById('product-tags-filter').value;
    
    if (!productId) {
        document.getElementById('current-tags-list').innerHTML = '<p class="text-muted">Chọn sản phẩm để xem tags</p>';
        document.getElementById('available-tags-list').innerHTML = '<p class="text-muted">Chọn sản phẩm để xem tags có sẵn</p>';
        return;
    }

    selectedProductId = productId;

    try {
        const data = await apiCall(`../admin/manage_tags.php?productId=${productId}`);
        
        if (data.success) {
            currentProductTags = data.currentTags || [];
            availableProductTags = data.availableTags || [];
            
            renderCurrentTags();
            renderAvailableTags();
        } else {
            showNotification('Lỗi: ' + data.message, 'error');
        }
    } catch (error) {
        console.error('Error loading product tags:', error);
        showNotification('Lỗi khi tải tags: ' + error.message, 'error');
    }
}

function renderCurrentTags() {
    const container = document.getElementById('current-tags-list');
    container.innerHTML = '';

    if (currentProductTags.length === 0) {
        container.innerHTML = '<p class="text-muted">Sản phẩm chưa có tag nào</p>';
        return;
    }

    currentProductTags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag-item current';
        tagElement.innerHTML = `
            <span class="tag-name">${tag.TenTag}</span>
            <button class="remove-tag" onclick="removeTagFromProduct(${tag.MaTag})" title="Xóa tag">
                <i class="fas fa-times"></i>
            </button>
        `;
        container.appendChild(tagElement);
    });
}

function renderAvailableTags() {
    const container = document.getElementById('available-tags-list');
    container.innerHTML = '';

    if (availableProductTags.length === 0) {
        container.innerHTML = '<p class="text-muted">Không có tag nào có sẵn</p>';
        return;
    }

    availableProductTags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag-item available';
        tagElement.innerHTML = `
            <span class="tag-name">${tag.TenTag}</span>
            <button class="add-tag" onclick="addTagToProduct(${tag.MaTag})" title="Thêm tag">
                <i class="fas fa-plus"></i>
            </button>
        `;
        container.appendChild(tagElement);
    });
}

function addTagToProduct(tagId) {
    const tag = availableProductTags.find(t => t.MaTag == tagId);
    if (tag) {
        // Thêm vào current tags
        currentProductTags.push(tag);
        
        // Xóa khỏi available tags
        availableProductTags = availableProductTags.filter(t => t.MaTag != tagId);
        
        renderCurrentTags();
        renderAvailableTags();
        
        showNotification(`Đã thêm tag "${tag.TenTag}" vào sản phẩm`, 'success');
    }
}

function removeTagFromProduct(tagId) {
    const tag = currentProductTags.find(t => t.MaTag == tagId);
    if (tag) {
        // Xóa khỏi current tags
        currentProductTags = currentProductTags.filter(t => t.MaTag != tagId);
        
        // Thêm vào available tags
        availableProductTags.push(tag);
        
        renderCurrentTags();
        renderAvailableTags();
        
        showNotification(`Đã xóa tag "${tag.TenTag}" khỏi sản phẩm`, 'success');
    }
}

async function saveProductTags() {
    if (!selectedProductId) {
        showNotification('Vui lòng chọn sản phẩm', 'error');
        return;
    }

    const tagIds = currentProductTags.map(tag => tag.MaTag);

    try {
        const data = await apiCall('../admin/manage_tags.php?action=update_product_tags', {
            method: 'POST',
            body: JSON.stringify({
                maSP: selectedProductId,
                tags: tagIds
            })
        });

        if (data.success) {
            showNotification(data.message, 'success');
            // Reload để cập nhật số lượng sản phẩm trong bảng tags
            loadTags();
        } else {
            showNotification(data.message, 'error');
        }
    } catch (error) {
        console.error('Error saving product tags:', error);
        showNotification('Lỗi khi lưu tags: ' + error.message, 'error');
    }
}






    // ==================== ORDER DETAIL FUNCTIONS ====================
    async function viewOrderDetail(orderId) {
        try {
            console.log('🔄 Loading order details:', orderId);
            const data = await apiCall(`../admin/manage_orders.php?orderId=${orderId}`);
            
            if (data.success) {
                showOrderDetailModal(data.order, data.orderItems);
            } else {
                showNotification('Không thể tải chi tiết đơn hàng', 'error');
            }
        } catch (error) {
            console.error('Error loading order details:', error);
            showNotification('Lỗi khi tải chi tiết đơn hàng', 'error');
        }
    }

    function showOrderDetailModal(order, orderItems) {
        // Điền thông tin đơn hàng
        document.getElementById('order-detail-id').textContent = order.MaDH;
        document.getElementById('order-customer').textContent = order.Username || order.Email || 'N/A';
        document.getElementById('order-date').textContent = formatDateTime(order.NgayDat);
        document.getElementById('order-total').textContent = formatCurrency(order.TongTien);
        document.getElementById('order-status').innerHTML = `<span class="status-badge status-${order.TrangThai}">${getStatusText(order.TrangThai)}</span>`;
        document.getElementById('order-payment').textContent = order.PhuongThuc || 'COD';
        
        // Điền thông tin giao hàng
        document.getElementById('shipping-receiver').textContent = order.NguoiNhan || 'N/A';
        document.getElementById('shipping-address').textContent = order.DiaChiNhan || 'N/A';
        document.getElementById('shipping-phone').textContent = order.SoDienThoai || 'N/A';
        
        // Điền danh sách sản phẩm
        const itemsList = document.getElementById('order-items-list');
        itemsList.innerHTML = '';
        
        if (orderItems && orderItems.length > 0) {
            orderItems.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <div class="d-flex align-items-center">
                            ${item.AnhSP ? 
                                `<img src="${item.AnhSP}" alt="${item.TenSP}" class="table-image mr-2" onerror="this.style.display='none'">` : 
                                '<i class="fas fa-image text-muted mr-2"></i>'
                            }
                            <div>
                                <strong>${item.TenSP}</strong>
                                ${item.MaSP ? `<br><small class="text-muted">Mã SP: ${item.MaSP}</small>` : ''}
                            </div>
                        </div>
                    </td>
                    <td>${formatCurrency(item.DonGia)}</td>
                    <td>${item.SoLuong}</td>
                    <td><strong>${formatCurrency(item.ThanhTien)}</strong></td>
                `;
                itemsList.appendChild(row);
            });
            
            // Thêm dòng tổng cộng
            const totalRow = document.createElement('tr');
            totalRow.innerHTML = `
                <td colspan="3" class="text-right"><strong>Tổng cộng:</strong></td>
                <td><strong class="text-primary">${formatCurrency(order.TongTien)}</strong></td>
            `;
            itemsList.appendChild(totalRow);
        } else {
            itemsList.innerHTML = '<tr><td colspan="4" class="text-center">Không có sản phẩm</td></tr>';
        }
        
        showModal('order-detail-modal');
    }

    function printOrder() {
        const orderId = document.getElementById('order-detail-id').textContent;
        showNotification(`In đơn hàng #${orderId}`, 'info');
        // Có thể thêm chức năng in thực tế ở đây
    }

    function formatDateTime(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN');
    }





    // ==================== SETTINGS ====================
    async function saveSettings(e) {
        e.preventDefault();
        
        const formData = {
            shopName: document.getElementById('shop-name').value,
            shopEmail: document.getElementById('shop-email').value,
            shopPhone: document.getElementById('shop-phone').value,
            shopAddress: document.getElementById('shop-address').value
        };

        showNotification('Cài đặt đã được lưu thành công', 'success');
    }

    // ==================== UTILITY FUNCTIONS ====================
    function formatCurrency(amount) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount || 0);
    }

    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    }

    function getStatusText(status) {
        const statusMap = {
            'pending': 'Chờ xử lý',
            'processing': 'Đang xử lý',
            'shipped': 'Đang giao',
            'completed': 'Hoàn thành',
            'cancelled': 'Đã hủy',
            'Chờ xử lý': 'Chờ xử lý',
            'Đang xử lý': 'Đang xử lý',
            'Đang giao': 'Đang giao',
            'Hoàn thành': 'Hoàn thành',
            'Đã hủy': 'Đã hủy'
        };
        return statusMap[status] || status;
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function showNotification(message, type = 'info') {
        // Xóa notification cũ nếu có
        const oldNotification = document.querySelector('.notification');
        if (oldNotification) {
            oldNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}-circle"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // ==================== GLOBAL FUNCTIONS ====================
    window.editUser = editUser;
    window.deleteUser = deleteUser;
    window.editCategory = editCategory;
    window.deleteCategory = deleteCategory;
    window.editProduct = editProduct;
    window.deleteProduct = deleteProduct;
    window.updateOrderStatus = updateOrderStatus;
    window.editOrderStatus = editOrderStatus;
    window.viewOrderDetail = viewOrderDetail;
    window.printOrder = printOrder;
    window.editTag = editTag;
    window.deleteTag = deleteTag;
    window.addTagToProduct = addTagToProduct;
    window.removeTagFromProduct = removeTagFromProduct;
});

// CSS cho notification và các element
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        z-index: 10000;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s ease;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }

    .notification-success {
        background: #28a745;
    }

    .notification-error {
        background: #dc3545;
    }

    .notification-info {
        background: #17a2b8;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .table-image {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 4px;
    }

    .status-badge {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
    }

    .status-pending, .status-Chờ xử lý { background: #fff3cd; color: #856404; }
    .status-processing, .status-Đang xử lý { background: #cce7ff; color: #004085; }
    .status-shipped, .status-Đang giao { background: #d1ecf1; color: #0c5460; }
    .status-completed, .status-Hoàn thành { background: #d4edda; color: #155724; }
    .status-cancelled, .status-Đã hủy { background: #f8d7da; color: #721c24; }

    .role-badge {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
    }

    .role-user { background: #e9ecef; color: #495057; }
    .role-admin { background: #007bff; color: white; }

    .status-select {
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
        font-size: 12px;
        background: white;
        cursor: pointer;
    }

    .status-select:focus {
        outline: none;
        border-color: #007bff;
    }

    .status-select:hover {
        border-color: #007bff;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
    }

    .form-control {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
    }

    .form-control:focus {
        outline: none;
        border-color: #007bff;
    }

    .form-text {
        font-size: 12px;
        color: #6c757d;
        margin-top: 4px;
    }
`;

// Thêm styles vào DOM
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);