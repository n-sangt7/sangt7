// Book data
const books = [
  {
    id: 1,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    category: "van-hoc",
    price: 79000,
    originalPrice: 99000,
    image:
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235235245.jpg",
    specs: [
      "Thể loại: Tiểu thuyết",
      "Số trang: 208",
      "Nhà xuất bản: Nhã Nam",
      "Năm xuất bản: 2023",
      "Tình trạng: Còn hàng",
    ],
  },
  {
    id: 2,
    title: "Tư Duy Nhà Đầu Tư Thông Minh",
    author: "Benjamin Graham",
    category: "kinh-te",
    price: 149000,
    originalPrice: 179000,
    image:
      "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg",
    specs: [
      "Thể loại: Kinh tế - Đầu tư",
      "Số trang: 320",
      "Nhà xuất bản: Trẻ",
      "Năm xuất bản: 2023",
      "Tình trạng: Còn hàng",
    ],
  },
  {
    id: 3,
    title: "Lược Sử Thời Gian",
    author: "Stephen Hawking",
    category: "khoa-hoc",
    price: 120000,
    originalPrice: 150000,
    image:
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8936066694416.jpg",
    specs: [
      "Thể loại: Khoa học",
      "Số trang: 256",
      "Nhà xuất bản: Trí Thức",
      "Năm xuất bản: 2023",
      "Tình trạng: Còn hàng",
    ],
  },
  {
    id: 4,
    title: "Harry Potter Và Hòn Đá Phù Thủy",
    author: "J.K. Rowling",
    category: "thieu-nhi",
    price: 89000,
    originalPrice: 110000,
    image:
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8935212355578.jpg",
    specs: [
      "Thể loại: Thiếu nhi - Giả tưởng",
      "Số trang: 352",
      "Nhà xuất bản: Trẻ",
      "Năm xuất bản: 2023",
      "Tình trạng: Còn hàng",
    ],
  },
  {
    id: 5,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    category: "tam-ly",
    price: 75000,
    originalPrice: 95000,
    image:
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235235245.jpg",
    specs: [
      "Thể loại: Tâm lý - Kỹ năng",
      "Số trang: 320",
      "Nhà xuất bản: Tổng hợp TP.HCM",
      "Năm xuất bản: 2023",
      "Tình trạng: Còn hàng",
    ],
  },
];

// DOM Elements
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const categorySections = document.querySelectorAll(".category-section");
const modalOverlay = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const detailButtons = document.querySelectorAll(".btn-details");
const wishlistButtons = document.querySelectorAll(".btn-wishlist");
const cartCount = document.querySelector(".cart-count");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

// Initialize cart count
let cartItems = 0;

// Filter functionality
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Show/hide categories
    if (category === "all") {
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
    }

    // Scroll to products
    document
      .querySelector(".book-products")
      .scrollIntoView({ behavior: "smooth" });
  });
});

// Product detail modal
detailButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const productId = parseInt(e.target.dataset.id);
    const book = books.find((b) => b.id === productId);

    if (book) {
      showProductModal(book);
    }
  });
});

function showProductModal(book) {
  // Set modal content
  document.getElementById("modalImage").src = book.image;
  document.getElementById("modalImage").alt = book.title;
  document.getElementById("modalTitle").textContent = book.title;
  document.getElementById("modalAuthor").textContent = book.author;
  document.getElementById("modalCurrentPrice").textContent = formatPrice(
    book.price
  );
  document.getElementById("modalOriginalPrice").textContent = formatPrice(
    book.originalPrice
  );

  // Clear and populate specs
  const specsList = document.getElementById("modalSpecs");
  specsList.innerHTML = "";
  book.specs.forEach((spec) => {
    const li = document.createElement("li");
    li.textContent = spec;
    specsList.appendChild(li);
  });

  // Show modal
  modalOverlay.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// Close modal
modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

function closeModal() {
  modalOverlay.style.display = "none";
  document.body.style.overflow = "auto";
}

// Wishlist functionality
wishlistButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const heartIcon = button.querySelector("i");

    if (heartIcon.classList.contains("far")) {
      heartIcon.classList.remove("far");
      heartIcon.classList.add("fas");
      heartIcon.style.color = "#e74c3c";
      showNotification("Đã thêm vào danh sách yêu thích!");
    } else {
      heartIcon.classList.remove("fas");
      heartIcon.classList.add("far");
      heartIcon.style.color = "";
      showNotification("Đã xóa khỏi danh sách yêu thích!");
    }
  });
});

// Add to cart functionality
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-buy")) {
    cartItems++;
    updateCartCount();
    showNotification("Đã thêm vào giỏ hàng!");
  }
});

function updateCartCount() {
  cartCount.textContent = cartItems;
  if (cartItems > 0) {
    cartCount.style.display = "flex";
  } else {
    cartCount.style.display = "none";
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
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm === "") {
    showNotification("Vui lòng nhập từ khóa tìm kiếm!");
    return;
  }

  // Show all categories first
  filterButtons.forEach((btn) => {
    if (btn.dataset.category === "all") {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  categorySections.forEach((section) => {
    section.style.display = "block";
  });

  // Filter products
  let foundResults = false;
  productCards.forEach((card) => {
    const productName = card
      .querySelector(".product-name")
      .textContent.toLowerCase();
    const productAuthor = card
      .querySelector(".product-author")
      .textContent.toLowerCase();

    if (
      productName.includes(searchTerm) ||
      productAuthor.includes(searchTerm)
    ) {
      card.style.display = "block";
      foundResults = true;
    } else {
      card.style.display = "none";
    }
  });

  // Show message if no results found
  if (!foundResults) {
    showNotification("Không tìm thấy sách phù hợp với từ khóa: " + searchTerm);
  } else {
    document
      .querySelector(".book-products")
      .scrollIntoView({ behavior: "smooth" });
  }
}

// Utility functions
function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--accent);
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1001;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
    font-weight: 500;
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  // Add animation to product cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe product cards
  productCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });

  // Add hover effects to category titles
  const categoryTitles = document.querySelectorAll(".category-title");
  categoryTitles.forEach((title) => {
    title.addEventListener("mouseenter", () => {
      title.style.color = "var(--primary)";
      title.style.transition = "color 0.3s ease";
    });

    title.addEventListener("mouseleave", () => {
      title.style.color = "var(--dark)";
    });
  });
});

// Enhanced search with debounce
let searchTimeout;
searchInput.addEventListener("input", (e) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    if (e.target.value.length > 2) {
      performSearch();
    }
  }, 500);
});

// Keyboard navigation for modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalOverlay.style.display === "flex") {
    closeModal();
  }
});

// Add loading animation for images
const productImages = document.querySelectorAll(".product-image img");
productImages.forEach((img) => {
  img.addEventListener("load", function () {
    this.style.opacity = "1";
  });

  img.style.opacity = "0";
  img.style.transition = "opacity 0.3s ease";
});
