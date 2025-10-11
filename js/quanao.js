// Dữ liệu sản phẩm
const products = [
  {
    id: 1,
    name: "Balenciaga Logo Hoodie",
    brand: "balenciaga",
    currentPrice: "12.990.000₫",
    originalPrice: "15.990.000₫",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    specs: [
      "Chất liệu: Cotton cao cấp",
      "Kiểu dáng: Oversize",
      "Màu sắc: Đen",
      "Kích thước: S, M, L, XL",
      "Xuất xứ: Pháp",
      "Bảo hành: 12 tháng",
    ],
  },
  {
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
  {
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
      "Màu sắc: Xanh Navy",
      "Kích thước: S, M, L, XL",
      "Xuất xứ: Đức",
      "Bảo hành: 12 tháng",
    ],
  },
  {
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
      "Màu sắc: Đỏ rượu",
      "Kích thước: S, M, L",
      "Xuất xứ: Việt Nam",
      "Bảo hành: 6 tháng",
    ],
  },
  {
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
      "Kích thước: 25cm",
      "Xuất xứ: Pháp",
      "Bảo hành: 24 tháng",
    ],
  },
  {
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
      "Xuất xứ: Mỹ",
      "Bảo hành: 12 tháng",
    ],
  },
  {
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
      "Xuất xứ: Đức",
      "Bảo hành: 12 tháng",
    ],
  },
];

// DOM Elements
const modalOverlay = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCurrentPrice = document.getElementById("modalCurrentPrice");
const modalOriginalPrice = document.getElementById("modalOriginalPrice");
const modalSpecs = document.getElementById("modalSpecs");
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const brandSections = document.querySelectorAll(".brand-section");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const wishlistButtons = document.querySelectorAll(".btn-wishlist");
const cartCount = document.querySelector(".cart-count");
const loginLink = document.getElementById("login-link");
const registerLink = document.getElementById("register-link");
const logoutLink = document.getElementById("logout-link");

// Modal Functions
function openModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalTitle.textContent = product.name;
  modalCurrentPrice.textContent = product.currentPrice;
  modalOriginalPrice.textContent = product.originalPrice;

  modalSpecs.innerHTML = "";
  product.specs.forEach((spec) => {
    const li = document.createElement("li");
    li.textContent = spec;
    modalSpecs.appendChild(li);
  });

  modalOverlay.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.style.display = "none";
  document.body.style.overflow = "auto";
}

// Filter Products by Brand
function filterProducts(brand) {
  if (brand === "all") {
    productCards.forEach((card) => {
      card.style.display = "block";
    });
    brandSections.forEach((section) => {
      section.style.display = "block";
    });
  } else {
    productCards.forEach((card) => {
      if (card.dataset.brand === brand) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    brandSections.forEach((section) => {
      if (section.id === brand) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });
  }
}

// Search Products
function searchProducts() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm === "") {
    productCards.forEach((card) => {
      card.style.display = "block";
    });
    brandSections.forEach((section) => {
      section.style.display = "block";
    });
    return;
  }

  let foundAny = false;

  productCards.forEach((card) => {
    const productName = card
      .querySelector(".product-name")
      .textContent.toLowerCase();
    const brand = card.dataset.brand;

    if (productName.includes(searchTerm) || brand.includes(searchTerm)) {
      card.style.display = "block";
      foundAny = true;
    } else {
      card.style.display = "none";
    }
  });

  // Hiển thị/ẩn các section thương hiệu dựa trên kết quả tìm kiếm
  brandSections.forEach((section) => {
    const hasVisibleProducts = Array.from(
      section.querySelectorAll(".product-card")
    ).some((card) => card.style.display !== "none");

    section.style.display = hasVisibleProducts ? "block" : "none";
  });

  // Reset filter buttons
  filterButtons.forEach((btn) => {
    if (btn.dataset.brand !== "all") {
      btn.classList.remove("active");
    }
  });
  document
    .querySelector('.filter-btn[data-brand="all"]')
    .classList.add("active");
}

// Toggle Wishlist
function toggleWishlist(button) {
  const icon = button.querySelector("i");
  if (icon.classList.contains("far")) {
    icon.classList.remove("far");
    icon.classList.add("fas");
    icon.style.color = "#e74c3c";

    // Hiệu ứng heart
    button.style.transform = "scale(1.2)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 300);
  } else {
    icon.classList.remove("fas");
    icon.classList.add("far");
    icon.style.color = "";
  }
}

// Add to Cart
function addToCart() {
  let count = parseInt(cartCount.textContent);
  count++;
  cartCount.textContent = count;

  // Hiệu ứng giỏ hàng
  cartCount.style.transform = "scale(1.5)";
  setTimeout(() => {
    cartCount.style.transform = "scale(1)";
  }, 300);

  // Thông báo
  showNotification("Đã thêm sản phẩm vào giỏ hàng!");
}

// Show Notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--success);
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 3000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Simulate Login/Logout
function simulateLogin() {
  loginLink.style.display = "none";
  registerLink.style.display = "none";
  logoutLink.style.display = "block";
  showNotification("Đăng nhập thành công!");
}

function simulateLogout() {
  loginLink.style.display = "block";
  registerLink.style.display = "block";
  logoutLink.style.display = "none";
  showNotification("Đã đăng xuất!");
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  // Modal events
  document.querySelectorAll(".btn-details").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.dataset.id);
      openModal(productId);
    });
  });

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Filter events
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      filterProducts(this.dataset.brand);
    });
  });

  // Search events
  searchBtn.addEventListener("click", searchProducts);
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchProducts();
    }
  });

  // Wishlist events
  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      toggleWishlist(this);
    });
  });

  // Cart events
  document.querySelectorAll(".btn-buy").forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  // Auth events
  loginLink.addEventListener("click", function (e) {
    e.preventDefault();
    simulateLogin();
  });

  registerLink.addEventListener("click", function (e) {
    e.preventDefault();
    simulateLogin();
  });

  logoutLink.addEventListener("click", function (e) {
    e.preventDefault();
    simulateLogout();
  });

  // Auto-slide fashion slider
  const sliderTrack = document.querySelector(".slider-track");
  let isPaused = false;

  sliderTrack.addEventListener("mouseenter", () => {
    isPaused = true;
    sliderTrack.style.animationPlayState = "paused";
  });

  sliderTrack.addEventListener("mouseleave", () => {
    isPaused = false;
    sliderTrack.style.animationPlayState = "running";
  });
});
