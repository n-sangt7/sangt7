// auth.js - Quản lý trạng thái đăng nhập
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
        const logoutLink = document.getElementById('logout-link');
        const userProfile = document.getElementById('user-profile');
        const userAvatar = document.getElementById('user-avatar');
        const userDisplayName = document.getElementById('user-display-name');

        if (this.isLoggedIn()) {
            // Hiển thị thông tin user
            if (loginLink) loginLink.style.display = 'none';
            if (logoutLink) logoutLink.style.display = 'block';
            if (userProfile) userProfile.style.display = 'flex';
            
            if (userDisplayName) {
                userDisplayName.textContent = this.currentUser.username || 'Tài khoản';
            }
            
            if (userAvatar && this.currentUser.avatar) {
                userAvatar.src = this.currentUser.avatar;
                userAvatar.style.display = 'block';
                userAvatar.alt = `Avatar của ${this.currentUser.username}`;
            }
        } else {
            // Hiển thị nút đăng nhập
            if (loginLink) loginLink.style.display = 'block';
            if (logoutLink) logoutLink.style.display = 'none';
            if (userProfile) userProfile.style.display = 'none';
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
        // Tạo và hiển thị thông báo (giữ nguyên code hiện tại)
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

    // Lấy thông tin user hiện tại
    getCurrentUser() {
        return this.currentUser;
    }

    // Kiểm tra session trên server
    async checkServerSession() {
        try {
            const response = await fetch('../php/check_session.php', {
                credentials: 'same-origin',
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            if (data.logged_in && data.username) {
                // Cập nhật thông tin user từ server
                const userData = {
                    id: data.user_id || 0,
                    username: data.username,
                    email: data.email,
                    phone: data.phone || '',
                    avatar: data.avatar || '../img/default-avatar.jpg'
                };
                
                this.saveUserToStorage(userData);
                this.updateUI();
                return true;
            } else {
                // Session không hợp lệ, clear local data
                this.clearUser();
                this.updateUI();
                return false;
            }
        } catch (error) {
            console.error('Session check error:', error);
            // Nếu không kết nối được server, vẫn giữ trạng thái local
            return this.isLoggedIn();
        }
    }
}

// Khởi tạo AuthManager toàn cục
const authManager = new AuthManager();

// Export cho sử dụng trong modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuthManager, authManager };
}