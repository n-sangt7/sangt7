// Product data
const legoProducts = {
  1: {
    id: 1,
    name: "Millennium Falcon 75192",
    category: "starwars",
    currentPrice: "12.990.000₫",
    originalPrice: "14.990.000₫",
    pieces: "7,541 miếng",
    age: "18+",
    dimensions: "84cm x 56cm x 21cm",
    specs: [
      "Mô hình lớn nhất từ trước đến nay với 7,541 chi tiết",
      "Có thể tháo rời để xem bên trong",
      "5 buồng ngủ, buồng chứa hàng hóa và phòng kỹ thuật",
      "7 nhân vật minifigure bao gồm Han Solo, Chewbacca, Princess Leia",
      "Tái hiện chi tiết từ phim Star Wars: The Empire Strikes Back",
    ],
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  2: {
    id: 2,
    name: "Imperial Star Destroyer 75252",
    category: "starwars",
    currentPrice: "8.990.000₫",
    originalPrice: "9.990.000₫",
    pieces: "4,784 miếng",
    age: "16+",
    dimensions: "110cm x 66cm x 44cm",
    specs: [
      "Mô hình Imperial Star Destroyer lớn nhất từ trước đến nay",
      "Chi tiết bên trong cầu tàu và phòng họp",
      "Kèm theo 9 minifigures bao gồm Darth Vader, Admiral Piett",
      "Đế trưng bày với tên sản phẩm",
      "Hoàn hảo để trưng bày trong bộ sưu tập Star Wars",
    ],
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  3: {
    id: 3,
    name: "AT-AT 75288",
    category: "starwars",
    currentPrice: "4.990.000₫",
    originalPrice: "5.490.000₫",
    pieces: "1,267 miếng",
    age: "9+",
    dimensions: "40cm x 24cm x 40cm",
    specs: [
      "Mô hình AT-AT chi tiết với chân có thể di chuyển",
      "Có thể chứa đến 5 minifigures Stormtrooper",
      "Kèm theo 5 minifigures và 1 speeder bike",
      "Tái hiện cảnh tấn công trên hành tinh Hoth",
      "Phù hợp cho trẻ em từ 9 tuổi trở lên",
    ],
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  4: {
    id: 4,
    name: "Lamborghini Sian 42115",
    category: "technic",
    currentPrice: "7.990.000₫",
    originalPrice: "8.490.000₫",
    pieces: "3,696 miếng",
    age: "18+",
    dimensions: "60cm x 25cm x 13cm",
    specs: [
      "Mô hình Lamborghini Sian FKP 37 chi tiết",
      "Hộp số 8 tốc độ với cần gạt",
      "Hệ thống treo trước và sau độc lập",
      "Cửa mở theo kiểu cánh bướm",
      "Màu xanh lá cây đặc trưng của Lamborghini",
    ],
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  5: {
    id: 5,
    name: "Porsche 911 RSR 42096",
    category: "technic",
    currentPrice: "3.990.000₫",
    originalPrice: "4.490.000₫",
    pieces: "1,580 miếng",
    age: "10+",
    dimensions: "50cm x 20cm x 13cm",
    specs: [
      "Mô hình Porsche 911 RSR chi tiết",
      "Động cơ bố trí phía sau với pít-tông chuyển động",
      "Hệ thống lái với vô lăng hoạt động",
      "Cửa mở và khoang động cơ có thể mở ra",
      "Màu đỏ trắng đặc trưng của Porsche Motorsport",
    ],
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  6: {
    id: 6,
    name: "Liebherr R 9800 42100",
    category: "technic",
    currentPrice: "15.990.000₫",
    originalPrice: "16.990.000₫",
    pieces: "4,108 miếng",
    age: "11+",
    dimensions: "65cm x 39cm x 27cm",
    specs: [
      "Mô hình máy xúc Liebherr R 9800 điều khiển từ xa",
      "Điều khiển thông qua ứng dụng LEGO CONTROL+",
      "4 động cơ Power Functions L và 2 động cơ XL",
      "Có thể xoay 360 độ với gầu xúc hoạt động",
      "Mô hình Technic lớn và phức tạp nhất",
    ],
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  7: {
    id: 7,
    name: "Police Station 60246",
    category: "city",
    currentPrice: "1.990.000₫",
    originalPrice: "2.290.000₫",
    pieces: "856 miếng",
    age: "6+",
    dimensions: "37cm x 25cm x 15cm",
    specs: [
      "Trạm cảnh sát 3 tầng với nhà tù",
      "Kèm theo 6 minifigures cảnh sát và tội phạm",
      "Xe cảnh sát, xe tù và trực thăng",
      "Có thể kết hợp với các bộ Lego City khác",
      "Phù hợp cho trẻ em từ 6-12 tuổi",
    ],
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  8: {
    id: 8,
    name: "Fire Station 60215",
    category: "city",
    currentPrice: "1.290.000₫",
    originalPrice: "1.490.000₫",
    pieces: "494 miếng",
    age: "5+",
    dimensions: "25cm x 19cm x 12cm",
    specs: [
      "Trạm cứu hỏa với gara và tầng lầu",
      "Kèm theo 3 minifigures lính cứu hỏa",
      "Xe cứu hỏa và xe cứu thương",
      "Có cột trượt và các phụ kiện cứu hỏa",
      "Phù hợp cho trẻ em từ 5 tuổi trở lên",
    ],
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  9: {
    id: 9,
    name: "Space Rocket 60228",
    category: "city",
    currentPrice: "1.590.000₫",
    originalPrice: "1.790.000₫",
    pieces: "837 miếng",
    age: "6+",
    dimensions: "58cm x 19cm x 12cm",
    specs: [
      "Tên lửa không gian với bệ phóng",
      "Kèm theo 6 minifigures phi hành gia",
      "Rover khám phá và vệ tinh",
      "Tên lửa có thể tách tầng khi phóng",
      "Phù hợp cho trẻ em yêu thích khám phá không gian",
    ],
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  10: {
    id: 10,
    name: "Fiat 500 10271",
    category: "creator",
    currentPrice: "2.490.000₫",
    originalPrice: "2.790.000₫",
    pieces: "960 miếng",
    age: "18+",
    dimensions: "24cm x 11cm x 11cm",
    specs: [
      "Mô hình Fiat 500 cổ điển năm 1960",
      "Màu xanh pastel và trắng ngà",
      "Có thể mở cửa, capo và cốp sau",
      "Bánh xe có thể xoay và vô lăng hoạt động",
      "Hoàn hảo để trưng bày cho người yêu xe cổ",
    ],
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  11: {
    id: 11,
    name: "London Bus 10258",
    category: "creator",
    currentPrice: "2.190.000₫",
    originalPrice: "2.490.000₫",
    pieces: "1,686 miếng",
    age: "16+",
    dimensions: "34cm x 16cm x 14cm",
    specs: [
      "Mô hình xe buýt 2 tầng London Routemaster",
      "Màu đỏ đặc trưng với chi tiết vàng",
      "Có thể mở mái và phần sau để xem bên trong",
      "Bánh xe có thể xoay và biển số xe chi tiết",
      "Hoàn hảo để trưng bày hoặc làm quà tặng",
    ],
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  12: {
    id: 12,
    name: "Roller Coaster 10261",
    category: "creator",
    currentPrice: "7.490.000₫",
    originalPrice: "7.990.000₫",
    pieces: "4,124 miếng",
    age: "16+",
    dimensions: "88cm x 41cm x 53cm",
    specs: [
      "Mô hình tàu lượn siêu tốc hoàn chỉnh",
      "2 xe tàu lượn với 4 chỗ ngồi mỗi xe",
      "Có thể vận hành bằng tay hoặc động cơ",
      "Kèm theo quầy bán vé, cổng vào và đài quan sát",
      "Một trong những bộ Creator Expert phức tạp nhất",
    ],
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  13: {
    id: 13,
    name: "Empire State Building 21046",
    category: "architecture",
    currentPrice: "2.290.000₫",
    originalPrice: "2.590.000₫",
    pieces: "1,767 miếng",
    age: "12+",
    dimensions: "55cm x 20cm x 12cm",
    specs: [
      "Mô hình Empire State Building chi tiết",
      "Thiết kế theo tỷ lệ 1:1250",
      "Tái hiện kiến trúc Art Deco nổi tiếng",
      "Đế trưng bày với tên tòa nhà",
      "Hoàn hảo để trưng bày văn phòng hoặc nhà ở",
    ],
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  14: {
    id: 14,
    name: "The White House 21054",
    category: "architecture",
    currentPrice: "1.990.000₫",
    originalPrice: "2.290.000₫",
    pieces: "1,483 miếng",
    age: "12+",
    dimensions: "46cm x 21cm x 14cm",
    specs: [
      "Mô hình Nhà Trắng Hoa Kỳ chi tiết",
      "Bao gồm tòa nhà chính và 2 cánh Đông Tây",
      "Tái hiện kiến trúc Neoclassical nổi tiếng",
      "Đế trưng bày với tên và cảnh quan xung quanh",
      "Phù hợp cho người yêu thích kiến trúc và lịch sử",
    ],
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  15: {
    id: 15,
    name: "Taj Mahal 21056",
    category: "architecture",
    currentPrice: "3.490.000₫",
    originalPrice: "3.790.000₫",
    pieces: "2,022 miếng",
    age: "18+",
    dimensions: "43cm x 43cm x 24cm",
    specs: [
      "Mô hình Taj Mahal Ấn Độ chi tiết",
      "Thiết kế theo tỷ lệ 1:135",
      "Tái hiện kiến trúc Mughal độc đáo",
      "Bao gồm vòm trung tâm và 4 tháp góc",
      "Đế trưng bày với tên và cảnh quan xung quanh",
    ],
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
};

// DOM Elements
const modal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCurrentPrice = document.getElementById("modalCurrentPrice");
const modalOriginalPrice = document.getElementById("modalOriginalPrice");
const modalPieces = document.getElementById("modalPieces");
const modalAge = document.getElementById("modalAge");
const modalDimensions = document.getElementById("modalDimensions");
const modalSpecs = document.getElementById("modalSpecs");
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const categorySections = document.querySelectorAll(".category-section");
const wishlistButtons = document.querySelectorAll(".btn-wishlist");
const cartCount = document.querySelector(".cart-count");

// Initialize cart count
let cartItems = 0;

// Filter products by category
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");

    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Show/hide products based on category
    if (category === "all") {
      productCards.forEach((card) => {
        card.style.display = "block";
      });
      categorySections.forEach((section) => {
        section.style.display = "block";
      });
    } else {
      productCards.forEach((card) => {
        if (card.getAttribute("data-category") === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

      // Show/hide category sections
      categorySections.forEach((section) => {
        if (section.id === category) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });
    }
  });
});

// Show product details in modal
document.querySelectorAll(".btn-details").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.getAttribute("data-id");
    const product = legoProducts[productId];

    if (product) {
      modalImage.src = product.image;
      modalImage.alt = product.name;
      modalTitle.textContent = product.name;
      modalCurrentPrice.textContent = product.currentPrice;
      modalOriginalPrice.textContent = product.originalPrice;
      modalPieces.textContent = product.pieces;
      modalAge.textContent = product.age;
      modalDimensions.textContent = product.dimensions;

      // Clear previous specs
      modalSpecs.innerHTML = "";

      // Add new specs
      product.specs.forEach((spec) => {
        const li = document.createElement("li");
        li.textContent = spec;
        modalSpecs.appendChild(li);
      });

      // Show modal
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

// Close modal
modalClose.addEventListener("click", () => {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Wishlist functionality
wishlistButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    const icon = button.querySelector("i");

    if (icon.classList.contains("far")) {
      icon.classList.remove("far");
      icon.classList.add("fas");
      icon.style.color = "#cd853f";
      showNotification("Đã thêm vào danh sách yêu thích");
    } else {
      icon.classList.remove("fas");
      icon.classList.add("far");
      icon.style.color = "";
      showNotification("Đã xóa khỏi danh sách yêu thích");
    }
  });
});

// Add to cart functionality
document.querySelectorAll(".btn-buy").forEach((button) => {
  button.addEventListener("click", () => {
    cartItems++;
    cartCount.textContent = cartItems;
    showNotification("Đã thêm vào giỏ hàng");

    // Close modal if it's open
    if (modal.classList.contains("active")) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});

// Search functionality
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", performSearch);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    performSearch();
  }
});

function performSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm === "") {
    // Show all products if search is empty
    productCards.forEach((card) => {
      card.style.display = "block";
    });
    categorySections.forEach((section) => {
      section.style.display = "block";
    });

    // Reset filter buttons
    filterButtons.forEach((btn) => {
      if (btn.getAttribute("data-category") === "all") {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    return;
  }

  // Filter products based on search term
  let foundResults = false;

  productCards.forEach((card) => {
    const productName = card
      .querySelector(".product-name")
      .textContent.toLowerCase();

    if (productName.includes(searchTerm)) {
      card.style.display = "block";
      foundResults = true;
    } else {
      card.style.display = "none";
    }
  });

  // Show/hide category sections based on results
  categorySections.forEach((section) => {
    const productsInSection = section.querySelectorAll(".product-card");
    let hasVisibleProducts = false;

    productsInSection.forEach((card) => {
      if (card.style.display !== "none") {
        hasVisibleProducts = true;
      }
    });

    section.style.display = hasVisibleProducts ? "block" : "none";
  });

  // Update filter buttons
  filterButtons.forEach((btn) => btn.classList.remove("active"));

  if (!foundResults) {
    showNotification("Không tìm thấy sản phẩm nào phù hợp");
  }
}

// Notification function
function showNotification(message) {
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
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 3000;
    transition: all 0.3s ease;
    transform: translateX(100%);
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 10);

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// User authentication simulation
const loginLink = document.getElementById("login-link");
const registerLink = document.getElementById("register-link");
const logoutLink = document.getElementById("logout-link");

// Check if user is logged in (simulated)
const isLoggedIn = localStorage.getItem("legoUserLoggedIn") === "true";

if (isLoggedIn) {
  loginLink.style.display = "none";
  registerLink.style.display = "none";
  logoutLink.style.display = "block";
} else {
  loginLink.style.display = "block";
  registerLink.style.display = "block";
  logoutLink.style.display = "none";
}

// Logout functionality
logoutLink.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("legoUserLoggedIn", "false");
  loginLink.style.display = "block";
  registerLink.style.display = "block";
  logoutLink.style.display = "none";
  showNotification("Đã đăng xuất thành công");
});

// Login simulation
loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("legoUserLoggedIn", "true");
  loginLink.style.display = "none";
  registerLink.style.display = "none";
  logoutLink.style.display = "block";
  showNotification("Đã đăng nhập thành công");
});

// Register simulation
registerLink.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("legoUserLoggedIn", "true");
  loginLink.style.display = "none";
  registerLink.style.display = "none";
  logoutLink.style.display = "block";
  showNotification("Đã đăng ký thành công");
});

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  console.log("Lego page loaded successfully");
});
