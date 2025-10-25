// Khởi tạo giỏ hàng
let cart = [];
const cartCount = document.querySelector(".cart-count");
const loginLink = document.getElementById("login-link");
const registerLink = document.getElementById("register-link");
const logoutLink = document.getElementById("logout-link");

// Kiểm tra trạng thái đăng nhập
function checkAuthStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    loginLink.style.display = "none";
    registerLink.style.display = "none";
    logoutLink.style.display = "block";
  } else {
    loginLink.style.display = "block";
    registerLink.style.display = "block";
    logoutLink.style.display = "none";
  }
}

// Lấy giỏ hàng từ localStorage
function loadCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
  }
}

// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartCount() {
  cartCount.textContent = cart.length;
}

// Hiển thị thông báo
function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;

  // Thêm class cho loại thông báo
  if (type === "error") {
    notification.style.background = "#e74c3c";
  } else if (type === "warning") {
    notification.style.background = "#f39c12";
  } else {
    notification.style.background = "var(--primary)";
  }

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: var(--primary);
    color: white;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    transform: translateX(120%);
    transition: transform 0.3s ease;
    font-weight: 500;
  `;

  document.body.appendChild(notification);

  // Hiển thị thông báo
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Ẩn thông báo sau 3 giây
  setTimeout(() => {
    notification.style.transform = "translateX(120%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Xử lý form liên hệ
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Lấy dữ liệu từ form
    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // Kiểm tra dữ liệu
    if (!name || !email || !subject || !message) {
      showNotification("Vui lòng điền đầy đủ thông tin bắt buộc", "error");
      return;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("Vui lòng nhập địa chỉ email hợp lệ", "error");
      return;
    }

    // Mô phỏng gửi form thành công
    showNotification(
      "Tin nhắn của bạn đã được gửi thành công! Chúng tôi sẽ phản hồi trong thời gian sớm nhất."
    );

    // Reset form
    contactForm.reset();

    // Lưu thông tin liên hệ vào localStorage (mô phỏng)
    const contactData = {
      name,
      email,
      phone: formData.get("phone") || "",
      subject,
      message,
      timestamp: new Date().toISOString(),
    };

    // Lấy danh sách liên hệ hiện có hoặc tạo mới
    const existingContacts = JSON.parse(
      localStorage.getItem("contactSubmissions") || "[]"
    );
    existingContacts.push(contactData);
    localStorage.setItem(
      "contactSubmissions",
      JSON.stringify(existingContacts)
    );
  });
}

// Xử lý đăng xuất
if (logoutLink) {
  logoutLink.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "false");
    checkAuthStatus();
    showNotification("Bạn đã đăng xuất thành công");
  });
}

// Thêm hiệu ứng cho các icon liên hệ
document.addEventListener("DOMContentLoaded", function () {
  const contactIcons = document.querySelectorAll(".contact-icon");

  contactIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotate(5deg)";
      this.style.transition = "transform 0.3s ease";
    });

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0)";
    });
  });

  // Thêm hiệu ứng cho các liên kết xã hội
  const socialLinks = document.querySelectorAll(".social-link");

  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});

// Khởi tạo khi trang tải xong
document.addEventListener("DOMContentLoaded", function () {
  checkAuthStatus();
  loadCart();

  // Thêm hiệu ứng cho các phần tử trang liên hệ
  const contactItems = document.querySelectorAll(".contact-item");

  contactItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";

    setTimeout(() => {
      item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 200);
  });

  // Thêm hiệu ứng cho form
  const formGroups = document.querySelectorAll(".form-group");

  formGroups.forEach((group, index) => {
    group.style.opacity = "0";
    group.style.transform = "translateX(-20px)";

    setTimeout(() => {
      group.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      group.style.opacity = "1";
      group.style.transform = "translateX(0)";
    }, index * 150 + 500);
  });

  // Thêm hiệu ứng cho bản đồ
  const mapContainer = document.querySelector(".map-container");
  if (mapContainer) {
    mapContainer.style.opacity = "0";

    setTimeout(() => {
      mapContainer.style.transition = "opacity 0.8s ease";
      mapContainer.style.opacity = "1";
    }, 1000);
  }
});
