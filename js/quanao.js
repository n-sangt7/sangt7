// Product data
const products = {
  1: {
    title: "Balenciaga Logo Hoodie",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "12.990.000₫",
    originalPrice: "15.990.000₫",
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
    title: "Gucci GG T-Shirt",
    image:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "8.990.000₫",
    originalPrice: "10.990.000₫",
    specs: [
      "Chất liệu: Cotton 100%",
      "Kiểu dáng: Regular fit",
      "Màu sắc: Trắng",
      "Kích thước: S, M, L, XL",
      "Xuất xứ: Italy",
      "Bảo hành: 6 tháng",
    ],
  },
  3: {
    title: "Puma Sport Jacket",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "2.990.000₫",
    originalPrice: "3.990.000₫",
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
    title: "Handes Evening Dress",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "5.990.000₫",
    originalPrice: "7.990.000₫",
    specs: [
      "Chất liệu: Lụa cao cấp",
      "Kiểu dáng: Dạ hội",
      "Màu sắc: Đỏ",
      "Kích thước: S, M, L",
      "Xuất xứ: Pháp",
      "Bảo hành: 6 tháng",
    ],
  },
  5: {
    title: "Chanel Classic Flap Bag",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "45.990.000₫",
    originalPrice: "52.990.000₫",
    specs: [
      "Chất liệu: Da cừu cao cấp",
      "Kích thước: 25.5 x 15 x 7.5 cm",
      "Màu sắc: Đen",
      "Chất liệu khoá: Vàng",
      "Xuất xứ: Pháp",
      "Bảo hành: 24 tháng",
    ],
  },
  6: {
    title: "Nike Air Jordan 1",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "5.990.000₫",
    originalPrice: "6.990.000₫",
    specs: [
      "Chất liệu: Da cao cấp",
      "Kiểu dáng: Cổ cao",
      "Màu sắc: Đỏ/Đen/Trắng",
      "Kích cỡ: 38-45",
      "Xuất xứ: Việt Nam",
      "Bảo hành: 12 tháng",
    ],
  },
  7: {
    title: "Adidas Ultraboost 22",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "4.990.000₫",
    originalPrice: "5.990.000₫",
    specs: [
      "Chất liệu: Primeknit",
      "Công nghệ: Boost™",
      "Màu sắc: Trắng/Đen",
      "Kích cỡ: 38-45",
      "Xuất xứ: Indonesia",
      "Bảo hành: 12 tháng",
    ],
  },
};

// DOM Elements
const modal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCurrentPrice = document.getElementById("modalCurrentPrice");
const modalOriginalPrice = document.getElementById("modalOriginalPrice");
const modalSpecs = document.getElementById("modalSpecs");

// Thumbnail Gallery
const thumbnails = document.querySelectorAll(".thumbnail");
const mainImage = document.getElementById("mainImage");
const mainTitle = document.getElementById("mainTitle");
const mainDescription = document.getElementById("mainDescription");

// Filter buttons
const filterButtons = document.querySelectorAll(".filter-btn");
const brandSections = document.querySelectorAll(".brand-section");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  // Thumbnail click event
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      const image = this.getAttribute("data-image");
      const title = this.getAttribute("data-title");
      const description = this.getAttribute("data-description");

      // Update main image and info
      mainImage.src = image;
      mainTitle.textContent = title;
      mainDescription.textContent = description;

      // Update active state
      thumbnails.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Product detail buttons
  const detailButtons = document.querySelectorAll(".btn-details");
  detailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      openProductModal(productId);
    });
  });

  // Modal close events
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Filter functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const brand = this.getAttribute("data-brand");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter products
      filterProducts(brand);
    });
  });

  // Wishlist functionality
  const wishlistButtons = document.querySelectorAll(".btn-wishlist");
  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector("i");
      if (icon.classList.contains("far")) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        icon.style.color = "#e74c3c";
      } else {
        icon.classList.remove("fas");
        icon.classList.add("far");
        icon.style.color = "";
      }
    });
  });
});

// Open product modal
function openProductModal(productId) {
  const product = products[productId];
  if (product) {
    modalImage.src = product.image;
    modalTitle.textContent = product.title;
    modalCurrentPrice.textContent = product.currentPrice;
    modalOriginalPrice.textContent = product.originalPrice;

    // Clear and populate specs
    modalSpecs.innerHTML = "";
    product.specs.forEach((spec) => {
      const li = document.createElement("li");
      li.textContent = spec;
      modalSpecs.appendChild(li);
    });

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

// Close modal
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Filter products by brand
function filterProducts(brand) {
  brandSections.forEach((section) => {
    if (brand === "all" || section.id === brand) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

// Search functionality
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", performSearch);
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    performSearch();
  }
});

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  if (searchTerm) {
    alert(`Tìm kiếm: ${searchTerm}`);
    // Implement actual search logic here
  }
}

// Cart functionality
let cartCount = 0;
const cartButtons = document.querySelectorAll(".btn-buy");
const cartCountElement = document.querySelector(".cart-count");

cartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    cartCount++;
    cartCountElement.textContent = cartCount;

    // Add animation
    cartCountElement.style.transform = "scale(1.3)";
    setTimeout(() => {
      cartCountElement.style.transform = "scale(1)";
    }, 300);

    alert("Sản phẩm đã được thêm vào giỏ hàng!");
  });
});

// User authentication state
const loginLink = document.getElementById("login-link");
const registerLink = document.getElementById("register-link");
const logoutLink = document.getElementById("logout-link");

// Check if user is logged in (simulated)
function checkAuthState() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
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

// Logout functionality
logoutLink.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem("isLoggedIn");
  checkAuthState();
  alert("Đã đăng xuất thành công!");
});

// Initialize auth state
checkAuthState();

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add loading animation for images
const images = document.querySelectorAll("img");
images.forEach((img) => {
  img.addEventListener("load", function () {
    this.style.opacity = "1";
  });
  img.style.opacity = "0";
  img.style.transition = "opacity 0.3s ease";
});

// Add scroll to top functionality
const scrollToTop = document.createElement("button");
scrollToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTop.className = "scroll-to-top";
scrollToTop.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: var(--gradient);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
  z-index: 1000;
`;
document.body.appendChild(scrollToTop);

scrollToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTop.style.display = "flex";
  } else {
    scrollToTop.style.display = "none";
  }
});

// Add hover effects for product cards
const productCards = document.querySelectorAll(".product-card");
productCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});
