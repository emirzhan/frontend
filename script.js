    // Check if a user is logged in
    const loggedInUser = localStorage.getItem("loggedInUser");
    const loginButton = document.getElementById("loginButton");

    if (loggedInUser) {
        // If logged in, change the login button text to the user's email
        loginButton.textContent = loggedInUser;
    }

    // Add click event to the login button to handle logout
    loginButton.addEventListener("click", function () {
        if (loggedInUser) {
            // Clear the stored user email and reload the page
            localStorage.removeItem("loggedInUser");
            window.location.reload();
        } else {
            // If not logged in, redirect to login.html
            window.location.href = "login.html";
        }
    });
        // Function to get the logged-in user's email from localStorage
        function getLoggedInUserEmail() {
            return localStorage.getItem("loggedInUserEmail") || null;
        }

        // Function to update the login button text
        function updateLoginButtonText() {
            const loggedInUserEmail = getLoggedInUserEmail();
            const loginButton = document.getElementById("loginButton");

            if (loginButton && loggedInUserEmail) {
                loginButton.textContent = loggedInUserEmail === "admin" ? "Admin" : loggedInUserEmail;
            }
        }

        // New function to handle adding products to the cart
        function addToCart(productId, quantity) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            
            // Check if the product is already in the cart
            const existingProduct = cart.find(item => item.id === productId);

            if (existingProduct) {
                // If the product is already in the cart, update the quantity
                existingProduct.quantity = quantity;
            } else {
                // If the product is not in the cart, add it
                cart.push({ id: productId, quantity });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
        }

        // New function to handle updating the cart view
        function updateCartView() {
            const cartContent = document.getElementById("cart-content");
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            let cartHtml = "<h3>Shopping Cart</h3><ul>";
            let totalPrice = 0;

            cart.forEach(item => {
                // Implement logic to get product details based on the item.id
                // For simplicity, I'll assume a fixed price for each product
                let productPrice = 0;

                switch (item.id) {
                    case 'ps4-controller':
                        productPrice = 50.99;
                        break;
                    case 'xbox-one-controller':
                        productPrice = 55.99;
                        break;
                    case 'switch-controller':
                        productPrice = 49.99;
                        break;
                    case 'ps-move-controller':
                        productPrice = 39.99;
                        break;
                    // Add more cases for additional products
                }

                totalPrice += productPrice * item.quantity;

                cartHtml += `<li>Product ID: ${item.id}, Quantity: ${item.quantity}, Price: ${(productPrice * item.quantity).toFixed(2)}</li>`;
            });

            cartHtml += `</ul><p>Total Price: ${totalPrice.toFixed(2)}</p>`;
            cartContent.innerHTML = cartHtml;
        }

        // New function to handle clearing the cart
        function clearCart() {
            localStorage.removeItem("cart");
        }

        // New function to handle the buy button click
        function handleBuyButtonClick() {
            const loggedInUserEmail = getLoggedInUserEmail();
            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            if (!loggedInUserEmail) {
                alert("You are not logged in. Please log in to proceed with the purchase.");
            } else if (cart.length === 0) {
                alert("Your cart is empty. Please add items to your cart before proceeding.");
            } else {
                alert("Thank you for your purchase!");
                clearCart();
                updateCartView();
            }
        }

        // Event listener for add-to-cart buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                const quantityInput = this.parentElement.querySelector('.quantity-input');
                const quantity = parseInt(quantityInput.value);
                addToCart(productId, quantity);
                updateCartView();
                document.getElementById('buy-button').removeAttribute('disabled');
            });
        });

        // Event listener for clear cart button
        document.getElementById('clear-cart').addEventListener('click', function () {
            clearCart();
            updateCartView();
            document.getElementById('buy-button').setAttribute('disabled', true);
        });

        // Event listener for buy button
        document.getElementById('buy-button').addEventListener('click', handleBuyButtonClick);
        function Timer() {
            var endDate = new Date("2023-11-29 00:00:00");
            var now = new Date();
    
            var timeRemaining = endDate - now;
            if (timeRemaining <= 0) {
                document.getElementById("timer").innerHTML = "Акция закончилась";
            } else {
                var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
                document.getElementById("timer").innerHTML = "Таймер: " + days + " дней, " + hours + " часов, " + minutes + " минут, " + seconds + " секунд";
            }
        }
    
        setInterval(Timer, 1000);

        // Call the function to update the timer when the page loads
        window.onload = function () {
            updateTimer();
            updateLoginButtonText();
            updateCartView();
        };

        setInterval(updateTimer, 1000);