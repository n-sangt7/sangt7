// Category Page functionality - Using ProductManager from public.js
document.addEventListener("DOMContentLoaded", function () {
  // Detect current page category
  const currentPage = detectCurrentCategory();
  console.log(`🏁 ${currentPage.name} page initialized`);
  
  // Khởi tạo ProductManager cho trang hiện tại
  window.categoryProductManager = new ProductManager(
    currentPage.code, // Category code
    '../php/get_categories.php', 
    '../php/get_products.php'
  );
  
  // Initialize slider
  initSlider();
  
  console.log(`📦 ${currentPage.name} ProductManager initialized:`, window.categoryProductManager);
});

// Detect current category based on URL or page structure
function detectCurrentCategory() {
  const path = window.location.pathname;
  const pageTitle = document.title.toLowerCase();
  
  // Check by URL path
  if (path.includes('dienthoai') || path.includes('phone')) {
    return { code: 'DT', name: 'Điện Thoại' };
  }
  if (path.includes('laptop') || path.includes('maytinh')) {
    return { code: 'LT', name: 'Laptop' };
  }
  if (path.includes('thoitrang') || path.includes('fashion')) {
    return { code: 'TT', name: 'Thời Trang' };
  }
  
  // Check by page title
  if (pageTitle.includes('điện thoại') || pageTitle.includes('phone')) {
    return { code: 'DT', name: 'Điện Thoại' };
  }
  if (pageTitle.includes('laptop') || pageTitle.includes('máy tính')) {
    return { code: 'LT', name: 'Laptop' };
  }
  if (pageTitle.includes('thời trang') || pageTitle.includes('fashion')) {
    return { code: 'TT', name: 'Thời Trang' };
  }
  
  // Default fallback
  console.warn('⚠️ Cannot detect category, using default (TT)');
  return { code: 'TT', name: 'Thời Trang' };
}

// Thêm hàm xử lý danh mục đa cấp
function initMultiLevelCategories() {
  const filterContainer = document.getElementById('categoryFilter');
  if (!filterContainer) return;

  // Xử lý khi click vào danh mục cha
  filterContainer.addEventListener('click', function(e) {
    const button = e.target.closest('.filter-btn');
    if (!button) return;

    const categoryId = button.getAttribute('data-category');
    const isParentCategory = button.hasAttribute('data-has-children');
    
    if (isParentCategory && categoryId !== 'all') {
      e.preventDefault();
      
      // Toggle hiển thị danh mục con
      const subCategories = button.nextElementSibling;
      if (subCategories && subCategories.classList.contains('sub-categories')) {
        subCategories.classList.toggle('show');
      } else {
        // Load danh mục con từ server
        loadSubCategories(categoryId, button);
      }
    }
  });
}

// Hàm load danh mục con
async function loadSubCategories(parentId, parentButton) {
  try {
    const response = await fetch(`../php/get_categories.php?maDMCha=${parentId}`);
    const data = await response.json();

    if (data.success && data.categories.length > 0) {
      // Tạo container cho danh mục con
      const subContainer = document.createElement('div');
      subContainer.className = 'sub-categories';
      
      data.categories.forEach(category => {
        const subButton = document.createElement('button');
        subButton.className = 'filter-btn sub-category-btn';
        subButton.setAttribute('data-category', category.MaDM);
        subButton.innerHTML = `
          ${category.TenDM}
          <span class="product-count">(${category.SoSanPham})</span>
        `;
        subButton.addEventListener('click', () => {
          window.categoryProductManager.loadProducts(category.MaDM);
          window.categoryProductManager.setActiveCategory(subButton);
        });
        subContainer.appendChild(subButton);
      });

      // Chèn sau nút cha
      parentButton.after(subContainer);
      subContainer.classList.add('show');
    }
  } catch (error) {
    console.error('Error loading sub-categories:', error);
  }
}

// Thêm CSS cho danh mục đa cấp
const multiLevelCSS = `
.sub-categories {
  display: none;
  margin-left: 20px;
  border-left: 2px solid #e0e0e0;
  padding-left: 10px;
}

.sub-categories.show {
  display: block;
}

.sub-category-btn {
  background: #f8f9fa !important;
  border: 1px solid #dee2e6 !important;
  margin: 2px 0 !important;
}

.sub-category-btn:hover {
  background: #e9ecef !important;
}

.filter-btn[data-has-children]::after {
  content: ' ▶';
  font-size: 0.8em;
  margin-left: 5px;
}

.filter-btn[data-has-children].expanded::after {
  content: ' ▼';
}
`;

// Thêm CSS vào document
const style = document.createElement('style');
style.textContent = multiLevelCSS;
document.head.appendChild(style);

// Sửa đổi hàm displayCategories trong ProductManager
ProductManager.prototype.displayCategories = function(categories) {
  const filterContainer = document.getElementById('categoryFilter');
  if (!filterContainer) return;

  filterContainer.innerHTML = '';

  // Add "All" button
  const allButton = document.createElement('button');
  allButton.className = 'filter-btn active';
  allButton.setAttribute('data-category', 'all');
  allButton.textContent = 'Tất Cả';
  allButton.addEventListener('click', () => {
    this.loadProducts();
    this.setActiveCategory(allButton);
  });
  filterContainer.appendChild(allButton);

  // Add category buttons với phân cấp
  categories.forEach(category => {
    if (category.MaDM !== this.categoryType) {
      const button = document.createElement('button');
      button.className = 'filter-btn';
      button.setAttribute('data-category', category.MaDM);
      
      // Kiểm tra xem danh mục này có danh mục con không
      const hasChildren = ['TTNA', 'TTNU'].includes(category.MaDM); // Thời trang nam/nữ có con
      if (hasChildren) {
        button.setAttribute('data-has-children', 'true');
      }
      
      button.innerHTML = `
        ${category.TenDM}
        <span class="product-count">(${category.SoSanPham})</span>
      `;
      
      button.addEventListener('click', (e) => {
        if (!hasChildren) {
          this.loadProducts(category.MaDM);
          this.setActiveCategory(button);
        }
        // Nếu có children, sẽ xử lý trong initMultiLevelCategories
      });
      
      filterContainer.appendChild(button);
    }
  });

  // Khởi tạo xử lý danh mục đa cấp
  initMultiLevelCategories();
};