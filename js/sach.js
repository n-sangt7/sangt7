// Dữ liệu sách theo tâm trạng
const moodBooks = {
  vui: [
    "Nhà Giả Kim - Paulo Coelho",
    "Hoàng Tử Bé - Antoine de Saint-Exupéry",
    "Doraemon - Fujiko F. Fujio",
    "Chạng Vạng - Stephenie Meyer",
    "Bố Già - Mario Puzo",
  ],
  buon: [
    "Tiếng Chim Hót Trong Bụi Mận Gai - Colleen McCullough",
    "Cho Tôi Xin Một Vé Đi Tuổi Thơ - Nguyễn Nhật Ánh",
    "Mắt Biếc - Nguyễn Nhật Ánh",
    "Người Tình - Marguerite Duras",
    "Nỗi Buồn Chiến Tranh - Bảo Ninh",
  ],
  langman: [
    "Đồi Gió Hú - Emily Brontë",
    "Chuyện Tình Paris - Guillaume Musso",
    "Một Lít Nước Mắt - Kito Aya",
    "Cô Gái Năm Ấy Chúng Ta Cùng Theo Đuổi - Cửu Bả Đao",
    "Pride and Prejudice - Jane Austen",
  ],
  kitich: [
    "Sherlock Holmes - Arthur Conan Doyle",
    "Mật Mã Da Vinci - Dan Brown",
    "Đảo Giấu Vàng - Robert Louis Stevenson",
    "Bí Mật Của Naoko - Keigo Higashino",
    "Trò Chơi Vương Quyền - George R.R. Martin",
  ],
};

// Dữ liệu chi tiết sản phẩm
const productDetails = {
  1: {
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    currentPrice: "89.000₫",
    originalPrice: "120.000₫",
    image:
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235235245.jpg",
    specs: [
      { label: "Thể loại", value: "Văn học, Triết lý sống" },
      { label: "Nhà xuất bản", value: "Nhà Xuất Bản Văn Học" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "208" },
      { label: "Ngôn ngữ", value: "Tiếng Việt" },
      { label: "Tình trạng", value: "Còn hàng" },
    ],
  },
  2: {
    title: "Tiếng Chim Hót Trong Bụi Mận Gai",
    author: "Colleen McCullough",
    currentPrice: "156.000₫",
    originalPrice: "195.000₫",
    image:
      "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg",
    specs: [
      { label: "Thể loại", value: "Văn học, Tiểu thuyết" },
      { label: "Nhà xuất bản", value: "Nhà Xuất Bản Văn Học" },
      { label: "Năm xuất bản", value: "2022" },
      { label: "Số trang", value: "752" },
      { label: "Ngôn ngữ", value: "Tiếng Việt" },
      { label: "Tình trạng", value: "Còn hàng" },
    ],
  },
  3: {
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    currentPrice: "75.000₫",
    originalPrice: "95.000₫",
    image:
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235235245.jpg",
    specs: [
      { label: "Thể loại", value: "Kỹ năng sống, Tâm lý" },
      { label: "Nhà xuất bản", value: "Nhà Xuất Bản Tổng Hợp" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "320" },
      { label: "Ngôn ngữ", value: "Tiếng Việt" },
      { label: "Tình trạng", value: "Còn hàng" },
    ],
  },
  4: {
    title: "Tư Duy Nhanh và Chậm",
    author: "Daniel Kahneman",
    currentPrice: "185.000₫",
    originalPrice: "220.000₫",
    image:
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235235245.jpg",
    specs: [
      { label: "Thể loại", value: "Kinh tế, Tâm lý học" },
      { label: "Nhà xuất bản", value: "Nhà Xuất Bản Thế Giới" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "612" },
      { label: "Ngôn ngữ", value: "Tiếng Việt" },
      { label: "Tình trạng", value: "Còn hàng" },
    ],
  },
  5: {
    title: "Cha Giàu Cha Nghèo",
    author: "Robert Kiyosaki",
    currentPrice: "95.000₫",
    originalPrice: "120.000₫",
    image:
      "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg",
    specs: [
      { label: "Thể loại", value: "Kinh tế, Đầu tư" },
      { label: "Nhà xuất bản", value: "Nhà Xuất Bản Trẻ" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "336" },
      { label: "Ngôn ngữ", value: "Tiếng Việt" },
      { label: "Tình trạng", value: "Còn hàng" },
    ],
  },
  6: {
    title: "Nghĩ Giàu Làm Giàu",
    author: "Napoleon Hill",
    currentPrice: "78.000₫",
    originalPrice: "99.000₫",
    image:
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235235245.jpg",
    specs: [
      { label: "Thể loại", value: "Kinh tế, Phát triển bản thân" },
      { label: "Nhà xuất bản", value: "Nhà Xuất Bản Tổng Hợp" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "400" },
      { label: "Ngôn ngữ", value: "Tiếng Việt" },
      { label: "Tình trạng", value: "Còn hàng" },
    ],
  },
  7: {
    title: "7 Thói Quen Hiệu Quả",
    author: "Stephen R. Covey",
    currentPrice: "135.000₫",
    originalPrice: "165.000₫",
    image:
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235235245.jpg",
    specs: [
      { label: "Thể loại", value: "Kỹ năng sống, Phát triển bản thân" },
      { label: "Nhà xuất bản", value: "Nhà Xuất Bản Tổng Hợp" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "448" },
      { label: "Ngôn ngữ", value: "Tiếng Việt" },
      { label: "Tình trạng", value: "Còn hàng" },
    ],
  },
  8: {
    title: "Đọc Vị Bất Kỳ Ai",
    author: "David J. Lieberman",
    currentPrice: "88.000₫",
    originalPrice: "110.000₫",
    image:
      "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg",
    specs: [
      { label: "Thể loại", value: "Kỹ năng sống, Tâm lý" },
      { label: "Nhà xuất bản", value: "Nhà Xuất Bản Lao Động" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "224" },
      { label: "Ngôn ngữ", value: "Tiếng Việt" },
      { label: "Tình trạng", value: "Còn hàng" },
    ],
  },
  9: {
    title: "Nghệ Thuật Tinh Tế",
    author: "Mark Manson",
    currentPrice: "115.000₫",
    originalPrice: "145.000₫",
    image:
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235235245.jpg",
    specs: [
      { label: "Thể loại", value: "Kỹ năng sống, Phát triển bản thân" },
      { label: "Nhà xuất bản", value: "Nhà Xuất Bản Trẻ" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "272" },
      { label: "Ngôn ngữ", value: "Tiếng Việt" },
      { label: "Tình trạng", value: "Còn hàng" },
    ],
  },
  10: {
    title: "Harry Potter và Hòn Đá Phù Thủy",
    author: "J.K. Rowling",
    currentPrice: "165.000₫",
    originalPrice: "195.000₫",
    image:
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235235245.jpg",
    specs: [
      { label: "Thể loại", value: "Thiếu nhi, Giả tưởng" },
      { label: "Nhà xuất bản", value: "Nhà Xuất Bản Trẻ" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "336" },
      { label: "Ngôn ngữ", value: "Tiếng Việt" },
      { label: "Tình trạng", value: "Còn hàng" },
    ],
  },
  11: {
    title: "Hoàng Tử Bé",
    author: "Antoine de Saint-Exupéry",
    currentPrice: "65.000₫",
    originalPrice: "85.000₫",
    image:
      "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg",
    specs: [
      { label: "Thể loại", value: "Thiếu nhi, Văn học" },
      { label: "Nhà xuất bản", value: "Nhà Xuất Bản Kim Đồng" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "96" },
      { label: "Ngôn ngữ", value: "Tiếng Việt" },
      { label: "Tình trạng", value: "Còn hàng" },
    ],
  },
  12: {
    title: "Doraemon - Tập 1",
    author: "Fujiko F. Fujio",
    currentPrice: "25.000₫",
    originalPrice: "35.000₫",
    image:
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235235245.jpg",
    specs: [
      { label: "Thể loại", value: "Thiếu nhi, Truyện tranh" },
      { label: "Nhà xuất bản", value: "Nhà Xuất Bản Kim Đồng" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "192" },
      { label: "Ngôn ngữ", value: "Tiếng Việt" },
      { label: "Tình trạng", value: "Còn hàng" },
    ],
  },
  13: {
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    currentPrice: "89.000₫",
    originalPrice: "120.000₫",
    image:
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235235245.jpg",
    specs: [
      { label: "Thể loại", value: "Văn học, Triết lý sống" },
      { label: "Nhà xuất bản", value: "Nhà Xuất Bản Văn Học" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "208" },
      { label: "Ngôn ngữ", value: "Tiếng Việt" },
      { label: "Tình trạng", value: "Còn hàng" },
    ],
  },
  14: {
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    currentPrice: "75.000₫",
    originalPrice: "95.000₫",
    image:
      "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg",
    specs: [
      { label: "Thể loại", value: "Kỹ năng sống, Tâm lý" },
      { label: "Nhà xuất bản", value: "Nhà Xuất Bản Tổng Hợp" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "320" },
      { label: "Ngôn ngữ", value: "Tiếng Việt" },
      { label: "Tình trạng", value: "Còn hàng" },
    ],
  },
  15: {
    title: "Tư Duy Nhanh và Chậm",
    author: "Daniel Kahneman",
    currentPrice: "185.000₫",
    originalPrice: "220.000₫",
    image:
      "https://cdn0.fahasa.com/media/catalog/product/8/9/8935235235245.jpg",
    specs: [
      { label: "Thể loại", value: "Kinh tế, Tâm lý học" },
      { label: "Nhà xuất bản", value: "Nhà Xuất Bản Thế Giới" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "612" },
      { label: "Ngôn ngữ", value: "Tiếng Việt" },
      { label: "Tình trạng", value: "Còn hàng" },
    ],
  },
};

// DOM Elements
const moodCards = document.querySelectorAll(".mood-card");
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const detailButtons = document.querySelectorAll(".btn-details");
const modal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const wishlistButtons = document.querySelectorAll(".btn-wishlist");

// Hiển thị sách theo tâm trạng
function showMoodBooks(mood) {
  // Ẩn tất cả các gợi ý trước
  document.querySelectorAll(".book-suggestions").forEach((el) => {
    el.classList.remove("active");
    el.innerHTML = "";
  });

  // Hiển thị gợi ý cho tâm trạng được chọn
  const suggestions = document.getElementById(`${mood}-suggestions`);
  suggestions.classList.add("active");

  moodBooks[mood].forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.className = "suggestion-item";
    bookElement.textContent = book;
    suggestions.appendChild(bookElement);
  });
}

// Lọc sản phẩm theo danh mục
function filterProducts(category) {
  productCards.forEach((card) => {
    if (category === "all" || card.dataset.category === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  // Hiển thị/ẩn các section danh mục
  document.querySelectorAll(".category-section").forEach((section) => {
    if (category === "all" || section.id === category) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

// Hiển thị modal chi tiết sản phẩm
function showProductDetails(productId) {
  const product = productDetails[productId];
  if (!product) return;

  document.getElementById("modalTitle").textContent = product.title;
  document.getElementById("modalAuthor").textContent = product.author;
  document.getElementById("modalCurrentPrice").textContent =
    product.currentPrice;
  document.getElementById("modalOriginalPrice").textContent =
    product.originalPrice;
  document.getElementById("modalImage").src = product.image;

  const specsList = document.getElementById("modalSpecs");
  specsList.innerHTML = "";

  product.specs.forEach((spec) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="spec-label">${spec.label}:</span> ${spec.value}`;
    specsList.appendChild(li);
  });

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Đóng modal
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Toggle wishlist
function toggleWishlist(button) {
  button.classList.toggle("active");
  button.innerHTML = button.classList.contains("active")
    ? '<i class="fas fa-heart"></i>'
    : '<i class="far fa-heart"></i>';

  // Hiệu ứng thông báo
  if (button.classList.contains("active")) {
    showNotification("Đã thêm vào danh sách yêu thích");
  }
}

// Hiển thị thông báo
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--accent);
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 3000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  // Mood cards
  moodCards.forEach((card) => {
    card.addEventListener("click", function () {
      const mood = this.dataset.mood;
      showMoodBooks(mood);
    });
  });

  // Filter buttons
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Xóa active class từ tất cả các nút
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Thêm active class cho nút được click
      this.classList.add("active");
      // Lọc sản phẩm
      filterProducts(this.dataset.category);
    });
  });

  // Detail buttons
  detailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.dataset.id;
      showProductDetails(productId);
    });
  });

  // Modal close
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Wishlist buttons
  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      toggleWishlist(this);
    });
  });

  // Search functionality
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");

  searchBtn.addEventListener("click", function () {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      showNotification(`Đang tìm kiếm: "${searchTerm}"`);
      // Thực hiện tìm kiếm thực tế ở đây
    }
  });

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchBtn.click();
    }
  });

  // Cart count update (giả lập)
  const cartCount = document.querySelector(".cart-count");
  const addToCartButtons = document.querySelectorAll(".btn-buy");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let count = parseInt(cartCount.textContent);
      count++;
      cartCount.textContent = count;
      showNotification("Đã thêm vào giỏ hàng");
    });
  });

  // Authentication simulation
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutLink = document.getElementById("logout-link");

  loginLink.addEventListener("click", function (e) {
    e.preventDefault();
    showNotification("Chuyển hướng đến trang đăng nhập");
  });

  registerLink.addEventListener("click", function (e) {
    e.preventDefault();
    showNotification("Chuyển hướng đến trang đăng ký");
  });

  logoutLink.addEventListener("click", function (e) {
    e.preventDefault();
    showNotification("Đã đăng xuất");
  });
});

// CSS Animation cho thông báo
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);
