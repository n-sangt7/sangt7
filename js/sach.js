// Dữ liệu sách theo tâm trạng
const moodBooks = {
  vui: [
    {
      id: 1,
      title: "Nhà Giả Kim",
      author: "Paulo Coelho",
      description:
        "Câu chuyện về hành trình theo đuổi giấc mơ và khám phá bản thân, mang đến cảm giác lạc quan và hy vọng.",
    },
    {
      id: 2,
      title: "Hoàng Tử Bé",
      author: "Antoine de Saint-Exupéry",
      description:
        "Tác phẩm kinh điển với thông điệp về tình yêu, sự trong sáng và ý nghĩa thực sự của cuộc sống.",
    },
    {
      id: 3,
      title: "Một Lít Nước Mắt",
      author: "Kito Aya",
      description:
        "Nhật ký cảm động về cuộc chiến với bệnh tật, truyền cảm hứng sống tích cực và trân trọng từng khoảnh khắc.",
    },
    {
      id: 4,
      title: "Đời Ngắn Đừng Ngủ Dài",
      author: "Robin Sharma",
      description:
        "Những bài học quý giá về sống có ý nghĩa, tận hưởng cuộc sống và theo đuổi đam mê.",
    },
  ],
  buon: [
    {
      id: 5,
      title: "Tiếng Chim Hót Trong Bụi Mận Gai",
      author: "Colleen McCullough",
      description:
        "Câu chuyện tình yêu đầy bi kịch và cảm xúc sâu lắng, phù hợp khi bạn cần đồng cảm.",
    },
    {
      id: 6,
      title: "Bắt Trẻ Đồng Xanh",
      author: "J.D. Salinger",
      description:
        "Hành trình nội tâm của một thiếu niên chán nản, giúp bạn cảm thấy được thấu hiểu.",
    },
    {
      id: 7,
      title: "Mùa Thu Trong Mưa",
      author: "Nguyễn Nhật Ánh",
      description:
        "Truyện ngắn về tình yêu và nỗi buồn tuổi trẻ, nhẹ nhàng và sâu lắng.",
    },
    {
      id: 8,
      title: "Những Người Khốn Khổ",
      author: "Victor Hugo",
      description:
        "Kiệt tác văn học về cuộc đấu tranh cho công lý và tình yêu thương giữa nghịch cảnh.",
    },
  ],
  langman: [
    {
      id: 9,
      title: "Người Tình",
      author: "Marguerite Duras",
      description:
        "Câu chuyện tình yêu đầy đam mê và day dứt trong bối cảnh thuộc địa Đông Dương.",
    },
    {
      id: 10,
      title: "Chuyện Tình Paris",
      author: "Nicolas Barreau",
      description:
        "Lãng mạn kiểu Pháp với những tình huống bất ngờ và kết thúc ngọt ngào.",
    },
    {
      id: 11,
      title: "Mắt Biếc",
      author: "Nguyễn Nhật Ánh",
      description:
        "Tình yêu tuổi học trò trong sáng nhưng đầy tiếc nuối và day dứt.",
    },
    {
      id: 12,
      title: "Chuyện Tình New York",
      author: "Jojo Moyes",
      description:
        "Hành trình tìm lại tình yêu và bản thân giữa lòng thành phố không ngủ.",
    },
  ],
  kitich: [
    {
      id: 13,
      title: "Mật Mã Da Vinci",
      author: "Dan Brown",
      description:
        "Cuộc truy tìm bí ẩn ly kỳ với những tình tiết hồi hộp đến nghẹt thở.",
    },
    {
      id: 14,
      title: "Đồi Gió Hú",
      author: "Emily Brontë",
      description:
        "Bi kịch tình yêu đầy ám ảnh và kịch tính trong bối cảnh hoang vu.",
    },
    {
      id: 15,
      title: "Bí Mật Của Naoko",
      author: "Keigo Higashino",
      description:
        "Trinh thám tâm lý với những bí ẩn đan xen và tình tiết bất ngờ.",
    },
    {
      id: 16,
      title: "Trò Chơi Vương Quyền",
      author: "George R.R. Martin",
      description:
        "Sử thi fantasy đầy kịch tính, âm mưu và những cuộc chiến tranh giành quyền lực.",
    },
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
      { label: "Thể loại", value: "Tiểu thuyết, Tâm lý" },
      { label: "Nhà xuất bản", value: "Nhã Nam" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "220" },
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
      { label: "Thể loại", value: "Tiểu thuyết, Lãng mạn" },
      { label: "Nhà xuất bản", value: "Văn học" },
      { label: "Năm xuất bản", value: "2022" },
      { label: "Số trang", value: "780" },
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
      { label: "Thể loại", value: "Kỹ năng, Tâm lý" },
      { label: "Nhà xuất bản", value: "Trẻ" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "320" },
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
      { label: "Thể loại", value: "Kinh tế, Tâm lý" },
      { label: "Nhà xuất bản", value: "Thế giới" },
      { label: "Năm xuất bản", value: "2022" },
      { label: "Số trang", value: "612" },
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
      { label: "Nhà xuất bản", value: "Lao động" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "336" },
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
      { label: "Nhà xuất bản", value: "Trẻ" },
      { label: "Năm xuất bản", value: "2022" },
      { label: "Số trang", value: "480" },
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
      { label: "Thể loại", value: "Kỹ năng, Phát triển bản thân" },
      { label: "Nhà xuất bản", value: "Tổng hợp TPHCM" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "428" },
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
      { label: "Thể loại", value: "Kỹ năng, Tâm lý" },
      { label: "Nhà xuất bản", value: "Lao động" },
      { label: "Năm xuất bản", value: "2022" },
      { label: "Số trang", value: "256" },
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
      { label: "Thể loại", value: "Kỹ năng, Phát triển bản thân" },
      { label: "Nhà xuất bản", value: "Trẻ" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "224" },
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
      { label: "Thể loại", value: "Thiếu nhi, Fantasy" },
      { label: "Nhà xuất bản", value: "Trẻ" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "336" },
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
      { label: "Nhà xuất bản", value: "Kim Đồng" },
      { label: "Năm xuất bản", value: "2022" },
      { label: "Số trang", value: "96" },
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
      { label: "Thể loại", value: "Thiếu nhi, Manga" },
      { label: "Nhà xuất bản", value: "Kim Đồng" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "192" },
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
      { label: "Thể loại", value: "Tiểu thuyết, Tâm lý" },
      { label: "Nhà xuất bản", value: "Nhã Nam" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "220" },
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
      { label: "Thể loại", value: "Kỹ năng, Tâm lý" },
      { label: "Nhà xuất bản", value: "Trẻ" },
      { label: "Năm xuất bản", value: "2023" },
      { label: "Số trang", value: "320" },
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
      { label: "Thể loại", value: "Kinh tế, Tâm lý" },
      { label: "Nhà xuất bản", value: "Thế giới" },
      { label: "Năm xuất bản", value: "2022" },
      { label: "Số trang", value: "612" },
      { label: "Tình trạng", value: "Còn hàng" },
    ],
  },
};

// Khởi tạo khi trang được tải
document.addEventListener("DOMContentLoaded", function () {
  initMoodBooks();
  initFilterButtons();
  initProductDetails();
  initWishlistButtons();
});

// Khởi tạo sách theo tâm trạng
function initMoodBooks() {
  const moodCards = document.querySelectorAll(".mood-card");

  moodCards.forEach((card) => {
    card.addEventListener("click", function () {
      const mood = this.dataset.mood;
      const suggestionsContainer = document.getElementById(
        `${mood}-suggestions`
      );

      // Đóng tất cả các container khác
      document.querySelectorAll(".book-suggestions").forEach((container) => {
        if (container !== suggestionsContainer) {
          container.classList.remove("active");
        }
      });

      // Toggle container hiện tại
      suggestionsContainer.classList.toggle("active");

      // Nếu container đang được mở, hiển thị sách
      if (suggestionsContainer.classList.contains("active")) {
        if (suggestionsContainer.children.length === 0) {
          displayMoodBooks(mood, suggestionsContainer);
        }
      }
    });
  });
}

// Hiển thị sách theo tâm trạng
function displayMoodBooks(mood, container) {
  const books = moodBooks[mood];

  if (books && books.length > 0) {
    books.forEach((book) => {
      const bookElement = document.createElement("div");
      bookElement.className = "suggestion-book";
      bookElement.innerHTML = `
        <h4>${book.title}</h4>
        <p>Tác giả: ${book.author}</p>
        <p class="book-description">${book.description}</p>
      `;
      container.appendChild(bookElement);
    });
  }
}

// Khởi tạo nút lọc thể loại
function initFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const categorySections = document.querySelectorAll(".category-section");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Cập nhật trạng thái active
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const category = this.dataset.category;

      // Hiển thị/ẩn các phần theo thể loại
      categorySections.forEach((section) => {
        if (category === "all" || section.id === category) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });
    });
  });
}

// Khởi tạo chi tiết sản phẩm
function initProductDetails() {
  const detailButtons = document.querySelectorAll(".btn-details");
  const modal = document.getElementById("productModal");
  const modalClose = document.getElementById("modalClose");

  detailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.dataset.id;
      showProductDetails(productId);
    });
  });

  modalClose.addEventListener("click", function () {
    modal.classList.remove("active");
  });

  // Đóng modal khi click bên ngoài
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

// Hiển thị chi tiết sản phẩm
function showProductDetails(productId) {
  const product = productDetails[productId];
  const modal = document.getElementById("productModal");

  if (product) {
    document.getElementById("modalImage").src = product.image;
    document.getElementById("modalImage").alt = product.title;
    document.getElementById("modalTitle").textContent = product.title;
    document.getElementById("modalAuthor").textContent = product.author;
    document.getElementById("modalCurrentPrice").textContent =
      product.currentPrice;
    document.getElementById("modalOriginalPrice").textContent =
      product.originalPrice;

    const specsList = document.getElementById("modalSpecs");
    specsList.innerHTML = "";

    product.specs.forEach((spec) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="spec-label">${spec.label}:</span> <span>${spec.value}</span>`;
      specsList.appendChild(li);
    });

    modal.classList.add("active");
  }
}

// Khởi tạo nút yêu thích
function initWishlistButtons() {
  const wishlistButtons = document.querySelectorAll(".btn-wishlist");

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
      this.classList.toggle("active");
      this.querySelector("i").classList.toggle("far");
      this.querySelector("i").classList.toggle("fas");

      // Hiệu ứng thông báo
      if (this.classList.contains("active")) {
        showNotification("Đã thêm vào danh sách yêu thích!");
      } else {
        showNotification("Đã xóa khỏi danh sách yêu thích!");
      }
    });
  });
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
    background: var(--success);
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 3000;
    transition: all 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Tự động xóa sau 3 giây
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Xử lý tìm kiếm
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", performSearch);
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    performSearch();
  }
});

function performSearch() {
  const query = searchInput.value.trim();
  if (query) {
    alert(`Đang tìm kiếm: "${query}"`);
    // Thực tế sẽ có logic tìm kiếm ở đây
  }
}

// Xử lý giỏ hàng
let cartCount = 0;
const cartButtons = document.querySelectorAll(".btn-buy");
const cartCountElement = document.querySelector(".cart-count");

cartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    cartCount++;
    cartCountElement.textContent = cartCount;
    showNotification("Đã thêm vào giỏ hàng!");
  });
});
