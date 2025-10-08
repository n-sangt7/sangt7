// Dữ liệu sản phẩm
const products = {
  iphone14: {
    name: "iPhone 14 Pro Max 256GB",
    brand: "Apple",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "28.990.000₫",
    originalPrice: "32.990.000₫",
    specs: [
      "Màn hình: 6.7 inch Super Retina XDR",
      "Chip: A16 Bionic",
      "RAM: 6GB, Bộ nhớ: 256GB",
      "Camera sau: 48MP + 12MP + 12MP",
      "Camera trước: 12MP",
      "Pin: 4323mAh, Sạc nhanh 20W",
      "Hệ điều hành: iOS 16",
    ],
    discountCode: "IPHONE14",
  },
  iphone13: {
    name: "iPhone 13 128GB",
    brand: "Apple",
    image:
      "https://images.unsplash.com/photo-1632661674599-451dbb6a7bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "18.990.000₫",
    originalPrice: "22.990.000₫",
    specs: [
      "Màn hình: 6.1 inch Super Retina XDR",
      "Chip: A15 Bionic",
      "RAM: 4GB, Bộ nhớ: 128GB",
      "Camera sau: 12MP + 12MP",
      "Camera trước: 12MP",
      "Pin: 3240mAh, Sạc nhanh 20W",
      "Hệ điều hành: iOS 15",
    ],
    discountCode: "IPHONE13",
  },
  iphone12: {
    name: "iPhone 12 64GB",
    brand: "Apple",
    image:
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "14.990.000₫",
    originalPrice: "17.990.000₫",
    specs: [
      "Màn hình: 6.1 inch Super Retina XDR",
      "Chip: A14 Bionic",
      "RAM: 4GB, Bộ nhớ: 64GB",
      "Camera sau: 12MP + 12MP",
      "Camera trước: 12MP",
      "Pin: 2815mAh, Sạc nhanh 20W",
      "Hệ điều hành: iOS 14",
    ],
    discountCode: "IPHONE12",
  },
  s23ultra: {
    name: "Samsung Galaxy S23 Ultra",
    brand: "Samsung",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "24.990.000₫",
    originalPrice: "28.990.000₫",
    specs: [
      "Màn hình: 6.8 inch Dynamic AMOLED 2X",
      "Chip: Snapdragon 8 Gen 2",
      "RAM: 12GB, Bộ nhớ: 256GB",
      "Camera sau: 200MP + 10MP + 10MP + 12MP",
      "Camera trước: 12MP",
      "Pin: 5000mAh, Sạc nhanh 45W",
      "Hệ điều hành: Android 13",
    ],
    discountCode: "S23ULTRA",
  },
  zfold4: {
    name: "Samsung Galaxy Z Fold4",
    brand: "Samsung",
    image:
      "https://images.unsplash.com/photo-1662948998735-204c8c1d2a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "39.990.000₫",
    originalPrice: "44.990.000₫",
    specs: [
      "Màn hình: 7.6 inch Dynamic AMOLED 2X",
      "Chip: Snapdragon 8+ Gen 1",
      "RAM: 12GB, Bộ nhớ: 256GB",
      "Camera sau: 50MP + 12MP + 10MP",
      "Camera trước: 10MP + 4MP",
      "Pin: 4400mAh, Sạc nhanh 25W",
      "Hệ điều hành: Android 12L",
    ],
    discountCode: "ZFOLD4",
  },
  a54: {
    name: "Samsung Galaxy A54 5G",
    brand: "Samsung",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "9.990.000₫",
    originalPrice: "11.990.000₫",
    specs: [
      "Màn hình: 6.4 inch Super AMOLED",
      "Chip: Exynos 1380",
      "RAM: 8GB, Bộ nhớ: 128GB",
      "Camera sau: 50MP + 12MP + 5MP",
      "Camera trước: 32MP",
      "Pin: 5000mAh, Sạc nhanh 25W",
      "Hệ điều hành: Android 13",
    ],
    discountCode: "A54G",
  },
  xiaomi13: {
    name: "Xiaomi 13 Pro",
    brand: "Xiaomi",
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "16.990.000₫",
    originalPrice: "19.990.000₫",
    specs: [
      "Màn hình: 6.73 inch AMOLED",
      "Chip: Snapdragon 8 Gen 2",
      "RAM: 12GB, Bộ nhớ: 256GB",
      "Camera sau: 50MP + 50MP + 50MP",
      "Camera trước: 32MP",
      "Pin: 4820mAh, Sạc nhanh 120W",
      "Hệ điều hành: MIUI 14",
    ],
    discountCode: "XIAOMI13",
  },
  "12t": {
    name: "Xiaomi 12T 5G",
    brand: "Xiaomi",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "11.990.000₫",
    originalPrice: "13.990.000₫",
    specs: [
      "Màn hình: 6.67 inch AMOLED",
      "Chip: MediaTek Dimensity 8100-Ultra",
      "RAM: 8GB, Bộ nhớ: 128GB",
      "Camera sau: 108MP + 8MP + 2MP",
      "Camera trước: 20MP",
      "Pin: 5000mAh, Sạc nhanh 120W",
      "Hệ điều hành: MIUI 13",
    ],
    discountCode: "XIAOMI12T",
  },
  note12: {
    name: "Redmi Note 12 Pro",
    brand: "Xiaomi",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    currentPrice: "7.990.000₫",
    originalPrice: "9.990.000₫",
    specs: [
      "Màn hình: 6.67 inch OLED",
      "Chip: Snapdragon 778G",
      "RAM: 8GB, Bộ nhớ: 128GB",
      "Camera sau: 50MP + 8MP + 2MP",
      "Camera trước: 16MP",
      "Pin: 5000mAh, Sạc nhanh 67W",
      "Hệ điều hành: MIUI 13",
    ],
    discountCode: "NOTE12",
  },
};

// DOM Elements
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const brandSections = document.querySelectorAll(".brand-section");
const detailButtons = document.querySelectorAll(".btn-details");
const modalOverlay = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const modalBody = document.getElementById("modalBody");
const wishlistButtons = document.querySelectorAll(".btn-wishlist");
const copyButtons = document.querySelectorAll(".btn-copy");

// Lọc sản phẩm theo hãng
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const brand = button.dataset.brand;

    // Cập nhật trạng thái active cho nút lọc
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Hiển thị/ẩn sản phẩm theo hãng
    if (brand === "all") {
      productCards.forEach((card) => {
        card.style.display = "block";
      });
      brandSections.forEach((section) => {
        section.style.display = "block";
      });
    } else {
      brandSections.forEach((section) => {
        section.style.display = section.id === brand ? "block" : "none";
      });

      productCards.forEach((card) => {
        card.style.display = card.dataset.brand === brand ? "block" : "none";
      });
    }
  });
});

// Hiển thị modal chi tiết sản phẩm
detailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.product;
    const product = products[productId];

    if (product) {
      showProductModal(product);
    }
  });
});

// Hiển thị modal sản phẩm
function showProductModal(product) {
  modalBody.innerHTML = `
    <div class="modal-product">
      <div class="modal-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="modal-info">
        <h2>${product.name}</h2>
        <div class="modal-price">
          <span class="modal-current-price">${product.currentPrice}</span>
          <span class="modal-original-price">${product.originalPrice}</span>
        </div>
        <div class="modal-specs">
          <h3>Thông số kỹ thuật</h3>
          <ul>
            ${product.specs.map((spec) => `<li>${spec}</li>`).join("")}
          </ul>
        </div>
        <div class="modal-discount">
          <p><strong>Mã giảm giá:</strong> <span class="discount-code">${
            product.discountCode
          }</span></p>
          <button class="btn btn-copy" data-code="${
            product.discountCode
          }">Sao chép mã</button>
        </div>
        <div class="modal-actions">
          <button class="btn btn-buy" id="buyNow">
            <i class="fas fa-shopping-cart"></i> Mua ngay
          </button>
        </div>
      </div>
    </div>
  `;

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";

  // Thêm sự kiện cho nút sao chép mã trong modal
  const modalCopyBtn = modalBody.querySelector(".btn-copy");
  if (modalCopyBtn) {
    modalCopyBtn.addEventListener("click", copyDiscountCode);
  }

  // Thêm sự kiện cho nút mua ngay
  const buyNowBtn = document.getElementById("buyNow");
  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      alert(`Cảm ơn bạn đã mua ${product.name}!`);
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }
}

// Đóng modal
modalClose.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Đóng modal khi click bên ngoài
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Yêu thích sản phẩm
wishlistButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const icon = button.querySelector("i");

    if (icon.classList.contains("far")) {
      icon.classList.remove("far");
      icon.classList.add("fas");
      button.classList.add("active");
      alert("Đã thêm vào danh sách yêu thích!");
    } else {
      icon.classList.remove("fas");
      icon.classList.add("far");
      button.classList.remove("active");
      alert("Đã xóa khỏi danh sách yêu thích!");
    }
  });
});

// Sao chép mã giảm giá
copyButtons.forEach((button) => {
  button.addEventListener("click", copyDiscountCode);
});

function copyDiscountCode() {
  const code = this.dataset.code;

  // Tạo một phần tử tạm thời để sao chép
  const tempInput = document.createElement("input");
  tempInput.value = code;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  // Thông báo cho người dùng
  alert(`Đã sao chép mã giảm giá: ${code}`);
}

// Tăng số lượng giỏ hàng khi click vào icon giỏ hàng
const cartIcon = document.querySelector(".header-action:nth-child(3)");
const cartCount = document.querySelector(".cart-count");

cartIcon.addEventListener("click", () => {
  let count = parseInt(cartCount.textContent);
  count++;
  cartCount.textContent = count;
});

// Xử lý đăng nhập/đăng xuất
const loginLink = document.getElementById("login-link");
const registerLink = document.getElementById("register-link");
const logoutLink = document.getElementById("logout-link");

// Giả lập đăng nhập (trong thực tế sẽ có hệ thống xác thực)
loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginLink.style.display = "none";
  registerLink.style.display = "none";
  logoutLink.style.display = "inline-block";
  alert("Đăng nhập thành công!");
});

logoutLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginLink.style.display = "inline-block";
  registerLink.style.display = "inline-block";
  logoutLink.style.display = "none";
  alert("Đã đăng xuất!");
});

// Tìm kiếm sản phẩm
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", performSearch);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    performSearch();
  }
});

function performSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === "") {
    alert("Vui lòng nhập từ khóa tìm kiếm!");
    return;
  }

  // Tìm sản phẩm phù hợp
  let found = false;

  productCards.forEach((card) => {
    const productName = card
      .querySelector(".product-name")
      .textContent.toLowerCase();

    if (productName.includes(searchTerm)) {
      card.style.display = "block";
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  if (!found) {
    alert("Không tìm thấy sản phẩm phù hợp!");

    // Hiển thị lại tất cả sản phẩm
    productCards.forEach((card) => {
      card.style.display = "block";
    });
  }
}

// Khởi tạo trang
document.addEventListener("DOMContentLoaded", () => {
  console.log("Trang điện thoại đã được tải!");
});
