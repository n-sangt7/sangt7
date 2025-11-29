// confirmation.js
class OrderConfirmation {
    constructor() {
        this.orderId = this.getOrderIdFromURL();
        this.init();
    }

    init() {
        if (this.orderId) {
            this.loadOrderDetails(this.orderId);
        } else {
            this.showError('Không tìm thấy thông tin đơn hàng');
        }
    }

    getOrderIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('order_id');
    }

    async loadOrderDetails(orderId) {
        try {
            const response = await fetch(`../php/get_order_details.php?order_id=${orderId}`);
            const data = await response.json();

            if (data.success) {
                this.displayOrderDetails(data.order);
            } else {
                this.showError(data.message);
            }
        } catch (error) {
            console.error('Lỗi tải thông tin đơn hàng:', error);
            this.showError('Lỗi khi tải thông tin đơn hàng');
        }
    }

    displayOrderDetails(order) {
        const orderDetailsContainer = document.getElementById('orderDetails');
        
        if (!orderDetailsContainer) return;

        const html = `
            <div class="order-info">
                <div class="info-row">
                    <span class="label">Mã đơn hàng:</span>
                    <span class="value">DH${String(order.MaDH).padStart(6, '0')}</span>
                </div>
                <div class="info-row">
                    <span class="label">Ngày đặt:</span>
                    <span class="value">${new Date(order.NgayDat).toLocaleDateString('vi-VN')}</span>
                </div>
                <div class="info-row">
                    <span class="label">Tổng tiền:</span>
                    <span class="value">${this.formatPrice(order.TongTien)}</span>
                </div>
                <div class="info-row">
                    <span class="label">Trạng thái:</span>
                    <span class="value status-${order.TrangThai.toLowerCase()}">${order.TrangThai}</span>
                </div>
            </div>
        `;

        orderDetailsContainer.innerHTML = html;
    }

    formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    }

    showError(message) {
        const orderDetailsContainer = document.getElementById('orderDetails');
        if (orderDetailsContainer) {
            orderDetailsContainer.innerHTML = `<p class="error-message">${message}</p>`;
        }
    }
}

// Khởi tạo khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    new OrderConfirmation();
});