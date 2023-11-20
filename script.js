let cart = {
    'qaz':  { 
        "name" : "PS4",
        "count" : 0,
        "price" : 50.99,
    },
    'wsx': { 
        "name" : "PS5",
        "count" : 0,
        "price" : 100.99,
    },
    'edc': { 
        "name" : "X Box",
        "count" : 0,
        "price" : 50.99,
    },
    'rfv': { 
        "name" : "Nintendo Switch",
        "count" : 0,
        "price" : 32.99,
    },
};

document.onclick = event => {
    if (event.target.classList.contains('plus')) {
        plusFunction(event.target.dataset.id);
    }
    if (event.target.classList.contains('minus')) {
        minusFunction(event.target.dataset.id);
    }
    if (event.target.id === 'clear-cart') {
        clearCart();
    }
}

const plusFunction = id => {
    if (!cart[id]) {
        cart[id] = {
            "name": "New Product",
            "count": 0,
            "price": 0.0,
        };
    }
    cart[id]['count']++;
    renderCart();
}

const minusFunction = id => {
    if (cart[id] && cart[id]['count'] - 1 === 0) {
        deleteFunction(id);
        return true;
    }
    if (cart[id]) {
        cart[id]['count']--;
        renderCart();
    }
}

const deleteFunction = id => {
    delete cart[id];
    renderCart();
}

const clearCart = () => {
    cart = {};
    renderCart();
}

const renderCart = () => {
    const cartContent = document.getElementById('cart-content');
    cartContent.innerHTML = '';

    let totalCost = 0;

    for (const productId in cart) {
        if (cart.hasOwnProperty(productId) && cart[productId]['count'] > 0) {
            const product = cart[productId];
            const productContainer = document.createElement('div');
            productContainer.textContent = `${product.name} - Quantity: ${product.count} - Price: ${product.count * product.price}`;
            cartContent.appendChild(productContainer);

            totalCost += product.count * product.price;
        }
    }

    const totalContainer = document.createElement('div');
    totalContainer.textContent = `Total Cost: ${totalCost}`;
    cartContent.appendChild(totalContainer);
}

renderCart();