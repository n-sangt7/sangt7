document.addEventListener("DOMContentLoaded", () => {
  console.log("User Profile Page Loaded");

//   // Kiểm tra trạng thái đăng nhập
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   if (!currentUser) {
//     showNotification("Vui lòng đăng nhập trước!", "error");
//     setTimeout(() => (window.location.href = "../html/login.html"), 1000);
//     return;
//   }

  // Khởi tạo giao diện người dùng
  initAuth();
  initProfilePage(currentUser);
  initTabs();
  initFormHandlers(currentUser);
  loadOrderHistory(currentUser);
});

/* ==============================
   1. HIỂN THỊ THÔNG TIN NGƯỜI DÙNG
============================== */
function initProfilePage(user) {
  console.log("Initializing profile page with user:", user);

  // Điền thông tin vào form
  document.getElementById("fullname").value = user.fullname || "";
  document.getElementById("profile-username").value = user.username || "";
  document.getElementById("profile-email").value = user.email || "";
  document.getElementById("phone").value = user.phone || "";
  document.getElementById("gender").value = user.gender || "";
  document.getElementById("dob").value = user.dob || "";
  document.getElementById("address").value = user.address || "";

  // Avatar
  const profileAvatar = document.getElementById("profile-avatar");
  if (user.avatar) {
    profileAvatar.src = user.avatar;
  } else {
    const firstLetter = user.username
      ? user.username.charAt(0).toUpperCase()
      : "U";
    profileAvatar.src =
      "https://via.placeholder.com/150/3498db/ffffff?text=" + firstLetter;
  }

  // Cập nhật avatar header
  const headerAvatar = document.getElementById("user-avatar");
  if (headerAvatar) headerAvatar.src = profileAvatar.src;
}

/* ==============================
   2. TAB MENU + ĐĂNG XUẤT
============================== */
function initTabs() {
  const menuItems = document.querySelectorAll(".menu-item");
  const tabContents = document.querySelectorAll(".tab-content");

  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      // reset
      menuItems.forEach((i) => i.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // activate
      this.classList.add("active");
      const tabId = this.getAttribute("data-tab");
      if (tabId) document.getElementById(tabId).classList.add("active");
    });
  });

  // Nút đăng xuất trong menu sidebar
  const logoutItem = document.getElementById("logout-menu-item");
  if (logoutItem) {
    logoutItem.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        localStorage.removeItem("currentUser");
        showNotification("Đã đăng xuất thành công!");
        setTimeout(() => (window.location.href = "../index.html"), 1000);
      }
    });
  }
}

/* ==============================
   3. CHỈNH SỬA THÔNG TIN + AVATAR + MẬT KHẨU
============================== */
function initFormHandlers(user) {
  console.log("Initializing form handlers for user:", user);

  const editBtn = document.getElementById("edit-personal-info");
  const cancelBtn = document.getElementById("cancel-edit");
  const saveBtn = document.getElementById("save-personal-info");
  const formActions = document.getElementById("personal-info-actions");
  const editableFields = ["fullname", "phone", "gender", "dob", "address"];

  // Nút chỉnh sửa
  editBtn.addEventListener("click", () => {
    editableFields.forEach((field) => {
      const el = document.getElementById(field);
      if (!el) return;
      if (el.tagName === "SELECT") el.disabled = false;
      else el.readOnly = false;
      el.style.background = "white";
      el.style.borderColor = "#ccc";
    });
    formActions.style.display = "flex";
    editBtn.style.display = "none";
  });

  // Nút hủy
  cancelBtn.addEventListener("click", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    initProfilePage(currentUser);
    editableFields.forEach((field) => {
      const el = document.getElementById(field);
      if (!el) return;
      if (el.tagName === "SELECT") el.disabled = true;
      else el.readOnly = true;
      el.style.background = "#f5f5f5";
      el.style.borderColor = "#eee";
    });
    formActions.style.display = "none";
    editBtn.style.display = "block";
  });

  // Nút lưu
  saveBtn.addEventListener("click", () => {
    const updatedUser = {
      ...user,
      fullname: document.getElementById("fullname").value,
      phone: document.getElementById("phone").value,
      gender: document.getElementById("gender").value,
      dob: document.getElementById("dob").value,
      address: document.getElementById("address").value,
    };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // cập nhật demoUsers nếu có
    const demoUsers = JSON.parse(localStorage.getItem("demoUsers") || "[]");
    const idx = demoUsers.findIndex((u) => u.username === user.username);
    if (idx !== -1) {
      demoUsers[idx] = { ...demoUsers[idx], ...updatedUser };
      localStorage.setItem("demoUsers", JSON.stringify(demoUsers));
    }

    showNotification("Cập nhật thông tin thành công!");
    cancelBtn.click();
    updateUserInfo(updatedUser);
  });

  // Upload avatar
  const avatarUpload = document.getElementById("avatar-upload");
  const avatarInput = document.getElementById("avatar-input");
  avatarUpload.addEventListener("click", () => avatarInput.click());
  avatarInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.match("image.*"))
      return showNotification("Vui lòng chọn file ảnh!", "error");
    if (file.size > 2 * 1024 * 1024)
      return showNotification("Ảnh vượt quá 2MB!", "error");

    const reader = new FileReader();
    reader.onload = function (ev) {
      const avatarUrl = ev.target.result;
      document.getElementById("profile-avatar").src = avatarUrl;
      document.getElementById("user-avatar").src = avatarUrl;

      const updatedUser = { ...user, avatar: avatarUrl };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      // cập nhật demoUsers
      const demoUsers = JSON.parse(localStorage.getItem("demoUsers") || "[]");
      const idx = demoUsers.findIndex((u) => u.username === user.username);
      if (idx !== -1) {
        demoUsers[idx].avatar = avatarUrl;
        localStorage.setItem("demoUsers", JSON.stringify(demoUsers));
      }

      showNotification("Cập nhật ảnh đại diện thành công!");
    };
    reader.readAsDataURL(file);
  });

  // Đổi mật khẩu
  const changePasswordBtn = document.getElementById("change-password-btn");
  changePasswordBtn.addEventListener("click", () => {
    const curPwd = document.getElementById("current-password").value;
    const newPwd = document.getElementById("new-password").value;
    const confirmPwd = document.getElementById("confirm-new-password").value;

    if (!curPwd || !newPwd || !confirmPwd)
      return showNotification("Vui lòng nhập đầy đủ thông tin!", "error");

    if (user.loginMethod === "google")
      return showNotification(
        "Tài khoản Google không cần đổi mật khẩu.",
        "error"
      );

    if (curPwd !== user.password)
      return showNotification("Mật khẩu hiện tại không đúng!", "error");

    if (newPwd !== confirmPwd)
      return showNotification("Mật khẩu mới không khớp!", "error");

    if (newPwd.length < 6)
      return showNotification("Mật khẩu mới ít nhất 6 ký tự!", "error");

    const updatedUser = { ...user, password: newPwd };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // cập nhật trong demoUsers
    const demoUsers = JSON.parse(localStorage.getItem("demoUsers") || "[]");
    const idx = demoUsers.findIndex((u) => u.username === user.username);
    if (idx !== -1) {
      demoUsers[idx].password = newPwd;
      localStorage.setItem("demoUsers", JSON.stringify(demoUsers));
    }

    showNotification("Đổi mật khẩu thành công!");
    document.getElementById("current-password").value = "";
    document.getElementById("new-password").value = "";
    document.getElementById("confirm-new-password").value = "";
  });
}

/* ==============================
   4. LỊCH SỬ ĐƠN HÀNG DỰA TRÊN DATABASE
============================== */
function loadOrderHistory(user) {
  const ordersList = document.getElementById("orders-list");
  
  // Lấy dữ liệu từ localStorage (giả lập database)
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || [];
  let products = JSON.parse(localStorage.getItem("products")) || [];

  // Lọc đơn hàng của user hiện tại
  const userOrders = orders.filter(order => order.UserID === user.UserID);
  
  if (userOrders.length === 0) {
    ordersList.innerHTML = `
      <div class="order-history-card">
        <div class="empty-state">
          <i class="fas fa-shopping-bag"></i>
          <h3>Chưa có đơn hàng nào</h3>
          <p>Bạn chưa có đơn hàng nào. Hãy mua sắm ngay!</p>
          <a href="../index.html" class="btn btn-accent">Mua sắm ngay</a>
        </div>
      </div>`;
    return;
  }

  // Sắp xếp đơn hàng mới nhất lên đầu
  userOrders.sort((a, b) => new Date(b.NgayDat) - new Date(a.NgayDat));

  ordersList.innerHTML = userOrders.map(order => {
    // Lấy chi tiết đơn hàng
    const details = orderDetails.filter(detail => detail.MaDH === order.MaDH);
    
    // Tính tổng tiền và lấy thông tin sản phẩm
    let total = 0;
    const items = details.map(detail => {
      const product = products.find(p => p.MaSP === detail.MaSP);
      const itemTotal = detail.SoLuong * detail.DonGia;
      total += itemTotal;
      
      return {
        name: product ? product.TenSP : "Sản phẩm không xác định",
        price: detail.DonGia,
        quantity: detail.SoLuong,
        image: product ? product.AnhSP : "https://via.placeholder.com/60",
        total: itemTotal
      };
    });

    return `
      <div class="order-card">
        <div class="order-header">
          <div class="order-info">
            <h4>Mã đơn hàng: DH${order.MaDH.toString().padStart(4, '0')}</h4>
            <p class="order-date">Ngày đặt: ${new Date(order.NgayDat).toLocaleDateString("vi-VN")}</p>
          </div>
          <div class="order-status ${getStatusClass(order.TrangThai)}">
            ${getStatusText(order.TrangThai)}
          </div>
        </div>
        <div class="order-items">
          ${items.map(item => `
            <div class="order-item">
              <img src="${item.image}" alt="${item.name}" class="item-image">
              <div class="item-info">
                <h5>${item.name}</h5>
                <p>Số lượng: ${item.quantity}</p>
              </div>
              <div class="item-price">${formatPrice(item.total)}</div>
            </div>
          `).join("")}
        </div>
        <div class="order-footer">
          <div class="order-total">
            Tổng cộng: <strong>${formatPrice(total)}</strong>
          </div>
          <button class="btn btn-secondary" onclick="viewOrderDetails(${order.MaDH})">Xem chi tiết</button>
        </div>
      </div>
    `;
  }).join("");
}

function getStatusText(status) {
  const statusMap = {
    "Chờ xử lý": "Đang xử lý",
    "Đang xử lý": "Đang xử lý",
    "Đã xác nhận": "Đã xác nhận",
    "Đang giao hàng": "Đang giao hàng",
    "Đã giao hàng": "Đã giao hàng",
    "Đã hủy": "Đã hủy"
  };
  return statusMap[status] || status;
}

function getStatusClass(status) {
  const classMap = {
    "Chờ xử lý": "pending",
    "Đang xử lý": "pending",
    "Đã xác nhận": "confirmed",
    "Đang giao hàng": "shipping",
    "Đã giao hàng": "delivered",
    "Đã hủy": "cancelled"
  };
  return classMap[status] || "pending";
}

function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", { 
    style: "currency", 
    currency: "VND" 
  }).format(price);
}

function viewOrderDetails(orderId) {
  alert(`Chi tiết đơn hàng DH${orderId.toString().padStart(4, '0')} đang được phát triển.`);
}

/* ==============================
   5. THÔNG BÁO + HEADER AUTH
============================== */
function showNotification(msg, type = "success") {
  const old = document.querySelector(".profile-notification");
  if (old) old.remove();

  const el = document.createElement("div");
  el.className = `profile-notification ${type}`;
  el.textContent = msg;
  document.body.appendChild(el);

  setTimeout(() => (el.style.transform = "translateX(0)"), 10);
  setTimeout(() => {
    el.style.transform = "translateX(100%)";
    setTimeout(() => el.remove(), 300);
  }, 2500);
}

function updateUserInfo(user) {
  const nameEl = document.getElementById("user-name");
  const avatarEl = document.getElementById("user-avatar");
  if (nameEl) nameEl.textContent = user.fullname || user.username || "User";
  if (avatarEl) avatarEl.src = user.avatar;
}

function initAuth() {
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const userDropdown = document.getElementById("user-dropdown");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    if (loginLink) loginLink.style.display = "none";
    if (registerLink) registerLink.style.display = "none";
    if (userDropdown) userDropdown.style.display = "block";
    updateUserInfo(currentUser);
  }

  const userMenuBtn = document.querySelector(".user-menu-btn");
  const userDropdownMenu = document.querySelector(".user-dropdown-menu");
  if (userMenuBtn && userDropdownMenu) {
    userMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      userDropdownMenu.classList.toggle("show");
    });
    document.addEventListener("click", () => userDropdownMenu.classList.remove("show"));
  }

  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        localStorage.removeItem("currentUser");
        showNotification("Đã đăng xuất thành công!");
        setTimeout(() => (window.location.href = "../index.html"), 1000);
      }
    });
  }
}