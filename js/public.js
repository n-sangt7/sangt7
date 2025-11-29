// ========== AUTHENTICATION MANAGER ==========
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadUserFromStorage();
        this.checkServerSession().then(isValid => {
            if (!isValid && this.isLoggedIn()) {
                // Session server không hợp lệ nhưng local có data -> clear
                this.clearUser();
            }
            this.updateUI();
        });
        this.initEventListeners();
        this.initDropdown();
    }

    // Load user từ localStorage
    loadUserFromStorage() {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }

    // Lưu user vào localStorage
    saveUserToStorage(user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    // Xóa thông tin user
    clearUser() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }

    // Kiểm tra trạng thái đăng nhập
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Cập nhật giao diện người dùng
    updateUI() {
        const loginLink = document.getElementById('login-link');
        const userDropdown = document.getElementById('user-dropdown');
        const userAvatar = document.getElementById('user-avatar');
        const avatarPlaceholder = document.getElementById('avatar-placeholder');
        const userDisplayName = document.getElementById('user-display-name');

        if (this.isLoggedIn()) {
            // Hiển thị dropdown user
            if (loginLink) loginLink.style.display = 'none';
            if (userDropdown) userDropdown.style.display = 'block';
            
            if (userDisplayName) {
                userDisplayName.textContent = this.currentUser.username || 'Tài khoản';
            }
            
            // Xử lý avatar
            if (this.currentUser.avatar) {
                if (userAvatar) {
                    userAvatar.src = this.currentUser.avatar;
                    userAvatar.style.display = 'block';
                    userAvatar.alt = `Avatar của ${this.currentUser.username}`;
                    if (avatarPlaceholder) avatarPlaceholder.style.display = 'none';
                }
            } else {
                // Hiển thị placeholder nếu không có avatar
                if (userAvatar) userAvatar.style.display = 'none';
                if (avatarPlaceholder) avatarPlaceholder.style.display = 'flex';
            }
        } else {
            // Hiển thị nút đăng nhập
            if (loginLink) loginLink.style.display = 'flex';
            if (userDropdown) userDropdown.style.display = 'none';
        }
    }

    // Khởi tạo event listeners
    initEventListeners() {
        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
    }

    // Đăng xuất
    logout() {
        fetch('../php/logout.php', {
            method: 'POST',
            credentials: 'same-origin'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                this.clearUser();
                this.updateUI();
                this.closeDropdown();
                this.showNotification('Đã đăng xuất thành công!');
                
                // Chuyển hướng về trang chủ sau 1 giây
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        })
        .catch(error => {
            console.error('Logout error:', error);
            // Vẫn clear local data dù API fail
            this.clearUser();
            this.updateUI();
            this.showNotification('Đã đăng xuất!');
            window.location.href = 'index.html';
        });
    }

    // Hiển thị thông báo
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Lấy thông tin user hiện tại
    getCurrentUser() {
        return this.currentUser;
    }

    reloadUserSession() {
        return this.checkServerSession().then(success => {
            if (success) {
                this.updateUI();
                return true;
            }
            return false;
        });
    }

    // Kiểm tra session trên server
    async checkServerSession() {
        try {
            const response = await fetch('../php/check_session.php', {
                credentials: 'same-origin',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            if (data.logged_in && data.username) {
                let avatarUrl = data.avatar;
                
                // Thêm timestamp để tránh cache nếu không phải avatar mặc định
                if (avatarUrl && !avatarUrl.includes('default-avatar')) {
                    avatarUrl = avatarUrl + '?t=' + new Date().getTime();
                }
                
                const userData = {
                    id: data.user_id || 0,
                    username: data.username,
                    email: data.email,
                    phone: data.phone || '',
                    sex: data.sex || '', 
                    birthday: data.birthday || '',
                    address: data.address || '',
                    avatar: avatarUrl || '../img/default-avatar.png'
                };
                
                this.saveUserToStorage(userData);
                this.updateUI();
                return true;
            } else {
                this.clearUser();
                this.updateUI();
                return false;
            }
        } catch (error) {
            console.error('Session check error:', error);
            return this.isLoggedIn();
        }
    }

    // Khởi tạo dropdown
    initDropdown() {
        const dropdownLogout = document.getElementById('dropdown-logout');

        // Chỉ cần xử lý logout
        if (dropdownLogout) {
            dropdownLogout.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
    }

    // Thêm vào class AuthManager
    handleLoginSuccess(data) {
        if (data.success && data.user) {
            // Lưu thông tin user vào localStorage
            const userData = {
                id: data.user.id,
                username: data.user.username,
                email: data.user.email,
                phone: data.user.phone || '',
                sex: data.user.sex || '',
                birthday: data.user.birthday || '',
                address: data.user.address || '',
                avatar: data.user.avatar || '../img/default-avatar.jpg'
            };
            
            this.saveUserToStorage(userData);
            this.updateUI();
            this.showNotification(data.message || 'Đăng nhập thành công!');
            
            // Chuyển hướng nếu có redirect URL
            if (data.redirect) {
                setTimeout(() => {
                    window.location.href = data.redirect;
                }, 1000);
            }
            
            return true;
        }
        return false;
    }
}

// ========== CART MANAGER ==========
class CartManager {
    constructor() {
        this.cartItems = [];
        this.total = 0;
        this.totalItems = 0;
        this.init();
    }

    init() {
        this.loadFromLocalStorage(); // Load từ localStorage trước
        this.updateCartUI();
        this.loadCart(); // Sau đó sync với server
    }

    // Load từ localStorage
    loadFromLocalStorage() {
        const savedCart = localStorage.getItem('cartData');
        if (savedCart) {
            const cartData = JSON.parse(savedCart);
            // Kiểm tra timestamp (5 phút)
            if (Date.now() - cartData.timestamp < 5 * 60 * 1000) {
                this.cartItems = cartData.items || [];
                this.total = cartData.total || 0;
                this.totalItems = cartData.totalItems || 0;
                console.log('📦 Cart loaded from localStorage:', this.totalItems, 'items');
                return true;
            }
        }
        return false;
    }

    // Gọi API giỏ hàng
    async callCartAPI(action, data = {}) {
        try {
            const url = `../php/cart_api.php?action=${action}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            return await response.json();
        } catch (error) {
            console.error(`Cart API error (${action}):`, error);
            return { success: false, message: 'Lỗi kết nối mạng' };
        }
    }

    // Thêm sản phẩm vào giỏ hàng
    async addToCart(productId, quantity = 1) {
        console.log('🛒 Adding to cart:', { productId, quantity });
        
        const data = await this.callCartAPI('add', {
            product_id: productId,
            quantity: quantity
        });

        if (data.success) {
            this.showNotification(data.message, 'success');
            await this.loadCart();
            this.updateCartUI();
            return true;
        } else {
            this.showNotification(data.message, 'error');
            return false;
        }
    }

    // Tải giỏ hàng từ server
    async loadCart() {
        try {
            const data = await this.callCartAPI('get');
            console.log('🔄 Loading cart data:', data);

            if (data.success) {
                this.cartItems = data.cart_items || [];
                this.total = data.total || 0;
                this.totalItems = data.total_items || 0;
                console.log('✅ Cart loaded successfully:', this.totalItems, 'items');
                
                // Lưu vào localStorage để tránh mất khi reload
                localStorage.setItem('cartData', JSON.stringify({
                    items: this.cartItems,
                    total: this.total,
                    totalItems: this.totalItems,
                    timestamp: Date.now()
                }));
            } else {
                // Nếu không thành công, thử load từ localStorage
                this.loadFromLocalStorage();
                
                if (data.message !== 'Vui lòng đăng nhập') {
                    console.log('Cart load error:', data.message);
                }
            }
            
            this.updateCartUI();
        } catch (error) {
            console.error('❌ Cart load error:', error);
            // Fallback: load từ localStorage
            this.loadFromLocalStorage();
            this.updateCartUI();
        }
    }

    // Cập nhật UI giỏ hàng (số lượng trên icon)
    updateCartUI() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.textContent = this.totalItems;
        });
        console.log('🔄 Cart UI updated:', this.totalItems, 'items');
    }

    // Hiển thị thông báo
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// ========== PRODUCT MANAGER ==========
class ProductManager {
    constructor(categoryType, categoryApi, productApi) {
        this.categoryType = categoryType;
        this.categoryApi = categoryApi;
        this.productApi = productApi;
        this.init();
    }

    init() {
        this.loadCategories();
        this.loadProducts();
        this.initCommonEventListeners();
        this.initCompactModal();
    }

    // Load categories from database
    async loadCategories() {
        try {
            // THÊM THAM SỐ maDMCha vào URL
            const response = await fetch(`${this.categoryApi}?maDMCha=${this.categoryType}`);
            const data = await response.json();

            console.log('📂 Categories API response:', data); // Debug

            if (data.success) {
                this.displayCategories(data.categories);
            } else {
                console.error('Categories API error:', data.message);
            }
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    }

    // Display categories in filter buttons
    displayCategories(categories) {
        const filterContainer = document.getElementById('categoryFilter');
        if (!filterContainer) return;

        filterContainer.innerHTML = '';

        // Add "All" button
        const allButton = document.createElement('button');
        allButton.className = 'filter-btn active';
        allButton.setAttribute('data-category', 'all');
        allButton.textContent = 'Tất Cả';
        allButton.addEventListener('click', () => {
            this.loadProducts();
            this.setActiveCategory(allButton);
        });
        filterContainer.appendChild(allButton);

        // Add category buttons
        categories.forEach(category => {
            if (category.MaDM !== this.categoryType) {
                const button = document.createElement('button');
                button.className = 'filter-btn';
                button.setAttribute('data-category', category.MaDM);
                button.innerHTML = `
                    ${category.TenDM}
                    <span class="product-count">(${category.SoSanPham})</span>
                `;
                button.addEventListener('click', () => {
                    this.loadProducts(category.MaDM);
                    this.setActiveCategory(button);
                });
                filterContainer.appendChild(button);
            }
        });
    }

    // Load products from database
    async loadProducts(categoryId = null, showAll = false) {
        try {
            let url = this.productApi;
            
            // SỬA LẠI CÁCH TẠO URL
            if (categoryId && categoryId !== 'all') {
                url += `?maDM=${categoryId}`;
            } else {
                url += `?maDMCha=${this.categoryType}`;
            }

            console.log('🔄 Loading products from:', url); // Debug

            const response = await fetch(url);
            const data = await response.json();

            console.log('📦 Products API response:', data); // Debug

            if (data.success) {
                this.displayProducts(data.products, showAll);
            } else {
                console.error('Products API error:', data.message);
                this.showNotification('Lỗi tải sản phẩm: ' + data.message, 'error');
            }
        } catch (error) {
            console.error('Error loading products:', error);
            this.showNotification('Lỗi kết nối khi tải sản phẩm', 'error');
        }
    }

    // Display products in the grid
    displayProducts(products, showAll = false) {
        const container = document.getElementById('productsContainer');
        if (!container) return;
        
        if (products.length === 0) {
            container.innerHTML = '<p class="no-products">Không có sản phẩm nào trong danh mục này.</p>';
            return;
        }

        // Group products by category
        const productsByCategory = {};
        products.forEach(product => {
            if (!productsByCategory[product.TenDM]) {
                productsByCategory[product.TenDM] = [];
            }
            productsByCategory[product.TenDM].push(product);
        });

        let html = '';
        
        Object.keys(productsByCategory).forEach(categoryName => {
            const categoryProducts = productsByCategory[categoryName];
            const displayProducts = showAll ? categoryProducts : categoryProducts.slice(0,5);
            
            html += `
                <div class="brand-section">
                    <div class="brand-header">
                        <h3 class="brand-title">${categoryName}</h3>
                        ${!showAll && categoryProducts.length > 5 ? `
                            <button class="btn-view-all" data-category="${categoryProducts[0].MaDM}">
                                Xem tất cả (${categoryProducts.length})
                            </button>
                        ` : ''}
                    </div>
                    <div class="product-grid">
                        ${displayProducts.map(product => this.createProductCard(product)).join('')}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        // Re-attach event listeners
        this.initProductModals();
        this.initWishlist();
        this.initViewAllButtons();
    }

    // Create product card HTML
    createProductCard(product) {
        const defaultImage = this.getDefaultImage();
        return `
            <div class="product-card" data-brand="${product.TenDM.toLowerCase()}">
                <div class="product-image">
                    <img src="${product.AnhSP || defaultImage}" alt="${product.TenSP}" />
                    ${product.SoLuong > 0 ? '<div class="product-badge">Còn hàng</div>' : '<div class="product-badge out-of-stock">Hết hàng</div>'}
                    <button class="btn-wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.TenSP}</h3>
                    <div class="product-description">
                        ${this.formatDescription(product.MoTa || this.getDefaultDescription())}
                    </div>
                    <div class="product-price">
                        <span class="current-price">${this.formatPrice(product.Gia)}</span>
                    </div>
                    <div class="product-stock">
                        <span class="stock-info">Kho: ${product.SoLuong} sản phẩm</span>
                    </div>
                    <button class="btn-details" data-id="${product.MaSP}">Xem Chi Tiết</button>
                </div>
            </div>
        `;
    }

    // Get default image based on category
    getDefaultImage() {
        const defaultImages = {
            'DT': '../img/default-phone.jpg',
            'MT': '../img/default-laptop.jpg',
            'default': '../img/default-product.jpg'
        };
        return defaultImages[this.categoryType] || defaultImages.default;
    }

    // Get default description based on category
    getDefaultDescription() {
        const defaultDescriptions = {
            'DT': 'Điện thoại chất lượng cao với thiết kế hiện đại và tính năng tiên tiến.',
            'MT': 'Laptop chất lượng cao với hiệu năng vượt trội và thiết kế hiện đại.',
            'default': 'Sản phẩm chất lượng cao với thiết kế hiện đại.'
        };
        return defaultDescriptions[this.categoryType] || defaultDescriptions.default;
    }

    // Set active category
    setActiveCategory(clickedButton) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        clickedButton.classList.add('active');
    }

    // Initialize "View All" buttons
    initViewAllButtons() {
        const viewAllButtons = document.querySelectorAll('.btn-view-all');
        
        viewAllButtons.forEach(button => {
            button.addEventListener('click', () => {
                const categoryId = button.getAttribute('data-category');
                this.loadProducts(categoryId, true);
            });
        });
    }

    // Initialize common event listeners
    initCommonEventListeners() {
        this.initSearch();
    }

    // Search functionality
    initSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.performSearch());
        }
        
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }
    }

    performSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            this.showNotification(`Đang tìm kiếm: "${searchTerm}"`);
            this.filterProductsBySearch(searchTerm);
        }
    }

    filterProductsBySearch(term) {
        const productCards = document.querySelectorAll('.product-card');
        let found = false;
        
        productCards.forEach((card) => {
            const productName = card.querySelector('.product-name').textContent.toLowerCase();
            
            if (productName.includes(term.toLowerCase())) {
                card.style.display = 'block';
                found = true;
                const brandSection = card.closest('.brand-section');
                if (brandSection) {
                    brandSection.style.display = 'block';
                    brandSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else {
                card.style.display = 'none';
            }
        });
        
        if (!found) {
            this.showNotification('Không tìm thấy sản phẩm phù hợp!');
        }
    }

    // Common utility functions
    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    }

    formatDescription(description) {
        if (!description) return '';
        const formattedDesc = description
            .replace(/\n/g, '<br>')
            .replace(/\r/g, '')
            .replace(/\•/g, '•');
        return formattedDesc;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #8b4513, #a0522d);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Product modals
    initProductModals() {
        const modal = document.getElementById('productModal');
        const modalClose = document.getElementById('modalClose');
        const detailButtons = document.querySelectorAll('.btn-details');

        detailButtons.forEach((button) => {
            button.addEventListener('click', async () => {
                const productId = button.getAttribute('data-id');
                
                try {
                    const response = await fetch(`../php/get_product_detail.php?id=${productId}`);
                    const data = await response.json();

                    if (data.success) {
                        const product = data.product;
                        this.displayCompactModal(product);
                    }
                } catch (error) {
                    console.error('Error loading product details:', error);
                }
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    }

    closeModal() {
        const modal = document.getElementById('productModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Wishlist functionality
    initWishlist() {
        const wishlistButtons = document.querySelectorAll('.btn-wishlist');
        
        wishlistButtons.forEach((button) => {
            button.addEventListener('click', function () {
                const icon = this.querySelector('i');
                
                if (icon.classList.contains('far')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = '#e74c3c';
                    this.showNotification('Đã thêm vào danh sách yêu thích!');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '';
                    this.showNotification('Đã xóa khỏi danh sách yêu thích!');
                }
            }.bind(this));
        });
    }

    // Phương thức khởi tạo modal compact
    initCompactModal() {
        const modal = document.getElementById('productModal');
        const modalClose = document.getElementById('modalClose');
        const detailButtons = document.querySelectorAll('.btn-details');

        detailButtons.forEach((button) => {
            button.addEventListener('click', async () => {
                const productId = button.getAttribute('data-id');
                
                try {
                    const response = await fetch(`../php/get_product_detail.php?id=${productId}`);
                    const data = await response.json();

                    if (data.success) {
                        const product = data.product;
                        this.displayCompactModal(product);
                    }
                } catch (error) {
                    console.error('Error loading product details:', error);
                }
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    }

    // Phương thức hiển thị modal compact
    displayCompactModal(product) {
        const modal = document.getElementById('productModal');
        if (!modal) {
            console.error('Modal element not found');
            return;
        }
        
        // Lưu product data vào modal để sử dụng sau
        modal.dataset.productId = product.MaSP;
        
        // Cập nhật nội dung modal với ID chính xác
        const modalImage = modal.querySelector('#modalImage');
        const modalTitle = modal.querySelector('#modalTitle');
        const modalCurrentPrice = modal.querySelector('#modalCurrentPrice');
        const modalSpecs = modal.querySelector('#modalSpecs');
        const modalStock = modal.querySelector('#modalStock');
        const modalCategory = modal.querySelector('#modalCategory');
        
        if (modalImage) modalImage.src = product.AnhSP || this.getDefaultImage();
        if (modalTitle) modalTitle.textContent = product.TenSP;
        if (modalCurrentPrice) modalCurrentPrice.textContent = this.formatPrice(product.Gia);
        if (modalStock) modalStock.textContent = product.SoLuong;
        if (modalCategory) modalCategory.textContent = product.TenDM;
        
        if (modalSpecs) {
            modalSpecs.innerHTML = `
                <div class="specs-content">
                    ${this.formatDescription(product.MoTa || 'Đang cập nhật')}
                </div>
            `;
        }

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // KHỞI TẠO LẠI CÁC TÍNH NĂNG TƯƠNG TÁC - QUAN TRỌNG!
        this.initModalInteractions(product);
    }

    // Phương thức xử lý tương tác trong modal
    initModalInteractions(product) {
        console.log('🚀 Initializing modal interactions for product:', product.MaSP);
        
        // ĐỢI MỘT CHÚT ĐỂ MODAL ĐƯỢC RENDER HOÀN TOÀN
        setTimeout(() => {
            // Xử lý nút "Thêm vào giỏ hàng"
            const addToCartBtn = document.querySelector('.btn-add-cart');
            console.log('➕ Add to cart button found:', addToCartBtn);
            
            if (addToCartBtn) {
                // XÓA HOÀN TOÀN EVENT CŨ VÀ THÊM MỚI
                const newAddToCartBtn = addToCartBtn.cloneNode(true);
                addToCartBtn.parentNode.replaceChild(newAddToCartBtn, addToCartBtn);
                
                newAddToCartBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const quantityInput = document.querySelector('.qty-input');
                    const quantity = parseInt(quantityInput?.value) || 1;
                    
                    console.log('🛒 Add to cart clicked - Product:', product.MaSP, 'Quantity:', quantity);
                    console.log('🔑 Auth status:', window.authManager?.isLoggedIn());
                    console.log('📦 Cart manager:', window.cartManager);
                    
                    if (window.authManager && window.authManager.isLoggedIn()) {
                        if (window.cartManager) {
                            window.cartManager.addToCart(product.MaSP, quantity)
                                .then(success => {
                                    if (success) {
                                        console.log('✅ Product added to cart successfully');
                                        window.cartManager.showNotification('Đã thêm sản phẩm vào giỏ hàng!', 'success');
                                        this.closeModal();
                                    }
                                })
                                .catch(error => {
                                    console.error('❌ Error adding to cart:', error);
                                    window.cartManager.showNotification('Lỗi khi thêm vào giỏ hàng', 'error');
                                });
                        } else {
                            console.error('❌ cartManager not found');
                            window.authManager.showNotification('Lỗi hệ thống, vui lòng thử lại', 'error');
                        }
                    } else {
                        console.log('🔐 User not logged in, redirecting to login');
                        window.authManager.showNotification('Vui lòng đăng nhập để thêm vào giỏ hàng', 'error');
                        setTimeout(() => {
                            window.location.href = 'login.html';
                        }, 1500);
                    }
                });
            } else {
                console.error('❌ Add to cart button NOT found in modal');
            }

            // Xử lý nút "Mua ngay"
            const buyNowBtn = document.querySelector('.btn-buy-now');
            console.log('⚡ Buy now button found:', buyNowBtn);
            
            if (buyNowBtn) {
                const newBuyNowBtn = buyNowBtn.cloneNode(true);
                buyNowBtn.parentNode.replaceChild(newBuyNowBtn, buyNowBtn);
                
                newBuyNowBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const quantityInput = document.querySelector('.qty-input');
                    const quantity = parseInt(quantityInput?.value) || 1;
                    
                    console.log('🚀 Buy now clicked - Product:', product.MaSP, 'Quantity:', quantity);
                    
                    if (window.authManager && window.authManager.isLoggedIn()) {
                        if (window.cartManager) {
                            window.cartManager.addToCart(product.MaSP, quantity)
                                .then(success => {
                                    if (success) {
                                        console.log('✅ Product added to cart, redirecting to cart page');
                                        window.cartManager.showNotification('Đã thêm sản phẩm vào giỏ hàng!', 'success');
                                        this.closeModal();
                                        setTimeout(() => {
                                            window.location.href = 'cart.html';
                                        }, 1000);
                                    }
                                })
                                .catch(error => {
                                    console.error('❌ Error adding to cart:', error);
                                    window.cartManager.showNotification('Lỗi khi thêm vào giỏ hàng', 'error');
                                });
                        } else {
                            console.error('❌ cartManager not found');
                            window.authManager.showNotification('Lỗi hệ thống, vui lòng thử lại', 'error');
                        }
                    } else {
                        console.log('🔐 User not logged in, redirecting to login');
                        window.authManager.showNotification('Vui lòng đăng nhập để mua hàng', 'error');
                        setTimeout(() => {
                            window.location.href = 'login.html';
                        }, 1500);
                    }
                });
            }

            // Xử lý tăng/giảm số lượng - SỬA LẠI
            this.initQuantityControls();
            
        }, 100);
    }

    // SỬA LẠI PHƯƠNG THỨC QUANTITY CONTROLS
    initQuantityControls() {
        const minusBtn = document.querySelector('.qty-btn.minus');
        const plusBtn = document.querySelector('.qty-btn.plus');
        const qtyInput = document.querySelector('.qty-input');

        console.log('🔢 Quantity controls:', { minusBtn, plusBtn, qtyInput });

        if (minusBtn && plusBtn && qtyInput) {
            // ĐẢM BẢO GIÁ TRỊ BẮT ĐẦU LÀ 1
            qtyInput.value = 1;
            
            // XÓA EVENT CŨ VÀ THÊM MỚI
            const newMinusBtn = minusBtn.cloneNode(true);
            const newPlusBtn = plusBtn.cloneNode(true);
            const newQtyInput = qtyInput.cloneNode(true);
            
            minusBtn.parentNode.replaceChild(newMinusBtn, minusBtn);
            plusBtn.parentNode.replaceChild(newPlusBtn, plusBtn);
            qtyInput.parentNode.replaceChild(newQtyInput, qtyInput);
            
            // Minus button
            newMinusBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                let currentQty = parseInt(newQtyInput.value);
                if (currentQty > 1) {
                    newQtyInput.value = currentQty - 1;
                }
                console.log('➖ Quantity decreased to:', newQtyInput.value);
            });

            // Plus button
            newPlusBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                let currentQty = parseInt(newQtyInput.value);
                if (currentQty < 10) {
                    newQtyInput.value = currentQty + 1;
                }
                console.log('➕ Quantity increased to:', newQtyInput.value);
            });

            // Input change - ngăn nhập trực tiếp
            newQtyInput.addEventListener('change', (e) => {
                let value = parseInt(e.target.value);
                if (isNaN(value) || value < 1) value = 1;
                if (value > 10) value = 10;
                e.target.value = value;
                console.log('📝 Quantity changed to:', value);
            });
            
            // Ngăn scroll khi hover input number
            newQtyInput.addEventListener('wheel', (e) => {
                e.preventDefault();
            });
        }
    }
}

// ========== GLOBAL INITIALIZATION ==========
// Khởi tạo AuthManager toàn cục
const authManager = new AuthManager();

// Khởi tạo CartManager toàn cục
const cartManager = new CartManager();

// Slider functionality (common)
function initSlider() {
    const sliderTrack = document.querySelector('.slider-track');
    if (!sliderTrack) return;

    const slides = document.querySelectorAll('.slider-item');
    let currentIndex = 0;

    // Auto slide
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }, 5000);

    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
}

// Export cho sử dụng trong modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        AuthManager, 
        authManager, 
        ProductManager, 
        CartManager,
        cartManager,
        initSlider 
    };
}

// Debug information
console.log('Script loaded - checking managers:');
console.log('authManager:', window.authManager);
console.log('cartManager:', window.cartManager);

// Debug cart loading
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛒 Cart Manager Status:', {
        instance: window.cartManager,
        totalItems: window.cartManager?.totalItems,
        cartItems: window.cartManager?.cartItems?.length
    });
    
    // Kiểm tra localStorage
    const savedCart = localStorage.getItem('cartData');
    console.log('💾 LocalStorage cart data:', savedCart);
    
    // Force reload cart after page load
    if (window.cartManager) {
        setTimeout(() => {
            window.cartManager.loadCart();
        }, 1000);
    }
});

// Debug khi DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== 🛠 DEBUG MODE ACTIVATED ===');
    console.log('Window objects:');
    console.log('- authManager:', window.authManager);
    console.log('- cartManager:', window.cartManager);
    
    // Kiểm tra modal tồn tại
    const modal = document.getElementById('productModal');
    console.log('- productModal element:', modal);
    
    // Kiểm tra các button trong modal
    if (modal) {
        const addToCartBtn = modal.querySelector('.btn-add-cart');
        const buyNowBtn = modal.querySelector('.btn-buy-now');
        console.log('- Modal buttons:', { addToCartBtn, buyNowBtn });
    }
    
    console.log('=== 🛠 DEBUG MODE END ===');
});

// Override để debug khi modal hiển thị
const originalDisplayModal = ProductManager.prototype.displayCompactModal;
ProductManager.prototype.displayCompactModal = function(product) {
    console.log('🎯 Displaying modal for product:', product);
    originalDisplayModal.call(this, product);
};

// Đảm bảo các managers có thể truy cập toàn cục
window.authManager = authManager;
window.cartManager = cartManager;

// Debug khi modal hiển thị
document.addEventListener('DOMContentLoaded', function() {
    // Override để debug khi modal hiển thị
    const originalDisplayModal = ProductManager.prototype.displayCompactModal;
    ProductManager.prototype.displayCompactModal = function(product) {
        console.log('🎯 Displaying modal for product:', product.MaSP);
        console.log('🔗 Managers available:', {
            authManager: !!window.authManager,
            cartManager: !!window.cartManager,
            productManager: !!window.productManager
        });
        
        originalDisplayModal.call(this, product);
        
        // Debug thêm sau khi modal hiển thị
        setTimeout(() => {
            const addToCartBtn = document.querySelector('.btn-add-cart');
            const buyNowBtn = document.querySelector('.btn-buy-now');
            console.log('🔍 Modal buttons after display:', {
                addToCartBtn: !!addToCartBtn,
                buyNowBtn: !!buyNowBtn
            });
        }, 200);
    };
});