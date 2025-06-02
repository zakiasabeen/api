let productData = [];

fetch('https://api.escuelajs.co/api/v1/products')
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    console.log("api data", data);
    productData = data;
    renderProducts();
  })
  .catch(function(error) {
    console.error("Error fetching products:", error);
  });

function renderProducts() {
  let container = document.getElementById("container");
  
  // Clear previous content
  container.innerHTML = '';
  
  for(let i = 0; i < productData.length; i++) {
    let product = productData[i];
    console.log(product);
    
    // Use the first available image or empty string if none
    const imageUrl = product.images && product.images.length > 0 ? product.images[0] : '';
    
    container.innerHTML += `
      <div class="product">
        <div>
          <img src="${imageUrl}" width="100px" height="100px" alt="${product.title}">
          <p>$${product.price}</p>
          <p>${product.title}</p>
        </div>
      </div>
    `;
  }
}