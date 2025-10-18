// lego.js
document.addEventListener("DOMContentLoaded", function () {
  // Khởi tạo các biến và sự kiện
  initFilterButtons();
  initProductDetails();
  initWishlistButtons();
  initSearchFunctionality();
  initAuthState();
});

// Lọc sản phẩm theo danh mục
function initFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const categorySections = document.querySelectorAll(".category-section");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Xóa active class từ tất cả các nút
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Thêm active class cho nút được click
      this.classList.add("active");

      const category = this.getAttribute("data-category");

      // Hiển thị/ẩn các danh mục sản phẩm
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

// Xử lý chi tiết sản phẩm
function initProductDetails() {
  const detailButtons = document.querySelectorAll(".btn-details");
  const modal = document.getElementById("productModal");
  const modalClose = document.getElementById("modalClose");

  // Dữ liệu sản phẩm mẫu
  const productData = {
    1: {
      title: "Millennium Falcon",
      image:
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      currentPrice: "7.990.000₫",
      originalPrice: "8.990.000₫",
      pieces: "Số mảnh: 7541",
      specs: [
        "Dòng sản phẩm: Star Wars Ultimate Collector Series",
        "Độ tuổi: 16+",
        "Kích thước: 84cm x 56cm x 21cm",
        "Bao gồm 5 nhân vật: Han Solo, Chewbacca, Princess Leia, C-3PO, và Finn",
        "Có thể tháo rời để xem chi tiết bên trong",
      ],
    },
    2: {
      title: "Imperial Star Destroyer",
      image:
        "https://images.unsplash.com/photo-1633617477271-d4f351ff7c7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      currentPrice: "5.490.000₫",
      originalPrice: "6.490.000₫",
      pieces: "Số mảnh: 4784",
      specs: [
        "Dòng sản phẩm: Star Wars Ultimate Collector Series",
        "Độ tuổi: 16+",
        "Kích thước: 110cm x 66cm x 44cm",
        "Bao gồm stand trưng bày và plaque thông tin",
        "Chi tiết bên trong và bên ngoài cực kỳ tinh xảo",
      ],
    },
    3: {
      title: "AT-AT Walker",
      image:
        "https://images.unsplash.com/photo-1601643157091-ce5c665decab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      currentPrice: "4.290.000₫",
      originalPrice: "4.790.000₫",
      pieces: "Số mảnh: 1267",
      specs: [
        "Dòng sản phẩm: Star Wars",
        "Độ tuổi: 9+",
        "Kích thước: 40cm x 24cm x 54cm",
        "Bao gồm 6 nhân vật mini",
        "Chân có thể di chuyển, đầu xoay được",
      ],
    },
    // Thêm dữ liệu cho các sản phẩm khác...
  };

  // Mở modal chi tiết sản phẩm
  detailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      const product = productData[productId];

      if (product) {
        document.getElementById("modalTitle").textContent = product.title;
        document.getElementById("modalImage").src = product.image;
        document.getElementById("modalImage").alt = product.title;
        document.getElementById("modalCurrentPrice").textContent =
          product.currentPrice;
        document.getElementById("modalOriginalPrice").textContent =
          product.originalPrice;
        document.getElementById("modalPieces").textContent = product.pieces;

        const specsList = document.getElementById("modalSpecs");
        specsList.innerHTML = "";
        product.specs.forEach((spec) => {
          const li = document.createElement("li");
          li.textContent = spec;
          specsList.appendChild(li);
        });

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Đóng modal
  modalClose.addEventListener("click", function () {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Đóng modal khi click bên ngoài
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

// Xử lý nút yêu thích
function initWishlistButtons() {
  const wishlistButtons = document.querySelectorAll(".btn-wishlist");

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector("i");
      if (icon.classList.contains("far")) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        this.classList.add("active");
        showNotification("Đã thêm vào danh sách yêu thích!");
      } else {
        icon.classList.remove("fas");
        icon.classList.add("far");
        this.classList.remove("active");
        showNotification("Đã xóa khỏi danh sách yêu thích!");
      }
    });
  });
}

// Xử lý tìm kiếm
function initSearchFunctionality() {
  const searchInput = document.querySelector(".search-input");
  const searchButton = document.querySelector(".search-btn");

  searchButton.addEventListener("click", function () {
    performSearch();
  });

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      showNotification(`Đang tìm kiếm: "${searchTerm}"`);
      // Thực hiện tìm kiếm thực tế ở đây
    } else {
      showNotification("Vui lòng nhập từ khóa tìm kiếm");
    }
  }
}

// Quản lý trạng thái đăng nhập
function initAuthState() {
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutLink = document.getElementById("logout-link");

  // Kiểm tra trạng thái đăng nhập (giả lập)
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

  // Xử lý đăng xuất
  logoutLink.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "false");
    window.location.reload();
  });
}

// Hiển thị thông báo
function showNotification(message) {
  // Tạo phần tử thông báo
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--primary);
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    box-shadow: var(--shadow);
    z-index: 1001;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;

  document.body.appendChild(notification);

  // Hiển thị thông báo
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Ẩn thông báo sau 3 giây
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Thêm hiệu ứng khi cuộn trang
window.addEventListener("scroll", function () {
  const header = document.querySelector(".main-header");
  if (window.scrollY > 100) {
    header.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
  } else {
    header.style.boxShadow = "var(--shadow)";
  }
});
