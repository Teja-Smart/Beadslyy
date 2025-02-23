document.addEventListener('DOMContentLoaded', () => {
    console.log('Cart page loaded'); // Debug 1

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Initial cart data:', cart); // Debug 2
    const cartItemsContainer = document.getElementById('cart-items-container');
    const totalPriceElement = document.getElementById('total-price');

    console.log('Container elements:', {cartItemsContainer, totalPriceElement}); // Debug 3

    function updateCartDisplay() {

        console.log('Updating cart display...'); // Debug 4
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            console.log('Processing item:', item); // Debug 5
            total += item.price * item.quantity;
            
            if(!item.price || !item.name) {
                console.warn('Invalid item at index', index, item);
                return;
            }
            
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