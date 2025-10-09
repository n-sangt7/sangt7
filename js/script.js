// Product Data
const products = {
  iphone14: {
    name: "iPhone 14 Pro Max 256GB",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "28.990.000₫",
    originalPrice: "32.990.000₫",
    specs: [
      "Màn hình: 6.7 inch Super Retina XDR",
      "Chip: A16 Bionic",
      "RAM: 6GB, Bộ nhớ: 256GB",
      "Camera sau: 48MP + 12MP + 12MP",
      "Camera trước: 12MP",
      "Pin: 4323mAh, Sạc nhanh 20W",
      "Hệ điều hành: iOS 16",
    ],
  },
  iphone13: {
    name: "iPhone 13 128GB",
    image:
      "https://images.unsplash.com/photo-1632661674599-451dbb6a7bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "18.990.000₫",
    originalPrice: "22.990.000₫",
    specs: [
      "Màn hình: 6.1 inch Super Retina XDR",
      "Chip: A15 Bionic",
      "RAM: 4GB, Bộ nhớ: 128GB",
      "Camera sau: 12MP + 12MP",
      "Camera trước: 12MP",
      "Pin: 3240mAh, Sạc nhanh 20W",
      "Hệ điều hành: iOS 15",
    ],
  },
  iphone12: {
    name: "iPhone 12 64GB",
    image:
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "14.990.000₫",
    originalPrice: "17.990.000₫",
    specs: [
      "Màn hình: 6.1 inch Super Retina XDR",
      "Chip: A14 Bionic",
      "RAM: 4GB, Bộ nhớ: 64GB",
      "Camera sau: 12MP + 12MP",
      "Camera trước: 12MP",
      "Pin: 2815mAh, Sạc nhanh 20W",
      "Hệ điều hành: iOS 14",
    ],
  },
  s23ultra: {
    name: "Samsung Galaxy S23 Ultra 256GB",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "24.990.000₫",
    originalPrice: "28.990.000₫",
    specs: [
      "Màn hình: 6.8 inch Dynamic AMOLED 2X",
      "Chip: Snapdragon 8 Gen 2",
      "RAM: 12GB, Bộ nhớ: 256GB",
      "Camera sau: 200MP + 10MP + 10MP + 12MP",
      "Camera trước: 12MP",
      "Pin: 5000mAh, Sạc nhanh 45W",
      "Hệ điều hành: Android 13",
    ],
  },
  zfold4: {
    name: "Samsung Galaxy Z Fold4 512GB",
    image:
      "https://images.unsplash.com/photo-1662948998863-57f3596f47c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "39.990.000₫",
    originalPrice: "44.990.000₫",
    specs: [
      "Màn hình: 7.6 inch Dynamic AMOLED 2X",
      "Chip: Snapdragon 8+ Gen 1",
      "RAM: 12GB, Bộ nhớ: 512GB",
      "Camera sau: 50MP + 12MP + 10MP",
      "Camera trước: 10MP + 4MP",
      "Pin: 4400mAh, Sạc nhanh 25W",
      "Hệ điều hành: Android 12L",
    ],
  },
  a54: {
    name: "Samsung Galaxy A54 128GB",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "8.990.000₫",
    originalPrice: "9.990.000₫",
    specs: [
      "Màn hình: 6.4 inch Super AMOLED",
      "Chip: Exynos 1380",
      "RAM: 8GB, Bộ nhớ: 128GB",
      "Camera sau: 64MP + 12MP + 5MP",
      "Camera trước: 32MP",
      "Pin: 5000mAh, Sạc nhanh 25W",
      "Hệ điều hành: Android 13",
    ],
  },
  xiaomi13pro: {
    name: "Xiaomi 13 Pro 256GB",
    image:
      "https://images.unsplash.com/photo-1598327105854-c8674faddf74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "18.990.000₫",
    originalPrice: "21.990.000₫",
    specs: [
      "Màn hình: 6.73 inch AMOLED",
      "Chip: Snapdragon 8 Gen 2",
      "RAM: 12GB, Bộ nhớ: 256GB",
      "Camera sau: 50MP + 50MP + 50MP",
      "Camera trước: 32MP",
      "Pin: 4820mAh, Sạc nhanh 120W",
      "Hệ điều hành: MIUI 14",
    ],
  },
  redminote12: {
    name: "Xiaomi Redmi Note 12 128GB",
    image:
      "https://images.unsplash.com/photo-1598301257982-0cf01499abb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "5.990.000₫",
    originalPrice: "6.990.000₫",
    specs: [
      "Màn hình: 6.67 inch AMOLED",
      "Chip: Snapdragon 685",
      "RAM: 6GB, Bộ nhớ: 128GB",
      "Camera sau: 48MP + 8MP + 2MP",
      "Camera trước: 13MP",
      "Pin: 5000mAh, Sạc nhanh 33W",
      "Hệ điều hành: MIUI 13",
    ],
  },
  pocox5pro: {
    name: "Xiaomi Poco X5 Pro 256GB",
    image:
      "https://images.unsplash.com/photo-1595941069915-4ebc5197c14a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "7.490.000₫",
    originalPrice: "8.490.000₫",
    specs: [
      "Màn hình: 6.67 inch AMOLED",
      "Chip: Snapdragon 778G",
      "RAM: 8GB, Bộ nhớ: 256GB",
      "Camera sau: 108MP + 8MP + 2MP",
      "Camera trước: 16MP",
      "Pin: 5000mAh, Sạc nhanh 67W",
      "Hệ điều hành: MIUI 13",
    ],
  },
  findx5pro: {
    name: "OPPO Find X5 Pro 256GB",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "19.990.000₫",
    originalPrice: "22.990.000₫",
    specs: [
      "Màn hình: 6.7 inch LTPO2 AMOLED",
      "Chip: Snapdragon 8 Gen 1",
      "RAM: 12GB, Bộ nhớ: 256GB",
      "Camera sau: 50MP + 50MP + 13MP",
      "Camera trước: 32MP",
      "Pin: 5000mAh, Sạc nhanh 80W",
      "Hệ điều hành: ColorOS 12",
    ],
  },
  reno8t: {
    name: "OPPO Reno8 T 128GB",
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "8.490.000₫",
    originalPrice: "9.490.000₫",
    specs: [
      "Màn hình: 6.43 inch AMOLED",
      "Chip: Snapdragon 695",
      "RAM: 8GB, Bộ nhớ: 128GB",
      "Camera sau: 100MP + 2MP + 2MP",
      "Camera trước: 32MP",
      "Pin: 4800mAh, Sạc nhanh 33W",
      "Hệ điều hành: ColorOS 13",
    ],
  },
  a77s: {
    name: "OPPO A77s 128GB",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "5.990.000₫",
    originalPrice: "6.490.000₫",
    specs: [
      "Màn hình: 6.56 inch IPS LCD",
      "Chip: Snapdragon 680",
      "RAM: 8GB, Bộ nhớ: 128GB",
      "Camera sau: 50MP + 2MP",
      "Camera trước: 8MP",
      "Pin: 5000mAh, Sạc nhanh 33W",
      "Hệ điều hành: ColorOS 12",
    ],
  },
  xperia1v: {
    name: "Sony Xperia 1 V 256GB",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "26.990.000₫",
    originalPrice: "29.990.000₫",
    specs: [
      "Màn hình: 6.5 inch 4K HDR OLED",
      "Chip: Snapdragon 8 Gen 2",
      "RAM: 12GB, Bộ nhớ: 256GB",
      "Camera sau: 48MP + 12MP + 12MP",
      "Camera trước: 12MP",
      "Pin: 5000mAh, Sạc nhanh 30W",
      "Hệ điều hành: Android 13",
    ],
  },
  xperia5iv: {
    name: "Sony Xperia 5 IV 128GB",
    image:
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "18.990.000₫",
    originalPrice: "21.990.000₫",
    specs: [
      "Màn hình: 6.1 inch FHD+ OLED",
      "Chip: Snapdragon 8 Gen 1",
      "RAM: 8GB, Bộ nhớ: 128GB",
      "Camera sau: 12MP + 12MP + 12MP",
      "Camera trước: 12MP",
      "Pin: 5000mAh, Sạc nhanh 30W",
      "Hệ điều hành: Android 12",
    ],
  },
  xperia10iv: {
    name: "Sony Xperia 10 IV 128GB",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "9.990.000₫",
    originalPrice: "10.990.000₫",
    specs: [
      "Màn hình: 6.0 inch OLED",
      "Chip: Snapdragon 695",
      "RAM: 6GB, Bộ nhớ: 128GB",
      "Camera sau: 12MP + 8MP + 8MP",
      "Camera trước: 8MP",
      "Pin: 5000mAh, Sạc nhanh 21W",
      "Hệ điều hành: Android 12",
    ],
  },
  vivox90pro: {
    name: "Vivo X90 Pro 256GB",
    image:
      "https://images.unsplash.com/photo-1598327105854-c8674faddf74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "17.990.000₫",
    originalPrice: "19.990.000₫",
    specs: [
      "Màn hình: 6.78 inch AMOLED",
      "Chip: MediaTek Dimensity 9200",
      "RAM: 12GB, Bộ nhớ: 256GB",
      "Camera sau: 50MP + 50MP + 12MP",
      "Camera trước: 32MP",
      "Pin: 4870mAh, Sạc nhanh 120W",
      "Hệ điều hành: Funtouch OS 13",
    ],
  },
  gtneo5: {
    name: "Realme GT Neo 5 256GB",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "11.990.000₫",
    originalPrice: "13.990.000₫",
    specs: [
      "Màn hình: 6.74 inch AMOLED",
      "Chip: Snapdragon 8+ Gen 1",
      "RAM: 12GB, Bộ nhớ: 256GB",
      "Camera sau: 50MP + 8MP + 2MP",
      "Camera trước: 16MP",
      "Pin: 5000mAh, Sạc nhanh 150W",
      "Hệ điều hành: Realme UI 4.0",
    ],
  },
  nokiag60: {
    name: "Nokia G60 128GB",
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "5.490.000₫",
    originalPrice: "6.490.000₫",
    specs: [
      "Màn hình: 6.58 inch IPS LCD",
      "Chip: Snapdragon 695",
      "RAM: 6GB, Bộ nhớ: 128GB",
      "Camera sau: 50MP + 5MP + 2MP",
      "Camera trước: 8MP",
      "Pin: 4500mAh, Sạc nhanh 20W",
      "Hệ điều hành: Android 12",
    ],
  },
};

// DOM Elements
const modalOverlay = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const modalProductImage = document.getElementById("modalProductImage");
const modalProductName = document.getElementById("modalProductName");
const modalCurrentPrice = document.getElementById("modalCurrentPrice");
const modalOriginalPrice = document.getElementById("modalOriginalPrice");
const modalSpecs = document.getElementById("modalSpecs");
const modalBuyBtn = document.getElementById("modalBuyBtn");
const filterButtons = document.querySelectorAll(".filter-btn");
const brandSections = document.querySelectorAll(".brand-section");
const wishlistButtons = document.querySelectorAll(".btn-wishlist");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
const cartCount = document.querySelector(".cart-count");
const heartIcon = document.querySelector(".header-action .fa-heart");

// Current state
let currentProductId = null;
let cartItems = 0;
let wishlistItems = 0;

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  // Initialize event listeners
  initEventListeners();

  // Check if user is logged in
  checkLoginStatus();
});

// Initialize all event listeners
function initEventListeners() {
  // Product detail buttons
  document.querySelectorAll(".btn-details").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-product");
      openProductModal(productId);
    });
  });

  // Modal close button
  modalClose.addEventListener("click", closeProductModal);

  // Modal overlay click to close
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
      closeProductModal();
    }
  });

  // Filter buttons
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

  // Wishlist buttons
  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      toggleWishlist(this);
    });
  });

  // Search functionality
  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  // Buy button in modal
  modalBuyBtn.addEventListener("click", addToCart);

  // Heart icon in header
  heartIcon.addEventListener("click", function () {
    alert("Danh sách yêu thích của bạn có " + wishlistItems + " sản phẩm");
  });
}

// Open product modal
function openProductModal(productId) {
  const product = products[productId];
  if (!product) return;

  currentProductId = productId;

  // Update modal content
  modalProductImage.src = product.image;
  modalProductName.textContent = product.name;
  modalCurrentPrice.textContent = product.currentPrice;
  modalOriginalPrice.textContent = product.originalPrice;

  // Clear and add specs
  modalSpecs.innerHTML = "";
  product.specs.forEach((spec) => {
    const li = document.createElement("li");
    li.textContent = spec;
    modalSpecs.appendChild(li);
  });

  // Show modal
  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close product modal
function closeProductModal() {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Filter products by brand
function filterProducts(brand) {
  if (brand === "all") {
    brandSections.forEach((section) => {
      section.style.display = "block";
    });
  } else {
    brandSections.forEach((section) => {
      if (section.id === brand) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });
  }

  // Scroll to top of products
  document.querySelector(".phone-products").scrollIntoView({
    behavior: "smooth",
  });
}

// Toggle wishlist
function toggleWishlist(button) {
  const icon = button.querySelector("i");

  if (icon.classList.contains("far")) {
    // Add to wishlist
    icon.classList.remove("far");
    icon.classList.add("fas");
    icon.style.color = "#e74c3c";
    wishlistItems++;
    showNotification("Đã thêm vào danh sách yêu thích");
  } else {
    // Remove from wishlist
    icon.classList.remove("fas");
    icon.classList.add("far");
    icon.style.color = "";
    wishlistItems--;
    showNotification("Đã xóa khỏi danh sách yêu thích");
  }

  // Update heart icon in header if needed
  updateHeaderWishlist();
}

// Update header wishlist icon
function updateHeaderWishlist() {
  if (wishlistItems > 0) {
    heartIcon.style.color = "#e74c3c";
  } else {
    heartIcon.style.color = "";
  }
}

// Perform search
function performSearch() {
  const query = searchInput.value.trim().toLowerCase();

  if (query === "") {
    alert("Vui lòng nhập từ khóa tìm kiếm");
    return;
  }

  // Simple search implementation
  let found = false;

  document.querySelectorAll(".product-card").forEach((card) => {
    const productName = card
      .querySelector(".product-name")
      .textContent.toLowerCase();

    if (productName.includes(query)) {
      card.style.display = "block";
      found = true;

      // Scroll to the product
      card.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Highlight the product
      card.style.boxShadow = "0 0 0 3px #8b4513";
      setTimeout(() => {
        card.style.boxShadow = "";
      }, 2000);
    } else {
      card.style.display = "none";
    }
  });

  if (!found) {
    alert("Không tìm thấy sản phẩm nào phù hợp với từ khóa: " + query);
    // Show all products again
    document.querySelectorAll(".product-card").forEach((card) => {
      card.style.display = "block";
    });
  }
}

// Add to cart
function addToCart() {
  if (!currentProductId) return;

  cartItems++;
  cartCount.textContent = cartItems;

  // Show notification
  showNotification("Đã thêm vào giỏ hàng");

  // Close modal
  closeProductModal();
}

// Show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background-color: #8b4513;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 3000;
    transition: all 0.3s ease;
    transform: translateX(100%);
    opacity: 0;
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
    notification.style.opacity = "1";
  }, 10);

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    notification.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Check login status
function checkLoginStatus() {
  // This is a simple simulation
  // In a real application, you would check with your backend
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    document.getElementById("login-link").style.display = "none";
    document.getElementById("register-link").style.display = "none";
    document.getElementById("logout-link").style.display = "block";
  } else {
    document.getElementById("login-link").style.display = "block";
    document.getElementById("register-link").style.display = "block";
    document.getElementById("logout-link").style.display = "none";
  }

  // Logout functionality
  document
    .getElementById("logout-link")
    .addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.setItem("isLoggedIn", "false");
      location.reload();
    });
}

// Add some sample wishlist and cart items for demo
window.addEventListener("load", function () {
  // Add a few items to wishlist for demo
  const demoWishlistButtons = document.querySelectorAll(
    ".btn-wishlist:not(.active)"
  );
  if (demoWishlistButtons.length > 0) {
    // Add first two products to wishlist for demo
    for (let i = 0; i < Math.min(2, demoWishlistButtons.length); i++) {
      const button = demoWishlistButtons[i];
      const icon = button.querySelector("i");
      icon.classList.remove("far");
      icon.classList.add("fas");
      icon.style.color = "#e74c3c";
      wishlistItems++;
    }
    updateHeaderWishlist();
  }

  // Add a few items to cart for demo
  cartItems = 2;
  cartCount.textContent = cartItems;
});
