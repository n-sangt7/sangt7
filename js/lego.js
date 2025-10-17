// Lego Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Product data
  const products = {
    1: {
      title: "Millennium Falcon 75192",
      image:
        "https://www.lego.com/cdn/cs/set/assets/blt77a1155656c76f7b/75192.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1",
      currentPrice: "12.990.000₫",
      originalPrice: "14.990.000₫",
      pieces: "7,541 miếng",
      age: "18+",
      dimensions: "84cm x 56cm x 21cm",
      specs: [
        "Bộ Lego Star Wars lớn nhất từ trước đến nay",
        "Chi tiết bên trong cực kỳ phức tạp và chân thực",
        "Có thể tháo các tấm panel để lộ chi tiết bên trong",
        "Bao gồm 10 nhân vật mini-figures",
        "Kích thước: 84cm x 56cm x 21cm",
      ],
    },
    2: {
      title: "Imperial Star Destroyer 75252",
      image:
        "https://www.lego.com/cdn/cs/set/assets/blt6d56e149e7d8a7b7/75252.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1",
      currentPrice: "8.990.000₫",
      originalPrice: "9.990.000₫",
      pieces: "4,784 miếng",
      age: "16+",
      dimensions: "110cm x 66cm x 44cm",
      specs: [
        "Mô hình Star Destroyer lớn nhất từ trước đến nay",
        "Chi tiết bên trong đầy đủ với cầu thang và phòng điều khiển",
        "Bao gồm 2 mini-figures và 2 droids",
        "Có giá đỡ trưng bày đi kèm",
        "Kích thước: 110cm x 66cm x 44cm",
      ],
    },
    3: {
      title: "AT-AT 75288",
      image:
        "https://www.lego.com/cdn/cs/set/assets/blt5a9c5e25f4c4c6b5/75288.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1",
      currentPrice: "4.990.000₫",
      originalPrice: "5.490.000₫",
      pieces: "1,267 miếng",
      age: "9+",
      dimensions: "40cm x 24cm x 28cm",
      specs: [
        "Mô hình AT-AT chi tiết với chân có thể điều chỉnh",
        "Bao gồm 6 mini-figures và 1 speeder bike",
        "Có thể mở thân để đặt mini-figures bên trong",
        "Phù hợp cho trẻ em từ 9 tuổi trở lên",
        "Kích thước: 40cm x 24cm x 28cm",
      ],
    },
    4: {
      title: "Lamborghini Sian 42115",
      image:
        "https://www.lego.com/cdn/cs/set/assets/blt77a1155656c76f7b/42115.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1",
      currentPrice: "7.990.000₫",
      originalPrice: "8.490.000₫",
      pieces: "3,696 miếng",
      age: "18+",
      dimensions: "60cm x 25cm x 13cm",
      specs: [
        "Mô hình Lamborghini Sian FKP 37 chi tiết",
        "Hộp số 8 tốc độ với bánh răng thay đổi",
        "Hệ thống treo và hệ thống lái hoạt động",
        "Cửa mở theo kiểu cánh bướm",
        "Kích thước: 60cm x 25cm x 13cm",
      ],
    },
    5: {
      title: "Porsche 911 RSR 42096",
      image:
        "https://www.lego.com/cdn/cs/set/assets/blt6d56e149e7d8a7b7/42096.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1",
      currentPrice: "3.990.000₫",
      originalPrice: "4.490.000₫",
      pieces: "1,580 miếng",
      age: "10+",
      dimensions: "50cm x 20cm x 13cm",
      specs: [
        "Mô hình Porsche 911 RSR chi tiết",
        "Hộp số 6 tốc độ với bánh răng thay đổi",
        "Hệ thống lái và động cơ boxy hoạt động",
        "Thiết kế thể thao với decal chi tiết",
        "Kích thước: 50cm x 20cm x 13cm",
      ],
    },
    6: {
      title: "Liebherr R 9800 42100",
      image:
        "https://www.lego.com/cdn/cs/set/assets/blt5a9c5e25f4c4c6b5/42100.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1",
      currentPrice: "15.990.000₫",
      originalPrice: "16.990.000₫",
      pieces: "4,108 miếng",
      age: "11+",
      dimensions: "65cm x 27cm x 39cm",
      specs: [
        "Mô hình máy xúc Liebherr R 9800 điều khiển từ xa",
        "Điều khiển thông qua ứng dụng LEGO Control+",
        "4 động cơ Smart Hub tích hợp",
        "Có thể di chuyển, xoay và đào đất",
        "Kích thước: 65cm x 27cm x 39cm",
      ],
    },
    7: {
      title: "Police Station 60246",
      image:
        "https://www.lego.com/cdn/cs/sandbox/assets/blt5a9c5e25f4c4c6b5/60246.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1",
      currentPrice: "1.990.000₫",
      originalPrice: "2.290.000₫",
      pieces: "856 miếng",
      age: "6+",
      dimensions: "37cm x 25cm x 15cm",
      specs: [
        "Đồn cảnh sát thành phố với 3 tầng",
        "Bao gồm 6 mini-figures và chó nghiệp vụ",
        "Có nhà tù, phòng điều tra và garage",
        "Xe cảnh sát và trực thăng đi kèm",
        "Kích thước: 37cm x 25cm x 15cm",
      ],
    },
    8: {
      title: "Fire Station 60215",
      image:
        "https://www.lego.com/cdn/cs/set/assets/blt6d56e149e7d8a7b7/60215.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1",
      currentPrice: "1.290.000₫",
      originalPrice: "1.490.000₫",
      pieces: "494 miếng",
      age: "5+",
      dimensions: "25cm x 19cm x 12cm",
      specs: [
        "Trạm cứu hỏa với garage và tháp huấn luyện",
        "Bao gồm 4 mini-figures lính cứu hỏa",
        "Xe cứu hỏa và xe tải với thang mở rộng",
        "Phù hợp cho trẻ em từ 5 tuổi trở lên",
        "Kích thước: 25cm x 19cm x 12cm",
      ],
    },
    9: {
      title: "Space Rocket 60228",
      image:
        "https://www.lego.com/cdn/cs/set/assets/blt5a9c5e25f4c4c6b5/60228.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1",
      currentPrice: "1.590.000₫",
      originalPrice: "1.790.000₫",
      pieces: "837 miếng",
      age: "6+",
      dimensions: "58cm x 18cm x 12cm",
      specs: [
        "Tên lửa không gian với bệ phóng chi tiết",
        "Bao gồm 3 mini-figures phi hành gia",
        "Rover thám hiểm và vệ tinh đi kèm",
        "Tên lửa có thể tách thành nhiều tầng",
        "Kích thước: 58cm x 18cm x 12cm",
      ],
    },
    10: {
      title: "Fiat 500 10271",
      image:
        "https://www.lego.com/cdn/cs/set/assets/blt77a1155656c76f7b/10271.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1",
      currentPrice: "2.490.000₫",
      originalPrice: "2.790.000₫",
      pieces: "960 miếng",
      age: "18+",
      dimensions: "24cm x 11cm x 11cm",
      specs: [
        "Mô hình Fiat 500 cổ điển chi tiết",
        "Mui trần có thể mở và ghế ngồi điều chỉnh",
        "Động cơ 4 xi-lanh với pít-tông hoạt động",
        "Màu sắc pastel và decal cổ điển",
        "Kích thước: 24cm x 11cm x 11cm",
      ],
    },
    11: {
      title: "London Bus 10258",
      image:
        "https://www.lego.com/cdn/cs/set/assets/blt6d56e149e7d8a7b7/10258.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1",
      currentPrice: "2.190.000₫",
      originalPrice: "2.490.000₫",
      pieces: "1,686 miếng",
      age: "16+",
      dimensions: "34cm x 16cm x 14cm",
      specs: [
        "Mô hình xe buýt London Routemaster cổ điển",
        "Màu đỏ đặc trưng với các chi tiết trang trí",
        "Tầng trên có thể tháo rời để dễ dàng chơi",
        "Bánh xe lớn và cabin tài xế chi tiết",
        "Kích thước: 34cm x 16cm x 14cm",
      ],
    },
    12: {
      title: "Roller Coaster 10261",
      image:
        "https://www.lego.com/cdn/cs/set/assets/blt5a9c5e25f4c4c6b5/10261.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1",
      currentPrice: "7.490.000₫",
      originalPrice: "7.990.000₫",
      pieces: "4,124 miếng",
      age: "16+",
      dimensions: "88cm x 41cm x 53cm",
      specs: [
        "Mô hình tàu lượn siêu tốc hoạt động",
        "Động cơ tích hợp để đưa tàu lên đỉnh",
        "Bao gồm 2 xe tàu lượn và 11 mini-figures",
        "Có trạm kiểm soát, quầy bán vé và các tiện ích",
        "Kích thước: 88cm x 41cm x 53cm",
      ],
    },
    13: {
      title: "Empire State Building 21046",
      image:
        "https://www.lego.com/cdn/cs/set/assets/blt77a1155656c76f7b/21046.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1",
      currentPrice: "2.290.000₫",
      originalPrice: "2.590.000₫",
      pieces: "1,767 miếng",
      age: "12+",
      dimensions: "55cm x 20cm x 12cm",
      specs: [
        "Mô hình Empire State Building chi tiết",
        "Thiết kế theo phong cách Art Deco",
        "Bao gồm tấm biển tên bằng kim loại",
        "Phù hợp để trưng bày trong văn phòng hoặc nhà",
        "Kích thước: 55cm x 20cm x 12cm",
      ],
    },
    14: {
      title: "The White House 21054",
      image:
        "https://www.lego.com/cdn/cs/set/assets/blt6d56e149e7d8a7b7/21054.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1",
      currentPrice: "1.990.000₫",
      originalPrice: "2.290.000₫",
      pieces: "1,483 miếng",
      age: "12+",
      dimensions: "26cm x 26cm x 14cm",
      specs: [
        "Mô hình Nhà Trắng chi tiết với cảnh quan xung quanh",
        "Bao gồm tòa nhà chính và hai cánh Đông Tây",
        "Có hàng rào, đài phun nước và cây cối",
        "Tấm biển thông tin bằng kim loại đi kèm",
        "Kích thước: 26cm x 26cm x 14cm",
      ],
    },
    15: {
      title: "Taj Mahal 21056",
      image:
        "https://www.lego.com/cdn/cs/set/assets/blt5a9c5e25f4c4c6b5/21056.png?format=webply&fit=bounds&quality=70&width=800&height=800&dpr=1",
      currentPrice: "3.490.000₫",
      originalPrice: "3.790.000₫",
      pieces: "2,022 miếng",
      age: "18+",
      dimensions: "43cm x 43cm x 24cm",
      specs: [
        "Mô hình Taj Mahal chi tiết với kiến trúc Mughal",
        "Bao gồm mái vòm trung tâm và bốn tháp góc",
        "Có hồ nước phản chiếu và khu vườn",
        "Tấm biển thông tin bằng kim loại đi kèm",
        "Kích thước: 43cm x 43cm x 24cm",
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
  const modalPieces = document.getElementById("modalPieces");
  const modalAge = document.getElementById("modalAge");
  const modalDimensions = document.getElementById("modalDimensions");
  const modalSpecs = document.getElementById("modalSpecs");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");
  const wishlistButtons = document.querySelectorAll(".btn-wishlist");
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");

  // Filter functionality
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const category = this.getAttribute("data-category");

      // Show all products if "all" is selected
      if (category === "all") {
        productCards.forEach((card) => {
          card.style.display = "block";
        });
        document.querySelectorAll(".category-section").forEach((section) => {
          section.style.display = "block";
        });
      } else {
        // Hide all products first
        productCards.forEach((card) => {
          card.style.display = "none";
        });
        document.querySelectorAll(".category-section").forEach((section) => {
          section.style.display = "none";
        });

        // Show products of selected category
        const selectedProducts = document.querySelectorAll(
          `.product-card[data-category="${category}"]`
        );
        selectedProducts.forEach((card) => {
          card.style.display = "block";
        });

        // Show the category section
        document.getElementById(category).style.display = "block";
      }
    });
  });

  // Product detail modal functionality
  document.querySelectorAll(".btn-details").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");
      const product = products[productId];

      if (product) {
        modalImage.src = product.image;
        modalTitle.textContent = product.title;
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
  modalClose.addEventListener("click", function () {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Close modal when clicking outside
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Wishlist functionality
  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector("i");
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

  // Search functionality
  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", function (e) {
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
      document.querySelectorAll(".category-section").forEach((section) => {
        section.style.display = "block";
      });
      return;
    }

    // Hide all products first
    productCards.forEach((card) => {
      card.style.display = "none";
    });
    document.querySelectorAll(".category-section").forEach((section) => {
      section.style.display = "none";
    });

    // Show products that match the search term
    let foundResults = false;
    productCards.forEach((card) => {
      const productName = card
        .querySelector(".product-name")
        .textContent.toLowerCase();
      if (productName.includes(searchTerm)) {
        card.style.display = "block";
        card.closest(".category-section").style.display = "block";
        foundResults = true;
      }
    });

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
      background: var(--accent);
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
    }, 100);

    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Cart functionality
  const cartButtons = document.querySelectorAll(".btn-buy");
  const cartCount = document.querySelector(".cart-count");

  cartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let count = parseInt(cartCount.textContent);
      count++;
      cartCount.textContent = count;
      showNotification("Đã thêm vào giỏ hàng");
    });
  });

  // User authentication simulation
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const logoutLink = document.getElementById("logout-link");

  // Simulate login (for demo purposes)
  loginLink.addEventListener("click", function (e) {
    e.preventDefault();
    loginLink.style.display = "none";
    registerLink.style.display = "none";
    logoutLink.style.display = "inline";
    showNotification("Đăng nhập thành công");
  });

  logoutLink.addEventListener("click", function (e) {
    e.preventDefault();
    loginLink.style.display = "inline";
    registerLink.style.display = "inline";
    logoutLink.style.display = "none";
    showNotification("Đã đăng xuất");
  });

  // Add some interactive effects
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Add parallax effect to decorations
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;

    document.querySelector(".decoration-top-left").style.transform =
      "translateY(" + rate + "px)";
    document.querySelector(".decoration-top-right").style.transform =
      "translateY(" + rate * 0.7 + "px)";
    document.querySelector(".decoration-bottom-left").style.transform =
      "translateY(-" + rate * 0.3 + "px)";
    document.querySelector(".decoration-bottom-right").style.transform =
      "translateY(-" + rate * 0.5 + "px)";
  });
});
