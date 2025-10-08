// Slider functionality
class Slider {
  constructor() {
    this.slides = document.querySelectorAll(".slide");
    this.dots = document.querySelectorAll(".dot");
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.currentSlide = 0;
    this.slideInterval = null;
    this.slideDuration = 5000; // 5 seconds

    this.init();
  }

  init() {
    // Event listeners
    this.prevBtn.addEventListener("click", () => this.prevSlide());
    this.nextBtn.addEventListener("click", () => this.nextSlide());

    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index));
    });

    // Start auto slide
    this.startAutoSlide();

    // Pause auto slide on hover
    const sliderContainer = document.querySelector(".slider-container");
    sliderContainer.addEventListener("mouseenter", () => this.stopAutoSlide());
    sliderContainer.addEventListener("mouseleave", () => this.startAutoSlide());
  }

  showSlide(index) {
    // Hide all slides
    this.slides.forEach((slide) => slide.classList.remove("active"));
    this.dots.forEach((dot) => dot.classList.remove("active"));

    // Show current slide
    this.slides[index].classList.add("active");
    this.dots[index].classList.add("active");
    this.currentSlide = index;
  }

  nextSlide() {
    let nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(nextIndex);
  }

  prevSlide() {
    let prevIndex =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prevIndex);
  }

  goToSlide(index) {
    this.showSlide(index);
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.slideInterval = setInterval(
      () => this.nextSlide(),
      this.slideDuration
    );
  }

  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }
}

// Countdown Timer
class CountdownTimer {
  constructor() {
    this.daysElement = document.getElementById("days");
    this.hoursElement = document.getElementById("hours");
    this.minutesElement = document.getElementById("minutes");
    this.secondsElement = document.getElementById("seconds");

    // Set end date (10 days from now)
    this.endDate = new Date();
    this.endDate.setDate(this.endDate.getDate() + 10);

    this.init();
  }

  init() {
    this.updateTimer();
    setInterval(() => this.updateTimer(), 1000);
  }

  updateTimer() {
    const now = new Date().getTime();
    const distance = this.endDate - now;

    if (distance < 0) {
      // Timer expired
      this.daysElement.textContent = "00";
      this.hoursElement.textContent = "00";
      this.minutesElement.textContent = "00";
      this.secondsElement.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.daysElement.textContent = this.padZero(days);
    this.hoursElement.textContent = this.padZero(hours);
    this.minutesElement.textContent = this.padZero(minutes);
    this.secondsElement.textContent = this.padZero(seconds);
  }

  padZero(num) {
    return num < 10 ? "0" + num : num;
  }
}

// Cart Management
class CartManager {
  constructor() {
    this.cartCount = document.querySelector(".cart-count");
    this.cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    this.updateCartCount();

    this.init();
  }

  init() {
    // Add to cart buttons
    document.querySelectorAll(".btn-add-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productCard = e.target.closest(".product-card");
        this.addToCart(productCard);
      });
    });

    // Wishlist buttons
    document.querySelectorAll(".btn-wishlist").forEach((button) => {
      button.addEventListener("click", (e) => {
        this.toggleWishlist(e.target);
      });
    });
  }

  addToCart(productCard) {
    const productName = productCard.querySelector(".product-name").textContent;
    const productPrice =
      productCard.querySelector(".current-price").textContent;
    const productImage = productCard.querySelector("img").src;

    const product = {
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1,
    };

    this.cartItems.push(product);
    this.saveCart();
    this.updateCartCount();
    this.showAddToCartAnimation(productCard);
  }

  toggleWishlist(button) {
    const icon = button.querySelector("i");
    if (icon.classList.contains("far")) {
      icon.classList.remove("far");
      icon.classList.add("fas");
      icon.style.color = "#cd853f";
      this.showNotification("Đã thêm vào yêu thích");
    } else {
      icon.classList.remove("fas");
      icon.classList.add("far");
      icon.style.color = "";
      this.showNotification("Đã xóa khỏi yêu thích");
    }
  }

  updateCartCount() {
    this.cartCount.textContent = this.cartItems.length;
  }

  saveCart() {
    localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
  }

  showAddToCartAnimation(productCard) {
    const button = productCard.querySelector(".btn-add-cart");
    const originalText = button.textContent;

    button.textContent = "Đã thêm!";
    button.style.backgroundColor = "#8fbc8f";

    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = "";
    }, 2000);

    this.showNotification("Đã thêm vào giỏ hàng");
  }

  showNotification(message) {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #8b4513;
      color: white;
      padding: 15px 20px;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
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
}

// Search functionality
class SearchManager {
  constructor() {
    this.searchInput = document.querySelector(".search-input");
    this.searchBtn = document.querySelector(".search-btn");

    this.init();
  }

  init() {
    this.searchBtn.addEventListener("click", () => this.performSearch());
    this.searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.performSearch();
      }
    });
  }

  performSearch() {
    const query = this.searchInput.value.trim();
    if (query) {
      // Simulate search - in real app, this would redirect to search results page
      this.showNotification(`Đang tìm kiếm: "${query}"`);
    }
  }

  showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #8b4513;
      color: white;
      padding: 15px 20px;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
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
}

// User Authentication Simulation
class AuthManager {
  constructor() {
    this.loginLink = document.getElementById("login-link");
    this.registerLink = document.getElementById("register-link");
    this.logoutLink = document.getElementById("logout-link");
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    this.init();
  }

  init() {
    this.updateAuthUI();

    this.loginLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.simulateLogin();
    });

    this.registerLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.simulateRegister();
    });

    this.logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      this.logout();
    });
  }

  simulateLogin() {
    this.isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "true");
    this.updateAuthUI();
    this.showNotification("Đăng nhập thành công!");
  }

  simulateRegister() {
    this.showNotification("Chuyển hướng đến trang đăng ký...");
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.setItem("isLoggedIn", "false");
    this.updateAuthUI();
    this.showNotification("Đã đăng xuất!");
  }

  updateAuthUI() {
    if (this.isLoggedIn) {
      this.loginLink.style.display = "none";
      this.registerLink.style.display = "none";
      this.logoutLink.style.display = "block";
    } else {
      this.loginLink.style.display = "block";
      this.registerLink.style.display = "block";
      this.logoutLink.style.display = "none";
    }
  }

  showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #8b4513;
      color: white;
      padding: 15px 20px;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
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
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
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
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize components
  new Slider();
  new CountdownTimer();
  new CartManager();
  new SearchManager();
  new AuthManager();

  // Initialize smooth scrolling
  initSmoothScrolling();

  // Add loading animation
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);

  // Add scroll effect to header
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.style.background = "var(--nav-gradient)";
      header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
    } else {
      header.style.background = "var(--nav-gradient)";
      header.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    }
  });
});

// Add some interactive effects
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effects to product cards
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Add click effect to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
      `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple effect
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});
