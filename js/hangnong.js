// Dữ liệu sản phẩm theo loại
const productTypes = {
  sung: {
    title: "Súng Đồ Chơi",
    icon: '<i class="fas fa-gun"></i>',
    product: {
      title: "Súng Đồ Chơi Cao Cấp",
      description:
        "Súng đồ chơi mô phỏng chân thực với chất liệu nhựa an toàn, thiết kế đẹp mắt và nhiều tính năng thú vị. Phù hợp cho trẻ em từ 8 tuổi trở lên.",
      price: "250.000₫",
      originalPrice: "300.000₫",
      image: "#",
    },
  },
  kiem: {
    title: "Kiếm Đồ Chơi",
    icon: '<i class="fas fa-sword"></i>',
    product: {
      title: "Kiếm Đồ Chơi Cao Cấp",
      description:
        "Kiếm đồ chơi được làm từ nhựa dẻo an toàn, không gây thương tích. Thiết kế giống kiếm thật với nhiều màu sắc và kiểu dáng khác nhau.",
      price: "180.000₫",
      originalPrice: "220.000₫",
      image: "#",
    },
  },
  sungban: {
    title: "Súng Bắn Đạn",
    icon: '<i class="fas fa-crosshairs"></i>',
    product: {
      title: "Súng Bắn Đạn Nerf",
      description:
        "Súng bắn đạn Nerf chính hãng với đạn mềm an toàn. Tốc độ bắn cao, độ chính xác tốt và nhiều phụ kiện đi kèm hấp dẫn.",
      price: "450.000₫",
      originalPrice: "550.000₫",
      image: "#",
    },
  },
  phukien: {
    title: "Phụ Kiện",
    icon: '<i class="fas fa-toolbox"></i>',
    product: {
      title: "Bộ Phụ Kiện Đầy Đủ",
      description:
        "Bộ phụ kiện đa dạng bao gồm băng đạn, nòng súng, tay cầm, ống ngắm và nhiều phụ kiện khác để nâng cấp vũ khí đồ chơi của bạn.",
      price: "120.000₫",
      originalPrice: "150.000₫",
      image: "#",
    },
  },
};

// Dữ liệu sản phẩm chi tiết
const productDetails = {
  1: {
    title: "Súng Đồ Chơi Mô Hình AK-47",
    currentPrice: "250.000₫",
    originalPrice: "300.000₫",
    image: "#",
    specs: [
      "Chất liệu: Nhựa ABS cao cấp",
      "Màu sắc: Đen, Xanh, Cam",
      "Kích thước: 75cm",
      "Trọng lượng: 800g",
      "Độ tuổi: 8+",
      "Bảo hành: 6 tháng",
    ],
    accessories: [
      {
        name: "Băng đạn",
        icon: '<i class="fas fa-bullseye"></i>',
        price: "30.000₫",
      },
      {
        name: "Nòng súng",
        icon: '<i class="fas fa-grip-lines"></i>',
        price: "45.000₫",
      },
      {
        name: "Tay cầm",
        icon: '<i class="fas fa-hand-paper"></i>',
        price: "25.000₫",
      },
      {
        name: "Ống ngắm",
        icon: '<i class="fas fa-eye"></i>',
        price: "35.000₫",
      },
    ],
  },
  2: {
    title: "Súng Lục Đồ Chơi M1911",
    currentPrice: "180.000₫",
    originalPrice: "220.000₫",
    image: "#",
    specs: [
      "Chất liệu: Nhựa ABS + Kim loại",
      "Màu sắc: Bạc, Đen",
      "Kích thước: 20cm",
      "Trọng lượng: 350g",
      "Độ tuổi: 10+",
      "Bảo hành: 6 tháng",
    ],
    accessories: [
      {
        name: "Băng đạn",
        icon: '<i class="fas fa-bullseye"></i>',
        price: "25.000₫",
      },
      {
        name: "Bao da",
        icon: '<i class="fas fa-briefcase"></i>',
        price: "40.000₫",
      },
      {
        name: "Dây đeo",
        icon: '<i class="fas fa-link"></i>',
        price: "15.000₫",
      },
    ],
  },
  3: {
    title: "Súng Bắn Đạn Nerf Elite",
    currentPrice: "450.000₫",
    originalPrice: "550.000₫",
    image: "#",
    specs: [
      "Chất liệu: Nhựa ABS cao cấp",
      "Màu sắc: Cam, Xanh, Vàng",
      "Tốc độ bắn: 25m/s",
      "Sức chứa: 12 viên",
      "Độ tuổi: 8+",
      "Bảo hành: 12 tháng",
    ],
    accessories: [
      {
        name: "Băng đạn",
        icon: '<i class="fas fa-bullseye"></i>',
        price: "50.000₫",
      },
      {
        name: "Đạn Nerf",
        icon: '<i class="fas fa-dot-circle"></i>',
        price: "30.000₫",
      },
      {
        name: "Ống ngắm",
        icon: '<i class="fas fa-eye"></i>',
        price: "40.000₫",
      },
      {
        name: "Túi đựng",
        icon: '<i class="fas fa-bag-shopping"></i>',
        price: "60.000₫",
      },
    ],
  },
  4: {
    title: "Kiếm Nhựa Samurai",
    currentPrice: "150.000₫",
    originalPrice: "180.000₫",
    image: "#",
    specs: [
      "Chất liệu: Nhựa dẻo an toàn",
      "Màu sắc: Bạc, Đen, Đỏ",
      "Chiều dài: 65cm",
      "Trọng lượng: 300g",
      "Độ tuổi: 6+",
      "Bảo hành: 3 tháng",
    ],
    accessories: [
      {
        name: "Bao kiếm",
        icon: '<i class="fas fa-box"></i>',
        price: "35.000₫",
      },
      {
        name: "Dây đeo",
        icon: '<i class="fas fa-link"></i>',
        price: "15.000₫",
      },
      {
        name: "Tay cầm",
        icon: '<i class="fas fa-hand-paper"></i>',
        price: "20.000₫",
      },
    ],
  },
  5: {
    title: "Kiếm Ánh Sáng Star Wars",
    currentPrice: "320.000₫",
    originalPrice: "380.000₫",
    image: "#",
    specs: [
      "Chất liệu: Nhựa PC + LED",
      "Màu sắc: Xanh, Đỏ, Tím",
      "Chiều dài: 75cm",
      "Tính năng: Phát sáng, âm thanh",
      "Độ tuổi: 8+",
      "Bảo hành: 6 tháng",
    ],
    accessories: [
      {
        name: "Pin AA",
        icon: '<i class="fas fa-battery-full"></i>',
        price: "20.000₫",
      },
      {
        name: "Bao đựng",
        icon: '<i class="fas fa-box"></i>',
        price: "45.000₫",
      },
      {
        name: "Dây đeo",
        icon: '<i class="fas fa-link"></i>',
        price: "18.000₫",
      },
    ],
  },
  6: {
    title: "Bộ Súng Cao Bồi",
    currentPrice: "280.000₫",
    originalPrice: "350.000₫",
    image: "#",
    specs: [
      "Chất liệu: Nhựa ABS",
      "Màu sắc: Nâu, Đen",
      "Bao gồm: 2 súng lục + Bao da",
      "Kích thước: 25cm/súng",
      "Độ tuổi: 8+",
      "Bảo hành: 6 tháng",
    ],
    accessories: [
      {
        name: "Bao da",
        icon: '<i class="fas fa-briefcase"></i>',
        price: "40.000₫",
      },
      {
        name: "Đạn giả",
        icon: '<i class="fas fa-dot-circle"></i>',
        price: "15.000₫",
      },
      {
        name: "Dây đeo",
        icon: '<i class="fas fa-link"></i>',
        price: "12.000₫",
      },
    ],
  },
  7: {
    title: "Súng Bắn Đĩa Bay",
    currentPrice: "380.000₫",
    originalPrice: "450.000₫",
    image: "#",
    specs: [
      "Chất liệu: Nhựa ABS + Điện tử",
      "Màu sắc: Cam, Xanh dương",
      "Kèm theo: 3 đĩa bay",
      "Tầm bắn: 15m",
      "Độ tuổi: 8+",
      "Bảo hành: 12 tháng",
    ],
    accessories: [
      {
        name: "Đĩa bay",
        icon: '<i class="fas fa-compact-disc"></i>',
        price: "25.000₫",
      },
      {
        name: "Pin AA",
        icon: '<i class="fas fa-battery-full"></i>',
        price: "20.000₫",
      },
      {
        name: "Túi đựng",
        icon: '<i class="fas fa-bag-shopping"></i>',
        price: "50.000₫",
      },
    ],
  },
  8: {
    title: "Súng Nước Automatic",
    currentPrice: "220.000₫",
    originalPrice: "280.000₫",
    image: "#",
    specs: [
      "Chất liệu: Nhựa PP",
      "Màu sắc: Xanh, Cam, Vàng",
      "Dung tích: 500ml",
      "Tầm bắn: 8m",
      "Độ tuổi: 6+",
      "Bảo hành: 3 tháng",
    ],
    accessories: [
      {
        name: "Bình nước",
        icon: '<i class="fas fa-tint"></i>',
        price: "15.000₫",
      },
      {
        name: "Vòi phun",
        icon: '<i class="fas fa-spray-can"></i>',
        price: "20.000₫",
      },
      {
        name: "Dây đeo",
        icon: '<i class="fas fa-link"></i>',
        price: "10.000₫",
      },
    ],
  },
  9: {
    title: "Kiếm Gỗ Tập Luyện",
    currentPrice: "120.000₫",
    originalPrice: "150.000₫",
    image: "#",
    specs: [
      "Chất liệu: Gỗ nhẹ",
      "Màu sắc: Tự nhiên",
      "Chiều dài: 70cm",
      "Trọng lượng: 250g",
      "Độ tuổi: 5+",
      "Bảo hành: Không",
    ],
    accessories: [
      {
        name: "Bao kiếm",
        icon: '<i class="fas fa-box"></i>',
        price: "25.000₫",
      },
      { name: "Dây đeo", icon: '<i class="fas fa-link"></i>', price: "8.000₫" },
    ],
  },
  10: {
    title: "Súng Đồ Chơi Sniper",
    currentPrice: "320.000₫",
    originalPrice: "380.000₫",
    image: "#",
    specs: [
      "Chất liệu: Nhựa ABS + Kim loại",
      "Màu sắc: Đen, Xanh rêu",
      "Kích thước: 90cm",
      "Có ống ngắm phóng to",
      "Độ tuổi: 12+",
      "Bảo hành: 6 tháng",
    ],
    accessories: [
      {
        name: "Ống ngắm",
        icon: '<i class="fas fa-eye"></i>',
        price: "45.000₫",
      },
      {
        name: "Chân chống",
        icon: '<i class="fas fa-umbrella-beach"></i>',
        price: "35.000₫",
      },
      {
        name: "Băng đạn",
        icon: '<i class="fas fa-bullseye"></i>',
        price: "30.000₫",
      },
      {
        name: "Túi đựng",
        icon: '<i class="fas fa-bag-shopping"></i>',
        price: "55.000₫",
      },
    ],
  },
  11: {
    title: "Bộ Kiếm Hiệp Sĩ",
    currentPrice: "280.000₫",
    originalPrice: "350.000₫",
    image: "#",
    specs: [
      "Chất liệu: Nhựa + Vải",
      "Màu sắc: Bạc, Đỏ, Vàng",
      "Bao gồm: 2 kiếm + Khiên",
      "Chiều dài: 60cm",
      "Độ tuổi: 8+",
      "Bảo hành: 3 tháng",
    ],
    accessories: [
      {
        name: "Khiên",
        icon: '<i class="fas fa-shield-alt"></i>',
        price: "40.000₫",
      },
      {
        name: "Bao kiếm",
        icon: '<i class="fas fa-box"></i>',
        price: "30.000₫",
      },
      {
        name: "Găng tay",
        icon: '<i class="fas fa-mitten"></i>',
        price: "25.000₫",
      },
    ],
  },
  12: {
    title: "Súng Bắn Bóng Nerf",
    currentPrice: "350.000₫",
    originalPrice: "420.000₫",
    image: "#",
    specs: [
      "Chất liệu: Nhựa ABS",
      "Màu sắc: Cam, Xanh lá",
      "Sức chứa: 10 bóng",
      "Tốc độ bắn: 20m/s",
      "Độ tuổi: 8+",
      "Bảo hành: 12 tháng",
    ],
    accessories: [
      {
        name: "Bóng Nerf",
        icon: '<i class="fas fa-basketball-ball"></i>',
        price: "35.000₫",
      },
      {
        name: "Băng đạn",
        icon: '<i class="fas fa-bullseye"></i>',
        price: "40.000₫",
      },
      {
        name: "Túi đựng",
        icon: '<i class="fas fa-bag-shopping"></i>',
        price: "50.000₫",
      },
    ],
  },
  13: {
    title: "Kiếm Nhựa Ngắn",
    currentPrice: "80.000₫",
    originalPrice: "100.000₫",
    image: "#",
    specs: [
      "Chất liệu: Nhựa dẻo",
      "Màu sắc: Xanh, Đỏ, Vàng",
      "Chiều dài: 40cm",
      "Trọng lượng: 150g",
      "Độ tuổi: 3+",
      "Bảo hành: Không",
    ],
    accessories: [
      {
        name: "Bao kiếm",
        icon: '<i class="fas fa-box"></i>',
        price: "15.000₫",
      },
    ],
  },
  14: {
    title: "Súng Lục Điện Tử",
    currentPrice: "190.000₫",
    originalPrice: "240.000₫",
    image: "#",
    specs: [
      "Chất liệu: Nhựa ABS + Điện tử",
      "Màu sắc: Đen, Bạc",
      "Tính năng: Âm thanh, đèn flash",
      "Kích thước: 22cm",
      "Độ tuổi: 8+",
      "Bảo hành: 6 tháng",
    ],
    accessories: [
      {
        name: "Pin AA",
        icon: '<i class="fas fa-battery-full"></i>',
        price: "20.000₫",
      },
      {
        name: "Bao da",
        icon: '<i class="fas fa-briefcase"></i>',
        price: "35.000₫",
      },
    ],
  },
  15: {
    title: "Bộ Súng Ngắm Hồng Ngoại",
    currentPrice: "520.000₫",
    originalPrice: "650.000₫",
    image: "#",
    specs: [
      "Chất liệu: Nhựa ABS + Điện tử",
      "Màu sắc: Đen, Xanh đen",
      "Tính năng: Ngắm hồng ngoại",
      "Kích thước: 85cm",
      "Độ tuổi: 12+",
      "Bảo hành: 12 tháng",
    ],
    accessories: [
      {
        name: "Ngắm hồng ngoại",
        icon: '<i class="fas fa-bullseye"></i>',
        price: "80.000₫",
      },
      {
        name: "Pin sạc",
        icon: '<i class="fas fa-battery-full"></i>',
        price: "45.000₫",
      },
      {
        name: "Túi đựng",
        icon: '<i class="fas fa-bag-shopping"></i>',
        price: "65.000₫",
      },
      {
        name: "Chân chống",
        icon: '<i class="fas fa-umbrella-beach"></i>',
        price: "40.000₫",
      },
    ],
  },
};

// DOM Elements
const typeItems = document.querySelectorAll(".type-item");
const productModal = document.getElementById("productModal");
const typeModal = document.getElementById("typeModal");
const modalClose = document.getElementById("modalClose");
const typeModalClose = document.getElementById("typeModalClose");
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const detailButtons = document.querySelectorAll(".btn-details");

// Hiển thị modal sản phẩm theo loại
typeItems.forEach((item) => {
  item.addEventListener("click", function () {
    const type = this.getAttribute("data-type");
    const typeData = productTypes[type];

    if (typeData) {
      document.getElementById("modalTypeIcon").innerHTML = typeData.icon;
      document.getElementById("modalTypeTitle").textContent = typeData.title;
      document.getElementById("modalTypeProductTitle").textContent =
        typeData.product.title;
      document.getElementById("modalTypeProductDesc").textContent =
        typeData.product.description;
      document.getElementById("modalTypeCurrentPrice").textContent =
        typeData.product.price;
      document.getElementById("modalTypeOriginalPrice").textContent =
        typeData.product.originalPrice;
      document.getElementById("modalTypeImage").src = typeData.product.image;

      typeModal.style.display = "flex";
    }
  });
});

// Hiển thị modal chi tiết sản phẩm và phụ kiện
detailButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const productId = this.getAttribute("data-id");
    const productData = productDetails[productId];

    if (productData) {
      document.getElementById("modalTitle").textContent = productData.title;
      document.getElementById("modalCurrentPrice").textContent =
        productData.currentPrice;
      document.getElementById("modalOriginalPrice").textContent =
        productData.originalPrice;
      document.getElementById("modalImage").src = productData.image;

      const specsList = document.getElementById("modalSpecs");
      specsList.innerHTML = "";
      productData.specs.forEach((spec) => {
        const li = document.createElement("li");
        li.textContent = spec;
        specsList.appendChild(li);
      });

      // Hiển thị phụ kiện trong modal
      const accessoriesContainer = document.getElementById("modalAccessories");
      if (accessoriesContainer) {
        accessoriesContainer.innerHTML = "";
        if (productData.accessories && productData.accessories.length > 0) {
          const accessoriesTitle = document.createElement("h3");
          accessoriesTitle.textContent = "Phụ Kiện Đi Kèm";
          accessoriesContainer.appendChild(accessoriesTitle);

          const accessoriesGrid = document.createElement("div");
          accessoriesGrid.className = "accessories-grid";

          productData.accessories.forEach((accessory) => {
            const accessoryItem = document.createElement("div");
            accessoryItem.className = "accessory-item";
            accessoryItem.innerHTML = `
              <div class="accessory-icon">${accessory.icon}</div>
              <div class="accessory-name">${accessory.name}</div>
              <div class="accessory-price">${accessory.price}</div>
            `;
            accessoriesGrid.appendChild(accessoryItem);
          });

          accessoriesContainer.appendChild(accessoriesGrid);
        }
      }

      productModal.style.display = "flex";
    }
  });
});

// Hiển thị phụ kiện khi click vào sản phẩm
productCards.forEach((card) => {
  card.addEventListener("click", function (e) {
    // Chỉ kích hoạt khi không click vào nút chi tiết hoặc wishlist
    if (
      !e.target.closest(".btn-details") &&
      !e.target.closest(".btn-wishlist")
    ) {
      const productId =
        this.querySelector(".btn-details").getAttribute("data-id");
      const productData = productDetails[productId];

      // Tìm hoặc tạo phần accessories trong card
      let accessoriesSection = this.querySelector(".accessories-section");
      if (!accessoriesSection) {
        accessoriesSection = document.createElement("div");
        accessoriesSection.className = "accessories-section";
        this.appendChild(accessoriesSection);
      }

      // Đóng tất cả các sections khác
      document.querySelectorAll(".accessories-section").forEach((section) => {
        if (section !== accessoriesSection) {
          section.classList.remove("active");
        }
      });

      // Hiển thị phụ kiện
      if (productData.accessories && productData.accessories.length > 0) {
        accessoriesSection.innerHTML = `
          <h4 class="accessories-title">Phụ Kiện Đi Kèm</h4>
          <div class="accessories-grid">
            ${productData.accessories
              .map(
                (accessory) => `
              <div class="accessory-item">
                <div class="accessory-icon">${accessory.icon}</div>
                <div class="accessory-name">${accessory.name}</div>
                <div class="accessory-price">${accessory.price}</div>
              </div>
            `
              )
              .join("")}
          </div>
        `;
        accessoriesSection.classList.toggle("active");
      }
    }
  });
});

// Đóng modal
modalClose.addEventListener("click", function () {
  productModal.style.display = "none";
});

typeModalClose.addEventListener("click", function () {
  typeModal.style.display = "none";
});

// Đóng modal khi click bên ngoài
window.addEventListener("click", function (event) {
  if (event.target === productModal) {
    productModal.style.display = "none";
  }
  if (event.target === typeModal) {
    typeModal.style.display = "none";
  }
});

// Lọc sản phẩm theo thể loại
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Xóa active class từ tất cả buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Thêm active class cho button được click
    this.classList.add("active");

    const category = this.getAttribute("data-category");

    productCards.forEach((card) => {
      if (
        category === "all" ||
        card.getAttribute("data-category") === category
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    // Cuộn đến phần sản phẩm
    document.querySelector(".sung-products").scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Wishlist functionality
const wishlistButtons = document.querySelectorAll(".btn-wishlist");
wishlistButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.stopPropagation(); // Ngăn sự kiện click lan ra card
    const icon = this.querySelector("i");
    if (icon.classList.contains("far")) {
      icon.classList.remove("far");
      icon.classList.add("fas");
      this.style.background = "#e74c3c";
      this.style.color = "white";
      showNotification("Đã thêm vào yêu thích");
    } else {
      icon.classList.remove("fas");
      icon.classList.add("far");
      this.style.background = "white";
      this.style.color = "inherit";
      showNotification("Đã xóa khỏi yêu thích");
    }
  });
});

// Hiển thị thông báo
function showNotification(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary);
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 3000;
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

// Thêm CSS animation cho notification
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

// Tìm kiếm sản phẩm
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");

searchButton.addEventListener("click", performSearch);
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    performSearch();
  }
});

function performSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm === "") {
    showNotification("Vui lòng nhập từ khóa tìm kiếm");
    return;
  }

  let found = false;
  productCards.forEach((card) => {
    const productName = card
      .querySelector(".product-name")
      .textContent.toLowerCase();
    if (productName.includes(searchTerm)) {
      card.style.display = "block";
      found = true;
      // Highlight sản phẩm tìm thấy
      card.style.boxShadow = "0 0 0 3px var(--accent)";
      setTimeout(() => {
        card.style.boxShadow = "";
      }, 2000);
    } else {
      card.style.display = "none";
    }
  });

  if (found) {
    showNotification(`Tìm thấy sản phẩm với từ khóa: "${searchTerm}"`);
    document.querySelector(".sung-products").scrollIntoView({
      behavior: "smooth",
    });
  } else {
    showNotification(`Không tìm thấy sản phẩm với từ khóa: "${searchTerm}"`);
    // Hiển thị lại tất cả sản phẩm
    productCards.forEach((card) => {
      card.style.display = "block";
    });
  }
}

// Thêm vào giỏ hàng
const addToCartButtons = document.querySelectorAll(".btn-buy");
const cartCount = document.querySelector(".cart-count");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    let count = parseInt(cartCount.textContent);
    count++;
    cartCount.textContent = count;
    showNotification("Đã thêm vào giỏ hàng");

    // Hiệu ứng cho icon giỏ hàng
    const cartIcon = document.querySelector(".fa-shopping-cart").parentElement;
    cartIcon.style.transform = "scale(1.2)";
    setTimeout(() => {
      cartIcon.style.transform = "scale(1)";
    }, 300);
  });
});

// Khởi tạo hình ảnh sản phẩm mặc định
document.addEventListener("DOMContentLoaded", function () {
  const productImages = document.querySelectorAll(".product-image");
  productImages.forEach((image) => {
    // Tạo hình ảnh sản phẩm mặc định với màu sắc khác nhau
    const colors = ["#2c3e50", "#34495e", "#7f8c8d", "#95a5a6", "#bdc3c7"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    image.style.background = `linear-gradient(135deg, ${randomColor}40, ${randomColor}80)`;
  });
});
