// Laptop page functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize slider
  initSlider();

  // Initialize brand filtering
  initBrandFilter();

  // Initialize product modals
  initProductModals();

  // Initialize wishlist functionality
  initWishlist();

  // Initialize cart functionality
  initCart();
});

// Slider functionality
function initSlider() {
  const sliderTrack = document.querySelector(".slider-track");
  if (!sliderTrack) return;

  const slides = document.querySelectorAll(".slider-item");
  let currentIndex = 0;

  // Auto slide
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }, 5000);

  function updateSlider() {
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
}

// Brand filtering
function initBrandFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const brandSections = document.querySelectorAll(".brand-section");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const brand = this.getAttribute("data-brand");

      // Show/hide brand sections
      brandSections.forEach((section) => {
        if (brand === "all" || section.id === brand) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });

      // Smooth scroll to products
      document.querySelector(".laptop-products").scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// Product modals
function initProductModals() {
  const modal = document.getElementById("productModal");
  const modalClose = document.getElementById("modalClose");
  const detailButtons = document.querySelectorAll(".btn-details");

  // Product data
  const products = {
    1: {
      title: 'MacBook Pro 16" M2 Max',
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      currentPrice: "68.990.000₫",
      originalPrice: "74.990.000₫",
      specs: [
        "Chip Apple M2 Max với 12 nhân CPU, 38 nhân GPU",
        "16-inch Liquid Retina XDR display",
        "32GB unified memory",
        "1TB SSD storage",
        "Thời lượng pin lên đến 22 giờ",
        "Camera 1080p FaceTime HD",
        "6 loa âm thanh không gian",
      ],
    },
    2: {
      title: 'MacBook Air M2 13"',
      image:
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      currentPrice: "32.990.000₫",
      originalPrice: "35.990.000₫",
      specs: [
        "Chip Apple M2 với 8 nhân CPU, 10 nhân GPU",
        "13.6-inch Liquid Retina display",
        "8GB unified memory",
        "512GB SSD storage",
        "Thời lượng pin lên đến 18 giờ",
        "Camera 1080p FaceTime HD",
        "Thiết kế mỏng nhẹ, không quạt",
      ],
    },
    3: {
      title: 'MacBook Pro 14" M2 Pro',
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      currentPrice: "52.990.000₫",
      originalPrice: "56.990.000₫",
      specs: [
        "Chip Apple M2 Pro với 10 nhân CPU, 16 nhân GPU",
        "14.2-inch Liquid Retina XDR display",
        "16GB unified memory",
        "1TB SSD storage",
        "Thời lượng pin lên đến 17 giờ",
        "Camera 1080p FaceTime HD",
        "3 cổng Thunderbolt 4, HDMI, SDXC",
      ],
    },
    4: {
      title: "Dell XPS 13 Plus",
      image:
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      currentPrice: "42.990.000₫",
      originalPrice: "46.990.000₫",
      specs: [
        "Intel Core i7-1260P (12 cores, 16 threads)",
        "13.4-inch FHD+ InfinityEdge Touch Display",
        "16GB LPDDR5 RAM",
        "512GB PCIe NVMe SSD",
        "Intel Iris Xe Graphics",
        "Thời lượng pin lên đến 12 giờ",
        "Thiết kế siêu mỏng với bàn phím cảm ứng",
      ],
    },
    5: {
      title: "Dell Alienware m15 R7",
      image:
        "https://images.unsplash.com/photo-1587614382346-4ec0e7943568?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      currentPrice: "55.990.000₫",
      originalPrice: "59.990.000₫",
      specs: [
        "Intel Core i7-12700H (14 cores, 20 threads)",
        "15.6-inch QHD 240Hz Display",
        "16GB DDR5 RAM",
        "1TB PCIe NVMe SSD",
        "NVIDIA GeForce RTX 3070 Ti 8GB",
        "Thời lượng pin lên đến 6 giờ",
        "Bàn phím cơ Alienware với RGB",
      ],
    },
  };

  // Open modal when detail button is clicked
  detailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      const product = products[productId];

      if (product) {
        document.getElementById("modalImage").src = product.image;
        document.getElementById("modalTitle").textContent = product.title;
        document.getElementById("modalCurrentPrice").textContent =
          product.currentPrice;
        document.getElementById("modalOriginalPrice").textContent =
          product.originalPrice;

        const specsList = document.getElementById("modalSpecs");
        specsList.innerHTML = "";

        product.specs.forEach((spec) => {
          const li = document.createElement("li");
          li.textContent = spec;
          specsList.appendChild(li);
        });

        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Close modal
  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Wishlist functionality
function initWishlist() {
  const wishlistButtons = document.querySelectorAll(".btn-wishlist");

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector("i");

      if (icon.classList.contains("far")) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        icon.style.color = "#e74c3c";

        // Show success message
        showNotification("Đã thêm vào danh sách yêu thích!");
      } else {
        icon.classList.remove("fas");
        icon.classList.add("far");
        icon.style.color = "";

        // Show remove message
        showNotification("Đã xóa khỏi danh sách yêu thích!");
      }
    });
  });
}

// Cart functionality
function initCart() {
  const cartButtons = document.querySelectorAll(".btn-buy");
  const cartCount = document.querySelector(".cart-count");

  cartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let count = parseInt(cartCount.textContent);
      count++;
      cartCount.textContent = count;

      // Show success message
      showNotification("Đã thêm vào giỏ hàng!");
    });
  });
}

// Notification system
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #8b4513, #a0522d);
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

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Search functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");

  if (searchBtn) {
    searchBtn.addEventListener("click", performSearch);
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }

  function performSearch() {
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
      // In a real application, this would send the search to a server
      // For now, we'll just show a notification
      showNotification(`Đang tìm kiếm: "${searchTerm}"`);

      // Simulate filtering products
      filterProductsBySearch(searchTerm);
    }
  }

  function filterProductsBySearch(term) {
    const productCards = document.querySelectorAll(".product-card");
    let found = false;

    productCards.forEach((card) => {
      const productName = card
        .querySelector(".product-name")
        .textContent.toLowerCase();

      if (productName.includes(term.toLowerCase())) {
        card.style.display = "block";
        found = true;

        // Highlight the matching section
        const brandSection = card.closest(".brand-section");
        if (brandSection) {
          brandSection.style.display = "block";
          brandSection.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        card.style.display = "none";
      }
    });

    if (!found) {
      showNotification("Không tìm thấy sản phẩm phù hợp!");
    }
  }
});
