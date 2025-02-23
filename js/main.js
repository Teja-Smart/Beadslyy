

// main.js

// products
const products = [
    {
      id: 1,
      name: "Classic Men's Shirt",
      price: 50,
      description:
        "A timeless classic, crafted with high-quality cotton for all-day comfort. Perfect for both casual and formal wear.",
      images: ["images/p1.png", "images/p1.png", "images/p1.png"],
    },
    {
      id: 2,
      name: "Premium Formal Shirt",
      price: 75,
      description:
        "Upgrade your wardrobe with this premium formal shirt. Designed with a modern fit and breathable fabric for ultimate style and comfort.",
      images: ["images/p2.png", "images/p2.png", "images/p2.png"],
    },
    {
      id: 3,
      name: "Elegant Women's Dress",
      price: 50,
      description:
        "A beautifully designed dress that combines elegance with comfort. Made with lightweight fabric for a graceful look.",
      images: ["images/p3.png", "images/p3.png", "images/p3.png"],
    },
    {
      id: 4,
      name: "Chic Summer Dress",
      price: 50,
      description:
        "Stay cool and stylish with this chic summer dress. The vibrant colors and soft fabric make it a must-have for warm days.",
      images: ["images/p4.png", "images/p4.png", "images/p4.png"],
    },
    {
      id: 5,
      name: "Casual Polo T-Shirt",
      price: 50,
      description:
        "A perfect blend of casual and sporty. This breathable cotton polo T-shirt is great for everyday wear and outdoor activities.",
      images: ["images/p5.png", "images/p5.png", "images/p5.png"],
    },
    {
      id: 6,
      name: "Luxury Silk Saree",
      price: 50,
      description:
        "Embrace traditional elegance with this luxurious silk saree. Perfect for weddings, parties, and festive occasions.",
      images: ["images/p6.png", "images/p6.png", "images/p6.png"],
    },
    {
      id: 7,
      name: "Trendy Denim Jacket",
      price: 50,
      description:
        "Add an edge to your outfit with this trendy denim jacket. A versatile piece that pairs well with any casual look.",
      images: ["images/p7.png", "images/p7.png", "images/p7.png"],
    },
    {
      id: 8,
      name: "Modern Women's Blazer",
      price: 50,
      description:
        "Stay stylish and professional with this modern women's blazer. Tailored for a sharp and confident look.",
      images: ["images/p8.png", "images/p8.png", "images/p8.png"],
    },
    {
      id: 9,
      name: "Comfy Cotton Kurta",
      price: 50,
      description:
        "A blend of tradition and comfort. This soft cotton kurta is perfect for both casual and festive occasions.",
      images: ["images/p9.png", "images/p9.png", "images/p9.png"],
    },
    {
      id: 10,
      name: "Stylish Hooded Sweatshirt",
      price: 50,
      description:
        "A cozy and stylish hoodie, perfect for chilly days. Features a soft fleece lining for extra warmth and comfort.",
      images: ["images/p10.png", "images/p10.png", "images/p10.png"],
    },
    {
      id: 11,
      name: "Athletic Sports Tracksuit",
      price: 50,
      description:
        "Stay active in style with this athletic tracksuit. Made with stretchable and breathable fabric for maximum performance.",
      images: ["images/p11.png", "images/p11.png", "images/p11.png"],
    },
    {
      id: 12,
      name: "Elegant Party Gown",
      price: 50,
      description:
        "Turn heads at any event with this elegant party gown. Designed with intricate details and a flowing silhouette.",
      images: ["images/p12.png", "images/p12.png", "images/p12.png"],
    },
  ];
  

// generate products in HTML


// 2. Modified generation function
function generateProducts() {
    const productContainer = document.querySelector('.product_section .row');
    
    // Clear existing content
    productContainer.innerHTML = '';
    
    products.forEach(product => {
        const productHTML = `
            <div class="col-sm-6 col-md-4 col-lg-4">
                <div class="box">
                    <div class="option_container">
                        <div class="options">
                            <button class="add-to-cart" 
                                  data-name="${product.name}"
                                  data-price="${product.price}"
                                  data-image="${product.images[0]}">
                                Add to Cart
                            </button>
                            <a href="productInfo.html?id=${product.id}" class="option2">
                                Buy Now
                            </a>
                        </div>
                    </div>
                    <div class="img-box">
                        <img src="${product.images[0]}" alt="${product.name}">
                    </div>
                    <div class="detail-box">
                        <h5>${product.name}</h5>
                        <h6>$${product.price}</h6>
                    </div>
                </div>
            </div>
        `;
        productContainer.insertAdjacentHTML('beforeend', productHTML);
    });
}


// main script js for cart icon
// clearning local storage 
localStorage.clear();
generateProducts();

document.addEventListener('DOMContentLoaded', () => {
    // Add to Cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = {
                name: button.dataset.name,
                price: parseFloat(button.dataset.price),
                image: button.dataset.image
            };
            addToCart(product);
        });
    });

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.name === product.name);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({...product, quantity: 1});
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} added to cart!`);
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartBadge = document.getElementById('cart-badge');
        const floatingCart = document.querySelector('.floating-cart');
        
        cartBadge.textContent = cart.length;
        
        if (cart.length > 0) {
            floatingCart.classList.add('visible');
        } else {
            floatingCart.classList.remove('visible');
        }
    }

    // Initial cart count
    updateCartCount();
});
