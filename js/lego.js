// Lego Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Product data
  const products = {
    1: {
      title: "Millennium Falcon 75192",
      image:
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      currentPrice: "12.990.000₫",
      originalPrice: "14.990.000₫",
      pieces: "7,541 miếng",
      age: "18+",
      dimensions: "84cm x 56cm x 21cm",
      specs: [
        "Bộ Lego Star Wars lớn nhất từ trước đến nay",
        "Tỉ lệ: 1:1 với phi thuyền trong phim",
        "Có đầy đủ chi tiết bên trong",
        "Kèm theo 8 nhân vật độc quyền",
        "Hướng dẫn lắp ráp chi tiết 300 trang",
      ],
    },
    2: {
      title: "Imperial Star Destroyer 75252",
      image:
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      currentPrice: "8.990.000₫",
      originalPrice: "9.990.000₫",
      pieces: "4,784 miếng",
      age: "16+",
      dimensions: "110cm x 66cm x 42cm",
      specs: [
        "Tái hiện chi tiết tàu Imperial Star Destroyer",
        "Kích thước ấn tượng với chiều dài hơn 1m",
        "Kết cấu chắc chắn với khung kim loại",
        "Kèm theo stand trưng bày",
        "Perfect for display and collection",
      ],
    },
    3: {
      title: "AT-AT 75288",
      image:
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      currentPrice: "4.990.000₫",
      originalPrice: "5.490.000₫",
      pieces: "1,267 miếng",
      age: "9+",
      dimensions: "40cm x 24cm x 55cm",
      specs: [
        "AT-AT Walker với khả năng di chuyển",
        "Có thể chứa đến 5 mini figures",
        "Chân có khớp di chuyển linh hoạt",
        "Kèm theo snowspeeder và cable",
        "Phù hợp cho trẻ em và người lớn",
      ],
    },
    4: {
      title: "Lamborghini Sian 42115",
      image:
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      currentPrice: "7.990.000₫",
      originalPrice: "8.490.000₫",
      pieces: "3,696 miếng",
      age: "18+",
      dimensions: "60cm x 25cm x 13cm",
      specs: [
        "Mô hình Lamborghini Sian FKP 37",
        "Hộp số 8 tốc độ với bánh răng",
        "Hệ thống treo và lái hoạt động",
        "Cửa mở theo kiểu cánh bướm",
        "Màu xanh lá độc quyền của Lamborghini",
      ],
    },
    5: {
      title: "Porsche 911 RSR 42096",
      image:
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      currentPrice: "3.990.000₫",
      originalPrice: "4.490.000₫",
      pieces: "1,580 miếng",
      age: "10+",
      dimensions: "50cm x 20cm x 13cm",
      specs: [
        "Porsche 911 RSR đua endurance",
        "Động cơ boxer 6 xi-lanh",
        "Hệ thống treo độc lập",
        "Bánh xe có phanh đĩa",
        "Màu sắc chính hãng từ Porsche",
      ],
    },
  };

  // Modal elements
  const modal = document.getElementById("productModal");
  const modalClose = document.getElementById("modalClose");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalCurrentPrice = document.getElementById("modalCurrentPrice");
  const modalOriginalPrice = document.getElementById("modalOriginalPrice");
  const modalPieces = document.getElementById("modalPieces");
  const modalAge = document.getElementById("modalAge");
  const modalDimensions = document.getElementById("modalDimensions");
  const modalSpecs = document.getElementById("modalSpecs");

  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");
  const categorySections = document.querySelectorAll(".category-section");

  // Wishlist functionality
  const wishlistButtons = document.querySelectorAll(".btn-wishlist");

  // Filter products by category
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-category");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Show/hide products based on category
      if (category === "all") {
        productCards.forEach((card) => {
          card.style.display = "block";
        });
        categorySections.forEach((section) => {
          section.style.display = "block";
        });
      } else {
        categorySections.forEach((section) => {
          if (section.id === category) {
            section.style.display = "block";
          } else {
            section.style.display = "none";
          }
        });

        productCards.forEach((card) => {
          if (card.getAttribute("data-category") === category) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      }
    });
  });

  // Product detail modal
  document.querySelectorAll(".btn-details").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      const product = products[productId];

      if (product) {
        modalImage.src = product.image;
        modalImage.alt = product.title;
        modalTitle.textContent = product.title;
        modalCurrentPrice.textContent = product.currentPrice;
        modalOriginalPrice.textContent = product.originalPrice;
        modalPieces.textContent = product.pieces;
        modalAge.textContent = product.age;
        modalDimensions.textContent = product.dimensions;

        // Clear previous specs
        modalSpecs.innerHTML = "";

        // Add new specs
        product.specs.forEach((spec) => {
          const li = document.createElement("li");
          li.textContent = spec;
          modalSpecs.appendChild(li);
        });

        // Show modal
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Close modal
  modalClose.addEventListener("click", closeModal);

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Wishlist functionality
  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const heartIcon = this.querySelector("i");

      if (heartIcon.classList.contains("far")) {
        heartIcon.classList.remove("far");
        heartIcon.classList.add("fas");
        heartIcon.style.color = "#daa520";

        // Show notification
        showNotification("Đã thêm vào danh sách yêu thích!");
      } else {
        heartIcon.classList.remove("fas");
        heartIcon.classList.add("far");
        heartIcon.style.color = "";

        // Show notification
        showNotification("Đã xóa khỏi danh sách yêu thích!");
      }
    });
  });

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
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm) {
      // Filter products based on search term
      let found = false;

      productCards.forEach((card) => {
        const productName = card
          .querySelector(".product-name")
          .textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
          card.style.display = "block";
          found = true;
        } else {
          card.style.display = "none";
        }
      });

      // Show notification
      if (found) {
        showNotification(`Tìm thấy sản phẩm với từ khóa: "${searchTerm}"`);
      } else {
        showNotification(
          `Không tìm thấy sản phẩm với từ khóa: "${searchTerm}"`
        );
      }
    } else {
      // Show all products if search is empty
      productCards.forEach((card) => {
        card.style.display = "block";
      });
      showNotification("Hiển thị tất cả sản phẩm");
    }
  }

  // Notification function
  function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: var(--shadow);
            z-index: 3000;
            transition: var(--transition);
        `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(100px)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll(".btn-buy");
  const cartCount = document.querySelector(".cart-count");
  let cartItems = 0;

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      cartItems++;
      cartCount.textContent = cartItems;

      // Show notification
      showNotification("Đã thêm vào giỏ hàng!");

      // Add animation to cart icon
      const cartIcon = document.querySelector(".fa-shopping-cart").parentNode;
      cartIcon.style.transform = "scale(1.2)";
      setTimeout(() => {
        cartIcon.style.transform = "scale(1)";
      }, 300);
    });
  });

  // Slider functionality
  const sliderTrack = document.querySelector(".slider-track");
  const sliderItems = document.querySelectorAll(".slider-item");

  // Clone first few items for infinite loop
  sliderItems.forEach((item) => {
    const clone = item.cloneNode(true);
    sliderTrack.appendChild(clone);
  });

  // Pause slider on hover
  sliderTrack.addEventListener("mouseenter", () => {
    sliderTrack.style.animationPlayState = "paused";
  });

  sliderTrack.addEventListener("mouseleave", () => {
    sliderTrack.style.animationPlayState = "running";
  });

  // Authentication state management
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutLink = document.getElementById("logout-link");

  // Check if user is logged in (you can replace this with actual authentication logic)
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

  // Logout functionality
  logoutLink.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "false");
    window.location.reload();
  });

  // Smooth scrolling for anchor links
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

  // Add loading animation
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");
  });

  console.log("Lego page initialized successfully!");
});
