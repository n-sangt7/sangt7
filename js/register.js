document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const toggleRegPassword = document.getElementById('toggleRegPassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const regPasswordInput = document.getElementById('reg-password');
    const confirmPasswordInput = document.getElementById('reg-confirm-password');
    const passwordStrength = document.getElementById('password-strength');
    const strengthText = document.getElementById('strength-text');

    // Toggle password visibility
    if (toggleRegPassword) {
        toggleRegPassword.addEventListener('click', function() {
            const type = regPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            regPasswordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', function() {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Password strength checker
    if (regPasswordInput) {
        regPasswordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            let text = '';

            // Check password length
            if (password.length >= 8) strength += 25;
            
            // Check for lowercase letters
            if (/[a-z]/.test(password)) strength += 25;
            
            // Check for uppercase letters
            if (/[A-Z]/.test(password)) strength += 25;
            
            // Check for numbers and special characters
            if (/[0-9]/.test(password)) strength += 25;

            // Update strength bar and text
            if (passwordStrength) {
                passwordStrength.style.width = strength + '%';
                
                if (strength < 50) {
                    passwordStrength.style.backgroundColor = '#dc3545';
                    text = 'Yếu';
                } else if (strength < 75) {
                    passwordStrength.style.backgroundColor = '#ffc107';
                    text = 'Trung bình';
                } else {
                    passwordStrength.style.backgroundColor = '#28a745';
                    text = 'Mạnh';
                }

                if (strengthText) {
                    strengthText.textContent = text;
                }
            }
        });
    }

    // Handle register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate passwords match
            const password = regPasswordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            if (password !== confirmPassword) {
                showMessage('Mật khẩu xác nhận không khớp!', 'error');
                return;
            }

            const formData = new FormData(this);
            
            // Show loading state
            const submitBtn = this.querySelector('.btn-register');
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
                    
                    // Redirect after 1 second
                    setTimeout(() => {
                        window.location.href = data.redirect;
                    }, 1000);
                } else {
                    showMessage(data.message, 'error');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Có lỗi xảy ra khi đăng ký!', 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // Function to show messages (same as login.js)
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