
        // Load cart from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        function updateCartDisplay() {
            const container = document.getElementById('cart-items-container');
            const totalElement = document.getElementById('total-price');
            let total = 0;
            
            container.innerHTML = '';
            
            cart.forEach((item, index) => {
                total += item.price * item.quantity;
                
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h3>${item.name}</h3>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <div class="quantity-controls">
                            <button onclick="changeQuantity(${index}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="changeQuantity(${index}, 1)">+</button>
                            <button onclick="removeItem(${index})">🗑️ </button>
                        </div>
                    </div>
                `;
                container.appendChild(itemDiv);
            });

            totalElement.textContent = `Total: $${total.toFixed(2)}`;
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function changeQuantity(index, delta) {
            cart[index].quantity += delta;
            if (cart[index].quantity < 1) cart.splice(index, 1);
            updateCartDisplay();
        }

        function removeItem(index) {
            cart.splice(index, 1);
            updateCartDisplay();
        }

        // Initial cart display
        updateCartDisplay();

        // Checkout button handler
        document.getElementById('checkout-btn').addEventListener('click', () => {
            alert('Redirecting to checkout...');
            // Add actual checkout logic here
        });