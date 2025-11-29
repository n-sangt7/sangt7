// ========== CHECKOUT MANAGER ==========
class CheckoutManager {
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

    // Tải giỏ hàng
    async loadCart() {
        try {
            const response = await fetch('../php/get_cart.php');
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            console.log('📦 Checkout cart data:', data);

            if (data.success) {
                this.cartItems = data.cart_items || [];
                this.total = data.total_price || 0;
                this.totalItems = data.total_items || 0;
                this.displayOrderSummary();
            } else {
                this.showNotification(data.message, 'error');
                if (data.message.includes('đăng nhập')) {
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                }
            }
        } catch (error) {
            console.error('❌ Lỗi tải giỏ hàng:', error);
            this.showNotification('Lỗi kết nối mạng', 'error');
        }
    }

    // Hiển thị tổng quan đơn hàng
    displayOrderSummary() {
        const orderItemsContainer = document.getElementById('orderItems');
        const subtotalElement = document.getElementById('subtotal');
        const totalAmountElement = document.getElementById('totalAmount');

        if (!orderItemsContainer) return;

        // Cập nhật tổng tiền
        const formattedTotal = this.formatPrice(this.total);
        if (subtotalElement) subtotalElement.textContent = formattedTotal;
        if (totalAmountElement) totalAmountElement.textContent = formattedTotal;

        // Hiển thị sản phẩm
        if (this.cartItems.length === 0) {
            orderItemsContainer.innerHTML = '<p class="empty-cart">Giỏ hàng trống</p>';
            return;
        }

        let html = '';
        this.cartItems.forEach(item => {
            html += `
                <div class="order-item">
                    <div class="order-item-image">
                        <img src="${item.image}" alt="${item.product_name}" onerror="this.src='../img/default-product.jpg'" />
                    </div>
                    <div class="order-item-info">
                        <div class="order-item-name">${item.product_name}</div>
                        <div class="order-item-details">
                            <span class="order-item-price">${this.formatPrice(item.price)}</span>
                            <span class="order-item-quantity">x${item.quantity}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        orderItemsContainer.innerHTML = html;
    }

    // Xử lý đặt hàng
    async placeOrder(formData) {
        try {
            console.log('🚀 Đang xử lý đặt hàng...', formData);
            
            const response = await fetch('../php/place_order.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    shipping_info: formData,
                    cart_items: this.cartItems,
                    total_amount: this.total
                })
            });

            const data = await response.json();
            console.log('📦 Phản hồi đặt hàng:', data);

            if (data.success) {
                this.showNotification(data.message, 'success');
                
                // Xóa giỏ hàng sau khi đặt hàng thành công
                await this.clearCart();
                
                // Chuyển hướng đến trang xác nhận
                setTimeout(() => {
                    window.location.href = `order_confirmation.html?order_id=${data.order_id}`;
                }, 1500);
            } else {
                this.showNotification(data.message, 'error');
            }
        } catch (error) {
            console.error('❌ Lỗi đặt hàng:', error);
            this.showNotification('Lỗi kết nối mạng', 'error');
        }
    }

    // Xóa giỏ hàng sau khi đặt hàng
    async clearCart() {
        try {
            const response = await fetch('../php/cart_api.php?action=clear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            // Không cần xử lý kết quả, chỉ cần gọi API
            console.log('🛒 Đã xóa giỏ hàng sau khi đặt hàng');
        } catch (error) {
            console.error('❌ Lỗi xóa giỏ hàng:', error);
        }
    }

    // Khởi tạo event listeners
    initEventListeners() {
        const checkoutForm = document.getElementById('checkoutForm');
        const placeOrderBtn = document.getElementById('placeOrderBtn');

        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleOrderSubmission();
            });
        }

        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', () => {
                this.handleOrderSubmission();
            });
        }
    }

    // Xử lý gửi đơn hàng
    handleOrderSubmission() {
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

        // Lấy dữ liệu form
        const formData = this.getFormData();
        
        // Validate form
        if (!this.validateForm(formData)) {
            return;
        }

        // Hiển thị loading
        const placeOrderBtn = document.getElementById('placeOrderBtn');
        if (placeOrderBtn) {
            placeOrderBtn.disabled = true;
            placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
        }

        // Gửi đơn hàng
        this.placeOrder(formData);
    }

    // Lấy dữ liệu từ form
    getFormData() {
        const form = document.getElementById('checkoutForm');
        return {
            fullName: form.fullName.value,
            phone: form.phone.value,
            address: form.address.value,
            email: form.email.value,
            note: form.note.value,
            paymentMethod: form.paymentMethod.value
        };
    }

    // Validate form
    validateForm(formData) {
        if (!formData.fullName.trim()) {
            this.showNotification('Vui lòng nhập họ và tên', 'error');
            return false;
        }

        if (!formData.phone.trim()) {
            this.showNotification('Vui lòng nhập số điện thoại', 'error');
            return false;
        }

        if (!formData.address.trim()) {
            this.showNotification('Vui lòng nhập địa chỉ', 'error');
            return false;
        }

        // Validate số điện thoại
        const phoneRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(formData.phone)) {
            this.showNotification('Số điện thoại không hợp lệ', 'error');
            return false;
        }

        return true;
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

// Khởi tạo CheckoutManager khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    console.log('🛒 Checkout page loaded, initializing checkout manager...');
    window.checkoutManager = new CheckoutManager();
});