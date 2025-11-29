// ========== CART PAGE MANAGER ==========
class CartPageManager {
    constructor() {
        this.cartItems = [];
        this.total = 0;
        this.totalItems = 0;
        this.init();
    }

    init() {
        this.loadCart();
        this.initEventListeners();
    }

    // Tải giỏ hàng từ server
    async loadCart() {
        try {
            console.log('🔄 Đang tải giỏ hàng...');
            const response = await fetch('../php/get_cart.php');
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            console.log('📦 Dữ liệu giỏ hàng:', data);

            if (data.success) {
                this.cartItems = data.cart_items || [];
                this.total = data.total_price || 0;
                this.totalItems = data.total_items || 0;
                console.log('✅ Giỏ hàng tải thành công:', this.totalItems, 'sản phẩm');
                this.displayCart();
            } else {
                this.cartItems = [];
                this.total = 0;
                this.totalItems = 0;
                this.displayEmptyCart();
                
                if (data.message !== 'Vui lòng đăng nhập để xem giỏ hàng') {
                    this.showNotification(data.message, 'error');
                }
            }
        } catch (error) {
            console.error('❌ Lỗi tải giỏ hàng:', error);
            this.cartItems = [];
            this.total = 0;
            this.totalItems = 0;
            this.displayEmptyCart();
            this.showNotification('Lỗi kết nối mạng', 'error');
        }
    }

    // Cập nhật số lượng sản phẩm
    async updateCartItem(cartId, quantity) {
        try {
            const response = await fetch('../php/cart_api.php?action=update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cart_id: cartId,
                    quantity: quantity
                })
            });

            const data = await response.json();

            if (data.success) {
                await this.loadCart();
            } else {
                this.showNotification(data.message, 'error');
                await this.loadCart(); // Tải lại để đồng bộ
            }
        } catch (error) {
            console.error('❌ Lỗi cập nhật giỏ hàng:', error);
            this.showNotification('Lỗi kết nối mạng', 'error');
        }
    }

    // Xóa sản phẩm khỏi giỏ hàng
    async removeFromCart(cartId) {
        if (!confirm('Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?')) {
            return;
        }

        try {
            const response = await fetch('../php/cart_api.php?action=remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cart_id: cartId
                })
            });

            const data = await response.json();

            if (data.success) {
                this.showNotification(data.message, 'success');
                await this.loadCart();
            } else {
                this.showNotification(data.message, 'error');
            }
        } catch (error) {
            console.error('❌ Lỗi xóa sản phẩm:', error);
            this.showNotification('Lỗi kết nối mạng', 'error');
        }
    }

    // Xóa toàn bộ giỏ hàng
    async clearCart() {
        if (!confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
            return;
        }

        try {
            const response = await fetch('../php/cart_api.php?action=clear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (data.success) {
                this.showNotification(data.message, 'success');
                await this.loadCart();
            } else {
                this.showNotification(data.message, 'error');
            }
        } catch (error) {
            console.error('❌ Lỗi xóa giỏ hàng:', error);
            this.showNotification('Lỗi kết nối mạng', 'error');
        }
    }

    // Hiển thị giỏ hàng
    displayCart() {
        const cartItemsContainer = document.getElementById('cartItems');
        const itemsCountElement = document.getElementById('itemsCount');
        const subtotalElement = document.getElementById('subtotal');
        const totalAmountElement = document.getElementById('totalAmount');
        const checkoutBtn = document.getElementById('checkoutBtn');

        if (!cartItemsContainer) return;

        // Cập nhật số lượng sản phẩm
        if (itemsCountElement) {
            itemsCountElement.textContent = `${this.totalItems} sản phẩm`;
        }

        // Cập nhật tổng tiền
        const formattedTotal = this.formatPrice(this.total);
        if (subtotalElement) subtotalElement.textContent = formattedTotal;
        if (totalAmountElement) totalAmountElement.textContent = formattedTotal;

        // Cập nhật trạng thái nút thanh toán
        if (checkoutBtn) {
            checkoutBtn.disabled = this.cartItems.length === 0;
        }

        // Hiển thị danh sách sản phẩm
        if (this.cartItems.length === 0) {
            this.displayEmptyCart();
            return;
        }

        let html = '';
        this.cartItems.forEach(item => {
            const isOutOfStock = item.quantity > item.stock;
            html += `
                <div class="cart-item" data-cart-id="${item.cart_id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.product_name}" onerror="this.src='../img/default-product.jpg'" />
                    </div>
                    <div class="cart-item-info">
                        <h3 class="cart-item-name">${item.product_name}</h3>
                        <div class="cart-item-category">${item.category}</div>
                        <div class="cart-item-price">${this.formatPrice(item.price)}</div>
                        ${isOutOfStock ? 
                            `<div class="stock-warning">Chỉ còn ${item.stock} sản phẩm</div>` : ''}
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" ${item.quantity <= 1 ? 'disabled' : ''}>
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" class="quantity-input" value="${item.quantity}" 
                                   min="1" max="${item.stock}" ${isOutOfStock ? 'disabled' : ''}>
                            <button class="quantity-btn plus" ${item.quantity >= item.stock ? 'disabled' : ''}>
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="cart-item-total">${this.formatPrice(item.item_total)}</div>
                        <button class="remove-btn" title="Xóa sản phẩm">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        // Thêm nút xóa toàn bộ
        html += `
            <div class="cart-actions">
                <button class="btn btn-clear-cart" id="clearCartBtn">
                    <i class="fas fa-trash-alt"></i>
                    Xóa toàn bộ giỏ hàng
                </button>
            </div>
        `;

        cartItemsContainer.innerHTML = html;
        this.initCartItemEvents();
    }

    // Hiển thị giỏ hàng trống
    displayEmptyCart() {
        const cartItemsContainer = document.getElementById('cartItems');
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Giỏ hàng trống</h3>
                <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
                <button class="btn btn-continue-shopping" onclick="window.location.href='index.html'">
                    <i class="fas fa-shopping-bag"></i>
                    Tiếp Tục Mua Sắm
                </button>
            </div>
        `;

        // Cập nhật UI
        const elements = {
            itemsCount: document.getElementById('itemsCount'),
            subtotal: document.getElementById('subtotal'),
            totalAmount: document.getElementById('totalAmount'),
            checkoutBtn: document.getElementById('checkoutBtn')
        };

        if (elements.itemsCount) elements.itemsCount.textContent = '0 sản phẩm';
        if (elements.subtotal) elements.subtotal.textContent = '0₫';
        if (elements.totalAmount) elements.totalAmount.textContent = '0₫';
        if (elements.checkoutBtn) elements.checkoutBtn.disabled = true;
    }

    // Khởi tạo sự kiện cho các item trong giỏ hàng
    initCartItemEvents() {
        // Sự kiện nút tăng/giảm số lượng
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cartItem = e.target.closest('.cart-item');
                const input = cartItem.querySelector('.quantity-input');
                let quantity = parseInt(input.value);

                if (e.target.closest('.plus')) {
                    quantity++;
                } else if (e.target.closest('.minus')) {
                    quantity--;
                }

                input.value = quantity;
                this.updateCartItem(cartItem.dataset.cartId, quantity);
            });
        });

        // Sự kiện input số lượng
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                if (e.target.disabled) return;
                
                const cartItem = e.target.closest('.cart-item');
                let quantity = parseInt(e.target.value);
                const maxStock = parseInt(e.target.max);

                if (isNaN(quantity) || quantity < 1) quantity = 1;
                if (quantity > maxStock) quantity = maxStock;

                e.target.value = quantity;
                this.updateCartItem(cartItem.dataset.cartId, quantity);
            });
        });

        // Sự kiện xóa sản phẩm
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cartItem = e.target.closest('.cart-item');
                this.removeFromCart(cartItem.dataset.cartId);
            });
        });

        // Sự kiện xóa toàn bộ giỏ hàng
        const clearCartBtn = document.getElementById('clearCartBtn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                this.clearCart();
            });
        }
    }

    // Khởi tạo event listeners
    initEventListeners() {
        // Sự kiện nút thanh toán
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                this.checkout();
            });
        }
    }

    // Thanh toán
    checkout() {
        if (this.cartItems.length === 0) {
            this.showNotification('Giỏ hàng trống', 'error');
            return;
        }

        // Kiểm tra số lượng tồn kho
        const outOfStockItems = this.cartItems.filter(item => item.quantity > item.stock);
        if (outOfStockItems.length > 0) {
            this.showNotification('Một số sản phẩm vượt quá số lượng tồn kho', 'error');
            return;
        }

        // Chuyển hướng đến trang thanh toán
        window.location.href = 'checkout.html';
    }

    // Định dạng giá tiền
    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    }

    // Hiển thị thông báo
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
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

// Khởi tạo CartPageManager khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛒 Cart page loaded, initializing cart page manager...');
    window.cartPageManager = new CartPageManager();
});