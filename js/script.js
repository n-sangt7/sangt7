// Slider functionality
document.addEventListener("DOMContentLoaded", function () {
  // Slider elements
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentSlide = 0;
  let slideInterval;

  // Initialize slider
  function initSlider() {
    // Show first slide
    showSlide(currentSlide);

    // Start auto slide
    startAutoSlide();

    // Add event listeners
    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    // Add click events to dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => goToSlide(index));
    });

    // Pause auto slide on hover
    const sliderContainer = document.querySelector(".slider-container");
    sliderContainer.addEventListener("mouseenter", pauseAutoSlide);
    sliderContainer.addEventListener("mouseleave", startAutoSlide);
  }

  // Show specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Show current slide
    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;
  }

  // Go to next slide
  function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slides.length) {
      nextIndex = 0;
    }
    showSlide(nextIndex);
  }

  // Go to previous slide
  function prevSlide() {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
      prevIndex = slides.length - 1;
    }
    showSlide(prevIndex);
  }

  // Go to specific slide
  function goToSlide(index) {
    showSlide(index);
  }

  // Start auto slide
  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  // Pause auto slide
  function pauseAutoSlide() {
    clearInterval(slideInterval);
  }

  // Initialize countdown timer
  function initCountdown() {
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    // Set countdown to 24 hours from now
    let countdownDate = new Date();
    countdownDate.setHours(countdownDate.getHours() + 24);

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance < 0) {
        // Countdown finished
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        return;
      }

      // Calculate time units
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update display
      hoursElement.textContent = hours.toString().padStart(2, "0");
      minutesElement.textContent = minutes.toString().padStart(2, "0");
      secondsElement.textContent = seconds.toString().padStart(2, "0");
    }

    // Update countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // Add to cart functionality
  function initAddToCart() {
    const addToCartButtons = document.querySelectorAll(".btn-add-cart");
    const cartCount = document.querySelector(".cart-count");

    addToCartButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Get current count
        let currentCount = parseInt(cartCount.textContent);
        // Increment count
        currentCount++;
        // Update display
        cartCount.textContent = currentCount;

        // Add animation effect
        cartCount.classList.add("pulse");
        setTimeout(() => {
          cartCount.classList.remove("pulse");
        }, 500);

        // Show confirmation message
        const productName =
          this.closest(".product-card").querySelector(
            ".product-name"
          ).textContent;
        showNotification(`Đã thêm ${productName} vào giỏ hàng`);
      });
    });
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

          // Show confirmation message
          const productName =
            this.closest(".product-card").querySelector(
              ".product-name"
            ).textContent;
          showNotification(`Đã thêm ${productName} vào yêu thích`);
        } else {
          icon.classList.remove("fas");
          icon.classList.add("far");
          icon.style.color = "";
        }
      });
    });
  }

  // Show notification
  function showNotification(message) {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;

    // Style notification
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: var(--primary);
      color: white;
      padding: 15px 20px;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Initialize all functionality
  initSlider();
  initCountdown();
  initAddToCart();
  initWishlist();

  // Add CSS for pulse animation
  const style = document.createElement("style");
  style.textContent = `
    .pulse {
      animation: pulse 0.5s ease;
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.3); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
});
