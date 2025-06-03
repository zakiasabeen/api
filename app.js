// Global variables
let products = [];
let cart = [];

// DOM elements
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const errorMessageElement = document.getElementById('errorMessage');
const productGridElement = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const cartCountElement = document.getElementById('cartCount');
const retryButton = document.getElementById('retryButton');

// Initialize the page
document.addEventListener('DOMContentLoaded', fetchProducts);

// Fetch products from API
async function fetchProducts() {
  try {
    // Show loading, hide error and product grid
    loadingElement.classList.remove('hidden');
    errorElement.classList.add('hidden');
    productGridElement.classList.add('hidden');

    const response = await fetch('https://dummyjson.com/products');
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    products = data.products;
    displayProducts(products);

    // Hide loading, show product grid
    loadingElement.classList.add('hidden');
    productGridElement.classList.remove('hidden');
  } catch (err) {
    // Show error message
    loadingElement.classList.add('hidden');
    errorMessageElement.textContent = err.message;
    errorElement.classList.remove('hidden');
  }
}

// Display products in the grid
function displayProducts(productsToDisplay) {
  productGridElement.innerHTML = productsToDisplay.map(product => `
    <div class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div class="product-image">
        <img 
          src="${product.thumbnail}" 
          alt="${product.title}" 
        >
      </div>
      <div class="p-4">
        <h3 class="font-bold text-lg text-gray-800 mb-1">${product.title}</h3>
        <p class="text-gray-500 text-sm mb-2">${product.category}</p>
        <p class="product-description text-gray-600 text-sm mb-4">${product.description}</p>
        <div class="flex justify-between items-center mb-4">
          <span class="font-bold text-green-600">$${product.price}</span>
          <span class="bg-yellow-500 text-white text-xs px-2 py-1 rounded">⭐ ${product.rating}</span>
        </div>
        <button 
          onclick="addToCart(${product.id})"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}
// Add product to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    cartCountElement.textContent = cart.length;
    
    // Show a quick confirmation
    const button = event.target;
    button.textContent = 'Added!';
    button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
    button.classList.add('bg-green-500', 'hover:bg-green-600');
    
    setTimeout(() => {
      button.textContent = 'Add to Cart';
      button.classList.remove('bg-green-500', 'hover:bg-green-600');
      button.classList.add('bg-blue-600', 'hover:bg-blue-700');
    }, 1000);
  }
}

// Search/filter products
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm) || 
    product.category.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts);
});

// Retry button event listener
retryButton.addEventListener('click', fetchProducts);

// Make addToCart available globally
window.addToCart = addToCart;