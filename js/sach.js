// Product data
const sachProducts = {
  1: {
    title: "Tác Phẩm Văn Học Kinh Điển",
    image: "#",
    currentPrice: "120.000₫",
    originalPrice: "150.000₫",
    specs: [
      "Tác giả: Nhiều tác giả",
      "Nhà xuất bản: Văn Học",
      "Năm xuất bản: 2024",
      "Số trang: 320",
      "Ngôn ngữ: Tiếng Việt",
      "Tình trạng: Mới 100%",
      "Bảo hành: 12 tháng",
    ],
  },
  2: {
    title: "Tiểu Thuyết Đương Đại",
    image: "#",
    currentPrice: "95.000₫",
    originalPrice: "120.000₫",
    specs: [
      "Tác giả: Nguyễn Văn A",
      "Nhà xuất bản: Trẻ",
      "Năm xuất bản: 2024",
      "Số trang: 280",
      "Ngôn ngữ: Tiếng Việt",
      "Tình trạng: Mới 100%",
      "Bảo hành: 12 tháng",
    ],
  },
  3: {
    title: "Tuyển Tập Truyện Ngắn",
    image: "#",
    currentPrice: "85.000₫",
    originalPrice: "100.000₫",
    specs: [
      "Tác giả: Trần Thị B",
      "Nhà xuất bản: Phụ Nữ",
      "Năm xuất bản: 2024",
      "Số trang: 240",
      "Ngôn ngữ: Tiếng Việt",
      "Tình trạng: Mới 100%",
      "Bảo hành: 12 tháng",
    ],
  },
  4: {
    title: "Kinh Tế Học Cơ Bản",
    image: "#",
    currentPrice: "135.000₫",
    originalPrice: "160.000₫",
    specs: [
      "Tác giả: GS. Lê Văn C",
      "Nhà xuất bản: Kinh Tế",
      "Năm xuất bản: 2024",
      "Số trang: 380",
      "Ngôn ngữ: Tiếng Việt",
      "Tình trạng: Mới 100%",
      "Bảo hành: 12 tháng",
    ],
  },
  5: {
    title: "Đầu Tư Thông Minh",
    image: "#",
    currentPrice: "110.000₫",
    originalPrice: "130.000₫",
    specs: [
      "Tác giả: David Johnson",
      "Nhà xuất bản: Tài Chính",
      "Năm xuất bản: 2024",
      "Số trang: 320",
      "Ngôn ngữ: Tiếng Việt",
      "Tình trạng: Mới 100%",
      "Bảo hành: 12 tháng",
    ],
  },
  6: {
    title: "Quản Trị Doanh Nghiệp",
    image: "#",
    currentPrice: "125.000₫",
    originalPrice: "145.000₫",
    specs: [
      "Tác giả: Michael Chen",
      "Nhà xuất bản: Kinh Doanh",
      "Năm xuất bản: 2024",
      "Số trang: 350",
      "Ngôn ngữ: Tiếng Việt",
      "Tình trạng: Mới 100%",
      "Bảo hành: 12 tháng",
    ],
  },
  7: {
    title: "Vũ Trụ Quanh Ta",
    image: "#",
    currentPrice: "140.000₫",
    originalPrice: "165.000₫",
    specs: [
      "Tác giả: Neil deGrasse Tyson",
      "Nhà xuất bản: Khoa Học",
      "Năm xuất bản: 2024",
      "Số trang: 400",
      "Ngôn ngữ: Tiếng Việt",
      "Tình trạng: Mới 100%",
      "Bảo hành: 12 tháng",
    ],
  },
  8: {
    title: "Công Nghệ Tương Lai",
    image: "#",
    currentPrice: "115.000₫",
    originalPrice: "140.000₫",
    specs: [
      "Tác giả: Elon Musk",
      "Nhà xuất bản: Công Nghệ",
      "Năm xuất bản: 2024",
      "Số trang: 300",
      "Ngôn ngữ: Tiếng Việt",
      "Tình trạng: Mới 100%",
      "Bảo hành: 12 tháng",
    ],
  },
  9: {
    title: "Khám Phá Thiên Nhiên",
    image: "#",
    currentPrice: "95.000₫",
    originalPrice: "115.000₫",
    specs: [
      "Tác giả: David Attenborough",
      "Nhà xuất bản: Thiên Nhiên",
      "Năm xuất bản: 2024",
      "Số trang: 280",
      "Ngôn ngữ: Tiếng Việt",
      "Tình trạng: Mới 100%",
      "Bảo hành: 12 tháng",
    ],
  },
  10: {
    title: "Lịch Sử Việt Nam",
    image: "#",
    currentPrice: "155.000₫",
    originalPrice: "180.000₫",
    specs: [
      "Tác giả: GS. Phan Huy Lê",
      "Nhà xuất bản: Lịch Sử",
      "Năm xuất bản: 2024",
      "Số trang: 450",
      "Ngôn ngữ: Tiếng Việt",
      "Tình trạng: Mới 100%",
      "Bảo hành: 12 tháng",
    ],
  },
  11: {
    title: "Thế Giới Cổ Đại",
    image: "#",
    currentPrice: "130.000₫",
    originalPrice: "155.000₫",
    specs: [
      "Tác giả: Herodotus",
      "Nhà xuất bản: Lịch Sử",
      "Năm xuất bản: 2024",
      "Số trang: 380",
      "Ngôn ngữ: Tiếng Việt",
      "Tình trạng: Mới 100%",
      "Bảo hành: 12 tháng",
    ],
  },
  12: {
    title: "Nhân Vật Lịch Sử",
    image: "#",
    currentPrice: "105.000₫",
    originalPrice: "125.000₫",
    specs: [
      "Tác giả: Nhiều tác giả",
      "Nhà xuất bản: Lịch Sử",
      "Năm xuất bản: 2024",
      "Số trang: 320",
      "Ngôn ngữ: Tiếng Việt",
      "Tình trạng: Mới 100%",
      "Bảo hành: 12 tháng",
    ],
  },
  13: {
    title: "Truyện Cổ Tích",
    image: "#",
    currentPrice: "75.000₫",
    originalPrice: "90.000₫",
    specs: [
      "Tác giả: Anh em Grimm",
      "Nhà xuất bản: Thiếu Nhi",
      "Năm xuất bản: 2024",
      "Số trang: 200",
      "Ngôn ngữ: Tiếng Việt",
      "Tình trạng: Mới 100%",
      "Bảo hành: 12 tháng",
    ],
  },
  14: {
    title: "Khám Phá Khoa Học",
    image: "#",
    currentPrice: "85.000₫",
    originalPrice: "100.000₫",
    specs: [
      "Tác giả: Bill Nye",
      "Nhà xuất bản: Thiếu Nhi",
      "Năm xuất bản: 2024",
      "Số trang: 240",
      "Ngôn ngữ: Tiếng Việt",
      "Tình trạng: Mới 100%",
      "Bảo hành: 12 tháng",
    ],
  },
  15: {
    title: "Truyện Tranh",
    image: "#",
    currentPrice: "65.000₫",
    originalPrice: "80.000₫",
    specs: [
      "Tác giả: Nhiều tác giả",
      "Nhà xuất bản: Thiếu Nhi",
      "Năm xuất bản: 2024",
      "Số trang: 160",
      "Ngôn ngữ: Tiếng Việt",
      "Tình trạng: Mới 100%",
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
const filterButtons = document.querySelectorAll(".filter-btn");
const categorySections = document.querySelectorAll(".category-section");
const productCards = document.querySelectorAll(".product-card");
const btnDetails = document.querySelectorAll(".btn-details");
const wishlistButtons = document.querySelectorAll(".btn-wishlist");
const cartCount = document.querySelector(".cart-count");

// Modal functionality
function openModal(productId) {
  const product = sachProducts[productId];
  if (product) {
    modalImage.src = product.image;
    modalImage.alt = product.title;
    modalTitle.textContent = product.title;
    modalCurrentPrice.textContent = product.currentPrice;
    modalOriginalPrice.textContent = product.originalPrice;

    // Clear previous specs
    modalSpecs.innerHTML = "";

    // Add new specs
    product.specs.forEach((spec) => {
      const li = document.createElement("li");
      li.textContent = spec;
      modalSpecs.appendChild(li);
    });

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Filter functionality
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked button
    button.classList.add("active");

    const category = button.getAttribute("data-category");

    // Show/hide category sections
    categorySections.forEach((section) => {
      if (category === "all" || section.id === category) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });

    // Smooth scroll to top of products
    document.querySelector(".sach-products").scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Wishlist functionality
wishlistButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const icon = button.querySelector("i");

    if (icon.classList.contains("far")) {
      icon.classList.remove("far");
      icon.classList.add("fas");
      icon.style.color = "#e74c3c";

      // Show notification
      showNotification("Đã thêm vào danh sách yêu thích!");
    } else {
      icon.classList.remove("fas");
      icon.classList.add("far");
      icon.style.color = "";

      // Show notification
      showNotification("Đã xóa khỏi danh sách yêu thích!");
    }
  });
});

// Add to cart functionality
function addToCart() {
  let count = parseInt(cartCount.textContent);
  count++;
  cartCount.textContent = count;

  // Show notification
  showNotification("Đã thêm vào giỏ hàng!");

  // Add animation to cart icon
  const cartIcon = document.querySelector(".fa-shopping-cart").parentElement;
  cartIcon.style.transform = "scale(1.2)";
  setTimeout(() => {
    cartIcon.style.transform = "scale(1)";
  }, 300);
}

// Notification system
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--gradient);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(139, 69, 19, 0.3);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 600;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Event Listeners
modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

btnDetails.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const productId = button.getAttribute("data-id");
    openModal(productId);
  });
});

// Add click event to product cards for modal
productCards.forEach((card) => {
  card.addEventListener("click", () => {
    const button = card.querySelector(".btn-details");
    const productId = button.getAttribute("data-id");
    openModal(productId);
  });
});

// Buy buttons in modal
document.querySelectorAll(".modal-actions .btn").forEach((button) => {
  button.addEventListener("click", () => {
    addToCart();
    closeModal();
  });
});

// Search functionality
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

function performSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm) {
    let found = false;

    productCards.forEach((card) => {
      const productName = card
        .querySelector(".product-name")
        .textContent.toLowerCase();

      if (productName.includes(searchTerm)) {
        card.style.display = "block";
        found = true;

        // Highlight matching text
        const nameElement = card.querySelector(".product-name");
        const originalText = nameElement.textContent;
        const regex = new RegExp(`(${searchTerm})`, "gi");
        nameElement.innerHTML = originalText.replace(regex, "<mark>$1</mark>");
      } else {
        card.style.display = "none";
      }
    });

    if (!found) {
      showNotification("Không tìm thấy sách phù hợp!");
    } else {
      // Scroll to first matching product
      const firstVisible = document.querySelector(
        '.product-card[style="display: block"]'
      );
      if (firstVisible) {
        firstVisible.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  } else {
    // Show all products if search is empty
    productCards.forEach((card) => {
      card.style.display = "block";
      // Remove highlighting
      const nameElement = card.querySelector(".product-name");
      nameElement.innerHTML = nameElement.textContent;
    });
  }
}

searchBtn.addEventListener("click", performSearch);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    performSearch();
  }
});

// User authentication state
function checkAuthState() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutLink = document.getElementById("logout-link");

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
const logoutLink = document.getElementById("logout-link");
if (logoutLink) {
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    checkAuthState();
    showNotification("Đã đăng xuất thành công!");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  });
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  checkAuthState();

  // Add loading animation
  const productGrids = document.querySelectorAll(".product-grid");
  productGrids.forEach((grid) => {
    grid.style.opacity = "0";
    grid.style.transform = "translateY(20px)";

    setTimeout(() => {
      grid.style.transition = "all 0.5s ease";
      grid.style.opacity = "1";
      grid.style.transform = "translateY(0)";
    }, 200);
  });

  // Initialize cart count
  const savedCartCount = localStorage.getItem("cartCount");
  if (savedCartCount) {
    cartCount.textContent = savedCartCount;
  }
});

// Save cart count when changed
const observer = new MutationObserver(() => {
  localStorage.setItem("cartCount", cartCount.textContent);
});

observer.observe(cartCount, {
  childList: true,
  characterData: true,
  subtree: true,
});

// Add some interactive effects
document.addEventListener("mousemove", (e) => {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
      card.style.transform = `perspective(1000px) rotateX(${
        (y - rect.height / 2) / 20
      }deg) rotateY(${(x - rect.width / 2) / 20}deg) translateY(-10px)`;
    } else {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    }
  });
});

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
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
