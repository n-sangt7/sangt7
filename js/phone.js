// Product data
const products = {
  iphone14: {
    name: "iPhone 14 Pro Max 256GB",
    brand: "Apple",
    price: "28.990.000₫",
    originalPrice: "32.990.000₫",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "iPhone 14 Pro Max với thiết kế màn hình Dynamic Island, chip A16 Bionic mạnh mẽ và hệ thống camera 48MP chuyên nghiệp.",
    features: [
      "Màn hình: 6.7 inch Super Retina XDR",
      "Chip: A16 Bionic",
      "Camera: 48MP + 12MP + 12MP",
      "Pin: Dùng cả ngày",
      "Hệ điều hành: iOS 16",
    ],
  },
  iphone13: {
    name: "iPhone 13 128GB",
    brand: "Apple",
    price: "18.990.000₫",
    originalPrice: "22.990.000₫",
    image:
      "https://images.unsplash.com/photo-1632661674599-451dbb6a7bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "iPhone 13 với chip A15 Bionic, thời lượng pin cải thiện và hệ thống camera kép tiên tiến.",
    features: [
      "Màn hình: 6.1 inch Super Retina XDR",
      "Chip: A15 Bionic",
      "Camera: 12MP + 12MP",
      "Pin: Dùng cả ngày",
      "Hệ điều hành: iOS 15",
    ],
  },
  iphone12: {
    name: "iPhone 12 64GB",
    brand: "Apple",
    price: "14.990.000₫",
    originalPrice: "17.990.000₫",
    image:
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "iPhone 12 với thiết kế phẳng sang trọng, chip A14 Bionic và hỗ trợ 5G.",
    features: [
      "Màn hình: 6.1 inch Super Retina XDR",
      "Chip: A14 Bionic",
      "Camera: 12MP + 12MP",
      "Pin: Dùng cả ngày",
      "Hệ điều hành: iOS 14",
    ],
  },
  s23ultra: {
    name: "Samsung Galaxy S23 Ultra",
    brand: "Samsung",
    price: "24.990.000₫",
    originalPrice: "28.990.000₫",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Samsung Galaxy S23 Ultra với bút S-Pen, camera 200MP và chip Snapdragon 8 Gen 2 tối ưu hóa.",
    features: [
      "Màn hình: 6.8 inch Dynamic AMOLED 2X",
      "Chip: Snapdragon 8 Gen 2",
      "Camera: 200MP + 10MP + 10MP + 12MP",
      "Pin: 5000mAh",
      "Hệ điều hành: Android 13",
    ],
  },
  zfold4: {
    name: "Samsung Galaxy Z Fold4",
    brand: "Samsung",
    price: "39.990.000₫",
    originalPrice: "44.990.000₫",
    image:
      "https://images.unsplash.com/photo-1662948998735-204c8c1d2a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Samsung Galaxy Z Fold4 - điện thoại màn hình gập cao cấp với hiệu năng mạnh mẽ và đa nhiệm vượt trội.",
    features: [
      "Màn hình: 7.6 inch Dynamic AMOLED 2X",
      "Chip: Snapdragon 8+ Gen 1",
      "Camera: 50MP + 12MP + 10MP",
      "Pin: 4400mAh",
      "Hệ điều hành: Android 12L",
    ],
  },
  a54: {
    name: "Samsung Galaxy A54 5G",
    brand: "Samsung",
    price: "9.990.000₫",
    originalPrice: "11.990.000₫",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Samsung Galaxy A54 5G với màn hình Super AMOLED 120Hz, camera chất lượng và thiết kế thời thượng.",
    features: [
      "Màn hình: 6.4 inch Super AMOLED",
      "Chip: Exynos 1380",
      "Camera: 64MP + 12MP + 5MP",
      "Pin: 5000mAh",
      "Hệ điều hành: Android 13",
    ],
  },
  xiaomi13: {
    name: "Xiaomi 13 Pro",
    brand: "Xiaomi",
    price: "16.990.000₫",
    originalPrice: "19.990.000₫",
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Xiaomi 13 Pro với camera Leica, chip Snapdragon 8 Gen 2 và sạc siêu nhanh 120W.",
    features: [
      "Màn hình: 6.73 inch AMOLED",
      "Chip: Snapdragon 8 Gen 2",
      "Camera: 50MP + 50MP + 50MP (Leica)",
      "Pin: 4820mAh",
      "Sạc: 120W có dây, 50W không dây",
    ],
  },
  "12t": {
    name: "Xiaomi 12T 5G",
    brand: "Xiaomi",
    price: "11.990.000₫",
    originalPrice: "13.990.000₫",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Xiaomi 12T 5G với camera 108MP, chip MediaTek Dimensity 8100-Ultra và sạc nhanh 120W.",
    features: [
      "Màn hình: 6.67 inch CrystalRes AMOLED",
      "Chip: MediaTek Dimensity 8100-Ultra",
      "Camera: 108MP + 8MP + 2MP",
      "Pin: 5000mAh",
      "Sạc: 120W",
    ],
  },
  note12: {
    name: "Redmi Note 12 Pro",
    brand: "Xiaomi",
    price: "7.990.000₫",
    originalPrice: "9.990.000₫",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Redmi Note 12 Pro với màn hình AMOLED 120Hz, camera 50MP và hiệu năng ổn định.",
    features: [
      "Màn hình: 6.67 inch AMOLED",
      "Chip: MediaTek Dimensity 1080",
      "Camera: 50MP + 8MP + 2MP",
      "Pin: 5000mAh",
      "Sạc: 67W",
    ],
  },
};

// DOM Elements
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const brandSections = document.querySelectorAll(".brand-section");
const detailButtons = document.querySelectorAll(".btn-details");
const modal = document.getElementById("productModal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const wishlistButtons = document.querySelectorAll(".btn-wishlist");
const cartCount = document.querySelector(".cart-count");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

// Initialize cart count
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
cartCount.textContent = cartItems.length;

// Filter products by brand
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const brand = button.dataset.brand;

    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Show/hide products based on brand
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
  });
});

// Show product details modal
detailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.product;
    const product = products[productId];

    if (product) {
      modalBody.innerHTML = `
        <div class="product-modal">
          <div class="modal-product-image">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="modal-product-info">
            <h2>${product.name}</h2>
            <div class="modal-product-price">
              <span class="current-price">${product.price}</span>
              <span class="original-price">${product.originalPrice}</span>
            </div>
            <p class="modal-product-description">${product.description}</p>
            <div class="modal-product-features">
              <h3>Thông số kỹ thuật</h3>
              <ul>
                ${product.features
                  .map((feature) => `<li>${feature}</li>`)
                  .join("")}
              </ul>
            </div>
            <div class="modal-actions">
              <button class="btn btn-add-to-cart" data-product="${productId}">
                <i class="fas fa-shopping-cart"></i> Thêm vào giỏ hàng
              </button>
              <button class="btn btn-buy-now" data-product="${productId}">
                <i class="fas fa-bolt"></i> Mua ngay
              </button>
            </div>
          </div>
        </div>
      `;

      // Add event listeners to modal buttons
      const addToCartBtn = modalBody.querySelector(".btn-add-to-cart");
      const buyNowBtn = modalBody.querySelector(".btn-buy-now");

      addToCartBtn.addEventListener("click", () => {
        addToCart(productId);
        showNotification("Đã thêm vào giỏ hàng!", "success");
      });

      buyNowBtn.addEventListener("click", () => {
        addToCart(productId);
        showNotification(
          "Đã thêm vào giỏ hàng! Chuyển đến thanh toán...",
          "success"
        );
        // In a real app, you would redirect to checkout page
      });

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

// Close modal
modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Add to wishlist
wishlistButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const icon = button.querySelector("i");

    if (icon.classList.contains("far")) {
      icon.classList.remove("far");
      icon.classList.add("fas");
      icon.style.color = "#ff4757";
      showNotification("Đã thêm vào yêu thích!", "success");
    } else {
      icon.classList.remove("fas");
      icon.classList.add("far");
      icon.style.color = "";
      showNotification("Đã xóa khỏi yêu thích!", "info");
    }
  });
});

// Add to cart function
function addToCart(productId) {
  const product = products[productId];

  if (product) {
    // Check if product already in cart
    const existingItem = cartItems.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    // Update localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Update cart count
    cartCount.textContent = cartItems.length;
  }
}

// Search functionality
searchBtn.addEventListener("click", performSearch);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    performSearch();
  }
});

function performSearch() {
  const query = searchInput.value.toLowerCase().trim();

  if (query) {
    // Filter products based on search query
    let found = false;

    productCards.forEach((card) => {
      const productName = card
        .querySelector(".product-name")
        .textContent.toLowerCase();

      if (productName.includes(query)) {
        card.style.display = "block";
        found = true;

        // Scroll to the product
        card.scrollIntoView({ behavior: "smooth", block: "center" });

        // Highlight the product
        card.style.boxShadow = "0 0 0 3px var(--accent)";
        setTimeout(() => {
          card.style.boxShadow = "";
        }, 2000);
      } else {
        card.style.display = "none";
      }
    });

    if (!found) {
      showNotification("Không tìm thấy sản phẩm phù hợp!", "error");
    }
  } else {
    // Reset filter if search is empty
    filterButtons.forEach((btn) => {
      if (btn.dataset.brand === "all") {
        btn.click();
      }
    });
  }
}

// Notification function
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${
        type === "success"
          ? "check-circle"
          : type === "error"
          ? "exclamation-circle"
          : "info-circle"
      }"></i>
      <span>${message}</span>
    </div>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${
      type === "success"
        ? "#8fbc8f"
        : type === "error"
        ? "#ff6b6b"
        : "var(--accent)"
    };
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    z-index: 3000;
    transform: translateX(150%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = "translateX(150%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Add some CSS for the notification
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
  .notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .notification-content i {
    font-size: 18px;
  }
`;
document.head.appendChild(notificationStyles);

// Initialize carousel animation
document.addEventListener("DOMContentLoaded", () => {
  // The carousel animation is handled by CSS
  // This is just for initialization if needed

  // Add some interactive elements to the carousel
  const carouselItems = document.querySelectorAll(".carousel-item");

  carouselItems.forEach((item) => {
    item.addEventListener("click", () => {
      const productName = item.querySelector(".hot-phone-info h3").textContent;
      showNotification(`Đã chọn: ${productName}`, "info");
    });
  });
});

// Simulate user login state (for demo purposes)
const loginLink = document.getElementById("login-link");
const registerLink = document.getElementById("register-link");
const logoutLink = document.getElementById("logout-link");

// Check if user is logged in (for demo, we'll use localStorage)
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

if (isLoggedIn) {
  loginLink.style.display = "none";
  registerLink.style.display = "none";
  logoutLink.style.display = "inline-block";
} else {
  loginLink.style.display = "inline-block";
  registerLink.style.display = "inline-block";
  logoutLink.style.display = "none";
}

// Logout functionality
logoutLink.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("isLoggedIn", "false");
  loginLink.style.display = "inline-block";
  registerLink.style.display = "inline-block";
  logoutLink.style.display = "none";
  showNotification("Đã đăng xuất!", "info");
});

// Login simulation (for demo)
loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("isLoggedIn", "true");
  loginLink.style.display = "none";
  registerLink.style.display = "none";
  logoutLink.style.display = "inline-block";
  showNotification("Đã đăng nhập!", "success");
});

// Register simulation (for demo)
registerLink.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("isLoggedIn", "true");
  loginLink.style.display = "none";
  registerLink.style.display = "none";
  logoutLink.style.display = "inline-block";
  showNotification("Đã đăng ký và đăng nhập!", "success");
});
