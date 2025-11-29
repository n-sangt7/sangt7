// Profile page functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing profile...');
    loadUserProfile();
    initProfileForms();
    initAvatarUpload();
    initPasswordValidation();
    initPasswordToggle();

});

// Load user profile data
// Sửa hàm loadUserProfile
function loadUserProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        // Fill profile form
        document.getElementById('username').value = currentUser.username || '';
        document.getElementById('email').value = currentUser.email || '';
        document.getElementById('phone').value = currentUser.phone || '';
        document.getElementById('address').value = currentUser.address || '';
        document.getElementById('sex').value = currentUser.sex || '';
        document.getElementById('birthday').value = currentUser.birthday || '';
        
        // CẢI THIỆN: Set avatar với cache prevention
        const profileAvatar = document.getElementById('profile-avatar');
        if (currentUser.avatar) {
            // Thêm timestamp nếu không phải avatar mặc định
            let avatarUrl = currentUser.avatar;
            if (!avatarUrl.includes('default-avatar')) {
                avatarUrl = avatarUrl + '?t=' + new Date().getTime();
            }
            profileAvatar.src = avatarUrl;
        } else {
            profileAvatar.src = '../img/default-avatar.png';
        }
        
        // Load additional user data from server if needed
        fetchUserStats(currentUser.id);
    } else {
        window.location.href = 'login.html';
    }
}

// Fetch user statistics
function fetchUserStats(userId) {
    // This would typically make an API call to get user stats
    // For now, we'll use placeholder data
    document.getElementById('order-count').textContent = '0';
    document.getElementById('wishlist-count').textContent = '0';
}

// Initialize profile forms
function initProfileForms() {
    const profileForm = document.getElementById('profileForm');
    const passwordForm = document.getElementById('passwordForm');
    
    if (profileForm) {
        // Xóa event listener cũ trước khi thêm mới
        profileForm.removeEventListener('submit', handleProfileSubmit);
        profileForm.addEventListener('submit', handleProfileSubmit);
    }
    
    if (passwordForm) {
        // Xóa event listener cũ trước khi thêm mới
        passwordForm.removeEventListener('submit', handlePasswordSubmit);
        passwordForm.addEventListener('submit', handlePasswordSubmit);
    }
}



// Tách hàm xử lý riêng để tránh double binding
function handleProfileSubmit(e) {
    e.preventDefault();
    e.stopPropagation(); // THÊM: Ngăn event bubbling
    updateProfile();
}

function handlePasswordSubmit(e) {
    e.preventDefault();
    e.stopPropagation(); // THÊM: Ngăn event bubbling
    
    // THÊM: Kiểm tra nếu đang xử lý thì không submit lại
    const changeBtn = document.querySelector('.btn-change-password');
    if (changeBtn.disabled) {
        console.log('Đang xử lý, không submit lại');
        return;
    }
    
    changePassword();
}






// THÊM HÀM KHỞI TẠO UPLOAD AVATAR
function initAvatarUpload() {
    console.log('=== INIT AVATAR UPLOAD ===');
    
    const changeAvatarBtn = document.querySelector('.btn-change-avatar');
    console.log('Change avatar button found:', !!changeAvatarBtn);

    // SỬA: Kiểm tra và chỉ tạo input file nếu chưa tồn tại
    let avatarInput = document.getElementById('avatar-input');
    if (!avatarInput) {
        console.log('Creating new file input');
        avatarInput = document.createElement('input');
        avatarInput.type = 'file';
        avatarInput.id = 'avatar-input';
        avatarInput.accept = 'image/*';
        avatarInput.style.display = 'none';
        document.querySelector('.avatar-actions').appendChild(avatarInput);
    }

    // SỬA: Xóa event listener cũ trước khi thêm mới để tránh lặp
    const newAvatarInput = avatarInput.cloneNode(true);
    avatarInput.parentNode.replaceChild(newAvatarInput, avatarInput);
    avatarInput = newAvatarInput;

    // Event listener cho input file
    avatarInput.addEventListener('change', function(e) {
        console.log('File input changed, files:', e.target.files);
        const file = e.target.files[0];
        if (file) {
            console.log('File selected, calling uploadAvatar');
            uploadAvatar(file);
        } else {
            console.log('No file selected');
        }
    });

    // Event listener cho nút
    if (changeAvatarBtn) {
        // SỬA: Xóa event listener cũ trước khi thêm mới
        const newButton = changeAvatarBtn.cloneNode(true);
        changeAvatarBtn.parentNode.replaceChild(newButton, changeAvatarBtn);
        
        newButton.addEventListener('click', function(e) {
            console.log('Change avatar button clicked');
            e.preventDefault();
            avatarInput.click();
        });
    } else {
        console.error('Change avatar button not found!');
    }

    console.log('=== AVATAR UPLOAD INIT COMPLETE ===');
}

// THÊM HÀM UPLOAD AVATAR
function uploadAvatar(file) {
    console.log('Uploading avatar:', file);

    if (!file) {
        showNotification('Không có file được chọn!', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    const uploadUrl = '../php/upload_avatar.php';

    console.log('Sending upload request to:', uploadUrl);

    // Hiển thị loading
    const profileAvatar = document.getElementById('profile-avatar');
    const changeBtn = document.querySelector('.btn-change-avatar');
    const originalText = changeBtn.innerHTML;
    
    profileAvatar.classList.add('avatar-loading');
    changeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tải...';
    changeBtn.disabled = true;

    // Bỏ qua test method, upload trực tiếp
    fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
    })
    .then(response => {
        console.log('Upload response status:', response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Upload response:', data);
        
        if (data.success) {
            // Cập nhật avatar với timestamp để tránh cache
            const timestamp = new Date().getTime();
            const newAvatarUrl = '../' + data.avatar_url + '?t=' + timestamp;
            profileAvatar.src = newAvatarUrl;
            
            // Cập nhật localStorage
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                currentUser.avatar = newAvatarUrl;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                // Cập nhật UI trên tất cả các trang
                if (window.authManager && window.authManager.updateUI) {
                    window.authManager.updateUI();
                }
                
                // Refresh session để cập nhật avatar mới nhất
                if (window.authManager && window.authManager.checkServerSession) {
                    window.authManager.checkServerSession();
                }
            }
            
            showNotification('Cập nhật avatar thành công!', 'success');
        } else {
            showNotification('Lỗi: ' + (data.message || 'Không xác định'), 'error');
        }
    })
    .catch(error => {
        console.error('Upload error:', error);
        showNotification('Lỗi: ' + error.message, 'error');
    })
    .finally(() => {
        // Reset button
        profileAvatar.classList.remove('avatar-loading');
        changeBtn.innerHTML = originalText;
        changeBtn.disabled = false;
        
        // SỬA QUAN TRỌNG: Reset input file bằng cách thay thế nó
        const avatarInput = document.getElementById('avatar-input');
        if (avatarInput) {
            const newInput = avatarInput.cloneNode(true);
            avatarInput.parentNode.replaceChild(newInput, avatarInput);
            
            // Gắn lại event listener cho input mới
            newInput.addEventListener('change', function(e) {
                const newFile = e.target.files[0];
                if (newFile) {
                    uploadAvatar(newFile);
                }
            });
        }
    });
}

// Update profile
function updateProfile() {
    const formData = new FormData(document.getElementById('profileForm'));
    
    // Show loading state
    const saveBtn = document.querySelector('.btn-save');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang lưu...';
    saveBtn.disabled = true;
    
    // Tạo object dữ liệu
    const profileData = {
        username: formData.get('username'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        sex: formData.get('sex'),
        birthday: formData.get('birthday')
    };
    
    // Gửi dữ liệu lên server
    fetch('../php/update_profile.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update localStorage
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                currentUser.username = profileData.username;
                currentUser.phone = profileData.phone;
                currentUser.address = profileData.address;
                currentUser.sex = profileData.sex;
                currentUser.birthday = profileData.birthday;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                // Update header
                if (typeof authManager !== 'undefined' && authManager.updateUI) {
                    authManager.updateUI();
                }
                
                showNotification('Cập nhật thông tin thành công!', 'success');
            }
        } else {
            showNotification('Có lỗi xảy ra: ' + data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Lỗi kết nối!', 'error');
    })
    .finally(() => {
        // Reset button
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
    });
}

// Change password
// Change password - ĐÃ SỬA
function changePassword() {
    const formData = new FormData(document.getElementById('passwordForm'));
    const currentPassword = formData.get('current_password');
    const newPassword = formData.get('new_password');
    const confirmPassword = formData.get('confirm_password');
    
    console.log('Current password:', currentPassword);
    console.log('New password:', newPassword);
    console.log('Confirm password:', confirmPassword);
    
    // Validate
    if (!currentPassword || !newPassword || !confirmPassword) {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('Mật khẩu xác nhận không khớp!', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showNotification('Mật khẩu mới phải có ít nhất 6 ký tự!', 'error');
        return;
    }
    
    // Show loading state - ĐÃ SỬA: Vô hiệu hóa form
    const changeBtn = document.querySelector('.btn-change-password');
    const passwordForm = document.getElementById('passwordForm');
    const originalText = changeBtn.innerHTML;
    
    changeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang đổi...';
    changeBtn.disabled = true;
    passwordForm.style.opacity = '0.7'; // Làm mờ form để biết đang xử lý
    
    // Prepare data
    const passwordData = {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
    };
    
    console.log('Sending password data:', passwordData);
    
    // Send to server - ĐÃ SỬA: Thêm AbortController để tránh request trùng
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout 10s
    
    fetch('../php/change_password.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData),
        signal: controller.signal
    })
    .then(response => {
        clearTimeout(timeoutId);
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Server response:', data);
        
        if (data.success) {
            showNotification(data.message || 'Đổi mật khẩu thành công!', 'success');
            document.getElementById('passwordForm').reset();
            
            // Reset real-time validation feedback
            const confirmFeedback = document.getElementById('confirm-feedback');
            if (confirmFeedback) {
                confirmFeedback.textContent = '';
                confirmFeedback.className = 'form-feedback';
            }
        } else {
            showNotification(data.message || 'Có lỗi xảy ra!', 'error');
        }
    })
    .catch(error => {
        clearTimeout(timeoutId);
        console.error('Error:', error);
        if (error.name === 'AbortError') {
            showNotification('Request timeout! Vui lòng thử lại.', 'error');
        } else {
            showNotification('Lỗi kết nối đến server!', 'error');
        }
    })
    .finally(() => {
        // Reset button và form - ĐÃ SỬA
        changeBtn.innerHTML = originalText;
        changeBtn.disabled = false;
        passwordForm.style.opacity = '1';
    });
}




// Add real-time password validation
function initPasswordValidation() {
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const confirmFeedback = document.getElementById('confirm-feedback');

    if (newPasswordInput && confirmPasswordInput) {
        // Real-time password confirmation check
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value && newPasswordInput.value !== this.value) {
                confirmFeedback.textContent = 'Mật khẩu xác nhận không khớp!';
                confirmFeedback.className = 'form-feedback error';
            } else {
                confirmFeedback.textContent = '';
                confirmFeedback.className = 'form-feedback';
            }
        });

        newPasswordInput.addEventListener('input', function() {
            if (confirmPasswordInput.value && this.value !== confirmPasswordInput.value) {
                confirmFeedback.textContent = 'Mật khẩu xác nhận không khớp!';
                confirmFeedback.className = 'form-feedback error';
            } else {
                confirmFeedback.textContent = '';
                confirmFeedback.className = 'form-feedback';
            }
        });
    }
}

// Add password toggle functionality
function initPasswordToggle() {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'password-toggle';
        toggle.innerHTML = '<i class="far fa-eye"></i>';
        
        toggle.addEventListener('click', function() {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="far fa-eye"></i>' : '<i class="far fa-eye-slash"></i>';
        });
        
        input.parentNode.appendChild(toggle);
    });
}






// CẬP NHẬT HÀM NOTIFICATION ĐỂ HỖ TRỢ ERROR TYPE
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #8b4513, #a0522d)' : '#e74c3c'};
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





// Sau khi upload avatar thành công
if (window.authManager) {
    window.authManager.reloadUserSession().then(() => {
        console.log('Avatar đã được đồng bộ trên tất cả trang');
    });
}





// Thêm hàm test này
function testAvatarFromDB() {
    console.log('=== TEST AVATAR FROM DATABASE ===');
    
    // Test 1: Kiểm tra localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('LocalStorage avatar:', currentUser?.avatar);
    
    // Test 2: Gọi API trực tiếp
    fetch('../php/check_session.php', {
        credentials: 'same-origin',
        headers: {'Cache-Control': 'no-cache'}
    })
    .then(response => response.json())
    .then(data => {
        console.log('Session API avatar:', data.avatar);
        console.log('User logged in:', data.logged_in);
    })
    .catch(error => {
        console.error('Test error:', error);
    });
}

// Gọi hàm test khi load profile
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing profile...');
    loadUserProfile();
    initProfileForms();
    initAvatarUpload();
    testAvatarFromDB(); 
});