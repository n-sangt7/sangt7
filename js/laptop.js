// Laptop page functionality - Using ProductManager from public.js
document.addEventListener("DOMContentLoaded", function () {
  console.log('💻 Laptop page initialized');
  
  // Khởi tạo ProductManager cho trang laptop
  window.laptopProductManager = new ProductManager(
    'LT', // Category type for laptops
    '../php/get_categories.php', 
    '../php/get_products.php'
  );
  
  // Initialize slider
  initSlider();
  
  console.log('📦 Laptop ProductManager initialized:', window.laptopProductManager);
  console.log('🔗 Available managers:', {
    authManager: !!window.authManager,
    cartManager: !!window.cartManager,
    laptopProductManager: !!window.laptopProductManager
  });
  
  // Debug manager availability
  debugManagers();
});

// Keep existing slider functionality
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

// Debug function to check manager availability
function debugManagers() {
  console.log('🔍 Manager Status Check:');
  console.log('- window.authManager:', window.authManager ? '✅ Available' : '❌ Missing');
  console.log('- window.cartManager:', window.cartManager ? '✅ Available' : '❌ Missing');
  console.log('- window.laptopProductManager:', window.laptopProductManager ? '✅ Available' : '❌ Missing');
  
  if (window.laptopProductManager) {
    console.log('💻 Laptop ProductManager details:', {
      categoryType: window.laptopProductManager.categoryType,
      categoryApi: window.laptopProductManager.categoryApi,
      productApi: window.laptopProductManager.productApi
    });
  }
}

// Add global closeModal function for compatibility
function closeModal() {
  const modal = document.getElementById("productModal");
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Add global showNotification function for compatibility
function showNotification(message, type = 'success') {
  if (window.cartManager && window.cartManager.showNotification) {
    window.cartManager.showNotification(message, type);
  } else if (window.authManager && window.authManager.showNotification) {
    window.authManager.showNotification(message, type);
  } else {
    // Fallback notification
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#28a745' : '#dc3545'};
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
    
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);
    
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }
}