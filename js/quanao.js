// Dữ liệu sản phẩm
const products = {
  1: {
    id: 1,
    name: "Balenciaga Logo Hoodie",
    brand: "balenciaga",
    currentPrice: "12.990.000₫",
    originalPrice: "15.990.000₫",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specs: [
      "Chất liệu: Cotton cao cấp 100%",
      "Kiểu dáng: Oversize",
      "Màu sắc: Đen",
      "Kích thước: S, M, L, XL",
      "Xuất xứ: Pháp",
      "Bảo hành: 12 tháng",
    ],
  },
  2: {
    id: 2,
    name: "Gucci GG T-Shirt",
    brand: "gucci",
    currentPrice: "8.990.000₫",
    originalPrice: "10.990.000₫",
    image:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specs: [
      "Chất liệu: Cotton 100%",
      "Kiểu dáng: Regular fit",
      "Màu sắc: Trắng",
      "Kích thước: S, M, L, XL",
      "Xuất xứ: Ý",
      "Bảo hành: 6 tháng",
    ],
  },
  3: {
    id: 3,
    name: "Puma Sport Jacket",
    brand: "puma",
    currentPrice: "2.990.000₫",
    originalPrice: "3.990.000₫",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specs: [
      "Chất liệu: Polyester chống nước",
      "Kiểu dáng: Thể thao",
      "Màu sắc: Xanh navy",
      "Kích thước: S, M, L, XL",
      "Xuất xứ: Đức",
      "Bảo hành: 12 tháng",
    ],
  },
  4: {
    id: 4,
    name: "Handes Evening Dress",
    brand: "handes",
    currentPrice: "5.990.000₫",
    originalPrice: "7.990.000₫",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specs: [
      "Chất liệu: Lụa cao cấp",
      "Kiểu dáng: Dạ hội",
      "Màu sắc: Đỏ",
      "Kích thước: S, M, L",
      "Xuất xứ: Pháp",
      "Bảo hành: Không",
    ],
  },
  5: {
    id: 5,
    name: "Chanel Classic Flap Bag",
    brand: "chanel",
    currentPrice: "45.990.000₫",
    originalPrice: "52.990.000₫",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specs: [
      "Chất liệu: Da cừu cao cấp",
      "Kiểu dáng: Túi xách cổ điển",
      "Màu sắc: Đen",
      "Kích thước: 25.5 x 16 x 7.5 cm",
      "Xuất xứ: Pháp",
      "Bảo hành: 24 tháng",
    ],
  },
  6: {
    id: 6,
    name: "Nike Air Jordan 1",
    brand: "nike",
    currentPrice: "5.990.000₫",
    originalPrice: "6.990.000₫",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specs: [
      "Chất liệu: Da tổng hợp cao cấp",
      "Kiểu dáng: Sneaker cổ cao",
      "Màu sắc: Đỏ/Đen/Trắng",
      "Kích thước: 36-45",
      "Xuất xứ: Việt Nam",
      "Bảo hành: 6 tháng",
    ],
  },
  7: {
    id: 7,
    name: "Adidas Ultraboost 22",
    brand: "adidas",
    currentPrice: "4.990.000₫",
    originalPrice: "5.990.000₫",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specs: [
      "Chất liệu: Primeknit",
      "Kiểu dáng: Giày chạy bộ",
      "Màu sắc: Trắng/Đen",
      "Kích thước: 36-45",
      "Xuất xứ: Indonesia",
      "Bảo hành: 6 tháng",
    ],
  },
};

// Khởi tạo ứng dụng
document.addEventListener("DOMContentLoaded", function () {
  // Xử lý thumbnail gallery
  initGallery();

  // Xử lý bộ lọc thương hiệu
  initBrandFilter();

  // Xử lý modal sản phẩm
  initProductModal();

  // Xử lý nút yêu thích
  initWishlistButtons();

  // Xử lý đăng nhập/đăng xuất
  initAuth();

  // Thêm hiệu ứng scroll cho header
  initScrollEffect();
});

// Hàm khởi tạo gallery
function initGallery() {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.getElementById("mainImage");
  const mainTitle = document.getElementById("mainTitle");
  const mainDescription = document.getElementById("mainDescription");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      // Xóa class active khỏi tất cả thumbnails
      thumbnails.forEach((t) => t.classList.remove("active"));

      // Thêm class active vào thumbnail được click
      this.classList.add("active");

      // Cập nhật ảnh chính và thông tin
      const imageSrc = this.getAttribute("data-image");
      const title = this.getAttribute("data-title");
      const description = this.getAttribute("data-description");

      mainImage.src = imageSrc;
      mainTitle.textContent = title;
      mainDescription.textContent = description;
    });
  });
}

// Hàm khởi tạo bộ lọc thương hiệu
function initBrandFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const brandSections = document.querySelectorAll(".brand-section");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Xóa class active khỏi tất cả nút
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Thêm class active vào nút được click
      this.classList.add("active");

      const brand = this.getAttribute("data-brand");

      // Hiển thị/ẩn các section theo thương hiệu
      brandSections.forEach((section) => {
        if (brand === "all" || section.id === brand) {
          section.style.display = "block";
          // Thêm hiệu ứng fade in
          setTimeout(() => {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
          }, 10);
        } else {
          section.style.opacity = "0";
          section.style.transform = "translateY(20px)";
          setTimeout(() => {
            section.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Hàm khởi tạo modal sản phẩm
function initProductModal() {
  const modal = document.getElementById("productModal");
  const modalClose = document.getElementById("modalClose");
  const detailButtons = document.querySelectorAll(".btn-details");

  // Đóng modal khi click nút đóng
  modalClose.addEventListener("click", function () {
    closeModal();
  });

  // Đóng modal khi click bên ngoài
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Đóng modal bằng phím ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Mở modal khi click nút xem chi tiết
  detailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      openProductModal(productId);
    });
  });

  // Hàm mở modal
  function openProductModal(productId) {
    const product = products[productId];
    if (!product) return;

    // Cập nhật thông tin sản phẩm trong modal
    document.getElementById("modalImage").src = product.image;
    document.getElementById("modalTitle").textContent = product.name;
    document.getElementById("modalCurrentPrice").textContent =
      product.currentPrice;
    document.getElementById("modalOriginalPrice").textContent =
      product.originalPrice;

    // Cập nhật thông số kỹ thuật
    const specsList = document.getElementById("modalSpecs");
    specsList.innerHTML = "";

    product.specs.forEach((spec) => {
      const li = document.createElement("li");
      li.textContent = spec;
      specsList.appendChild(li);
    });

    // Hiển thị modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Hàm đóng modal
  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Hàm khởi tạo nút yêu thích
function initWishlistButtons() {
  const wishlistButtons = document.querySelectorAll(".btn-wishlist");

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector("i");

      if (icon.classList.contains("far")) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        icon.style.color = "#e74c3c";

        // Hiệu ứng heartbeat
        this.style.animation = "heartbeat 0.5s ease";
        setTimeout(() => {
          this.style.animation = "";
        }, 500);
      } else {
        icon.classList.remove("fas");
        icon.classList.add("far");
        icon.style.color = "";
      }
    });
  });
}

// Hàm khởi tạo xác thực
function initAuth() {
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutLink = document.getElementById("logout-link");

  // Giả lập trạng thái đăng nhập (trong thực tế sẽ kiểm tra từ server)
  let isLoggedIn = false;

  // Xử lý đăng nhập
  loginLink.addEventListener("click", function (e) {
    e.preventDefault();

    // Giả lập đăng nhập thành công
    isLoggedIn = true;
    updateAuthUI();

    // Hiển thị thông báo
    showNotification("Đăng nhập thành công!", "success");
  });

  // Xử lý đăng ký
  registerLink.addEventListener("click", function (e) {
    e.preventDefault();

    // Giả lập đăng ký thành công
    isLoggedIn = true;
    updateAuthUI();

    // Hiển thị thông báo
    showNotification("Đăng ký thành công!", "success");
  });

  // Xử lý đăng xuất
  logoutLink.addEventListener("click", function (e) {
    e.preventDefault();

    // Giả lập đăng xuất
    isLoggedIn = false;
    updateAuthUI();

    // Hiển thị thông báo
    showNotification("Đã đăng xuất!", "info");
  });

  // Cập nhật giao diện xác thực
  function updateAuthUI() {
    if (isLoggedIn) {
      loginLink.style.display = "none";
      registerLink.style.display = "none";
      logoutLink.style.display = "inline-block";
    } else {
      loginLink.style.display = "inline-block";
      registerLink.style.display = "inline-block";
      logoutLink.style.display = "none";
    }
  }

  // Khởi tạo trạng thái ban đầu
  updateAuthUI();
}

// Hàm khởi tạo hiệu ứng scroll
function initScrollEffect() {
  const header = document.querySelector("header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scroll xuống
      header.style.transform = "translateY(-100%)";
    } else {
      // Scroll lên
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });
}

// Hàm hiển thị thông báo
function showNotification(message, type = "info") {
  // Tạo thông báo
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;

  // Thêm CSS cho thông báo
  const style = document.createElement("style");
  style.textContent = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 3000;
      transform: translateX(150%);
      transition: transform 0.3s ease;
      max-width: 350px;
      border-left: 4px solid;
    }
    
    .notification-success {
      border-left-color: #27ae60;
    }
    
    .notification-info {
      border-left-color: #3498db;
    }
    
    .notification-warning {
      border-left-color: #f39c12;
    }
    
    .notification-error {
      border-left-color: #e74c3c;
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .notification-content i {
      font-size: 18px;
    }
    
    .notification-success .notification-content i {
      color: #27ae60;
    }
    
    .notification-info .notification-content i {
      color: #3498db;
    }
    
    .notification-warning .notification-content i {
      color: #f39c12;
    }
    
    .notification-error .notification-content i {
      color: #e74c3c;
    }
    
    .notification-close {
      background: none;
      border: none;
      cursor: pointer;
      margin-left: 15px;
      color: #7f8c8d;
      transition: color 0.3s ease;
    }
    
    .notification-close:hover {
      color: #34495e;
    }
    
    @keyframes heartbeat {
      0% { transform: scale(1); }
      25% { transform: scale(1.1); }
      50% { transform: scale(1); }
      75% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(notification);

  // Hiển thị thông báo
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Xử lý đóng thông báo
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", function () {
    notification.style.transform = "translateX(150%)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  });

  // Tự động đóng sau 5 giây
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(150%)";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 5000);
}

// Hàm lấy icon cho thông báo
function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "check-circle";
    case "warning":
      return "exclamation-triangle";
    case "error":
      return "times-circle";
    default:
      return "info-circle";
  }
}

// Thêm hiệu ứng cho các phần tử khi scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Quan sát các phần tử cần hiệu ứng
  const animatedElements = document.querySelectorAll(
    ".brand-section, .product-card, .gallery-container"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// Khởi tạo hiệu ứng scroll khi trang tải xong
window.addEventListener("load", function () {
  initScrollAnimations();
});
