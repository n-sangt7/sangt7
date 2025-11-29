document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            // Show loading state
            const submitBtn = this.querySelector('.btn-login');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
            submitBtn.disabled = true;

            fetch(this.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success message
                    showMessage(data.message, 'success');
                    
                    // Lưu TOÀN BỘ thông tin user vào localStorage
                    if (data.user) {
                        localStorage.setItem('currentUser', JSON.stringify({
                            id: data.user.id,
                            username: data.user.username,
                            email: data.user.email,
                            phone: data.user.phone,
                            avatar: data.user.avatar
                        }));
                    }
                    
                    // Redirect after 1 second
                    setTimeout(() => {
                        window.location.href = data.redirect || 'index.html';
                    }, 1000);
                } else {
                    showMessage(data.message, 'error');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Có lỗi xảy ra khi đăng nhập!', 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // Function to show messages
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message-alert');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-alert message-${type}`;
        messageDiv.innerHTML = `
            <span>${message}</span>
            <button class="close-message">&times;</button>
        `;

        // Add styles
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 500px;
            animation: slideIn 0.3s ease;
        `;

        if (type === 'success') {
            messageDiv.style.backgroundColor = '#28a745';
        } else {
            messageDiv.style.backgroundColor = '#dc3545';
        }

        // Close button
        const closeBtn = messageDiv.querySelector('.close-message');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-left: 10px;
        `;

        closeBtn.addEventListener('click', () => {
            messageDiv.remove();
        });

        document.body.appendChild(messageDiv);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});