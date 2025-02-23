document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items-container');
    const totalPriceElement = document.getElementById('total-price');

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" class="cart-item-image" alt="${item.name}">
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" data-index="${index}">+</button>
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;

        // Add event listeners
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                if (e.target.textContent === '-') {
                    updateQuantity(index, -1);
                } else {
                    updateQuantity(index, 1);
                }
            });
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                saveCart();
            });
        });

        document.getElementById('checkout-btn').addEventListener('click', () => {
            alert('Proceeding to checkout!');
        });
    }

    function updateQuantity(index, change) {
        cart[index].quantity += change;
        if (cart[index].quantity < 1) cart.splice(index, 1);
        saveCart();
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    // Initial render
    updateCartDisplay();
});