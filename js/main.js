
// main script js for cart icon

// main.js
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
