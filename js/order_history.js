// ========== ORDER HISTORY MANAGER ==========
class OrderHistoryManager {
    constructor() {
        this.orders = [];
        this.init();
    }

    init() {
        this.loadOrderHistory();
    }

    // Tải lịch sử đơn hàng
    async loadOrderHistory() {
        try {
            const response = await fetch('../php/order_history.php');
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            console.log('📦 Order history data:', data);

            if (data.success) {
                this.orders = data.orders || [];
                this.displayOrders();
            } else {
                this.showNotification(data.message, 'error');
                if (data.message.includes('đăng nhập')) {
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 2000);
                }
            }
        } catch (error) {
            console.error('❌ Lỗi tải lịch sử đơn hàng:', error);
            this.showNotification('Lỗi kết nối mạng', 'error');
        }
    }

    // Hiển thị danh sách đơn hàng
    displayOrders() {
        const ordersContainer = document.getElementById('ordersContainer');
        const emptyState = document.getElementById('emptyState');

        if (!ordersContainer) return;

        if (this.orders.length === 0) {
            ordersContainer.style.display = 'none';
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';
        ordersContainer.style.display = 'block';

        let html = '';
        this.orders.forEach(order => {
            html += this.createOrderCard(order);
        });

        ordersContainer.innerHTML = html;
    }

    // Tạo card đơn hàng
    createOrderCard(order) {
        const orderDate = new Date(order.NgayDat).toLocaleDateString('vi-VN');
        const totalAmount = this.formatPrice(order.TongTien);
        const statusClass = this.getStatusClass(order.TrangThai);

        return `
            <div class="order-card">
                <div class="order-header">
                    <div class="order-info">
                        <div class="order-id">Mã đơn: #${order.MaDH}</div>
                        <div class="order-date">Ngày đặt: ${orderDate}</div>
                        <div class="order-total">${totalAmount}</div>
                    </div>
                    <div class="order-status ${statusClass}">
                        ${this.getStatusText(order.TrangThai)}
                    </div>
                </div>
                
                <div class="order-details">
                    <div class="order-items">
                        ${order.chi_tiet.map(item => this.createOrderItem(item)).join('')}
                    </div>
                    
                    <div class="order-shipping">
                        <div class="shipping-title">Thông tin giao hàng</div>
                        <div class="shipping-info">
                            <strong>${order.NguoiNhan}</strong> - ${order.SoDienThoai}<br>
                            ${order.DiaChiNhan}
                        </div>
                        <div class="shipping-info" style="margin-top: 8px;">
                            <strong>Phương thức thanh toán:</strong> ${order.PhuongThuc}<br>
                            <strong>Trạng thái thanh toán:</strong> ${order.TrangThaiThanhToan}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Tạo item trong đơn hàng
    createOrderItem(item) {
        const itemTotal = this.formatPrice(item.ThanhTien);
        const unitPrice = this.formatPrice(item.DonGia);

        return `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${item.AnhSP}" alt="${item.TenSP}" onerror="this.src='../img/default-product.jpg'" />
                </div>
                <div class="order-item-info">
                    <div class="order-item-name">${item.TenSP}</div>
                    <div class="order-item-price">${unitPrice} x ${item.SoLuong}</div>
                    <div class="order-item-total">Thành tiền: ${itemTotal}</div>
                </div>
            </div>
        `;
    }

    // Lấy class CSS cho trạng thái
    getStatusClass(status) {
        const statusMap = {
            'Chờ xử lý': 'status-pending',
            'Đang xử lý': 'status-processing',
            'Đang giao hàng': 'status-shipped',
            'Đã giao': 'status-delivered',
            'Đã hủy': 'status-cancelled'
        };
        return statusMap[status] || 'status-pending';
    }

    // Lấy text hiển thị cho trạng thái
    getStatusText(status) {
        const statusMap = {
            'Chờ xử lý': 'Chờ xử lý',
            'Đang xử lý': 'Đang xử lý',
            'Đang giao hàng': 'Đang giao hàng',
            'Đã giao': 'Đã giao hàng',
            'Đã hủy': 'Đã hủy'
        };
        return statusMap[status] || status;
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

// Khởi tạo OrderHistoryManager khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    console.log('📦 Order history page loaded, initializing order history manager...');
    window.orderHistoryManager = new OrderHistoryManager();
});