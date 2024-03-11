let cartItems = [];

function addToCart(productName, price) {
    cartItems.push({ name: productName, price: price });
    displayCart();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    displayCart();
}

function displayCart() {
    const cartElement = document.querySelector('#cartTableBody');
    const cartCountElement = document.querySelector('#cartCount');
    const totalPriceElement = document.getElementById('totalPrice');

    cartElement.innerHTML = '';
    let totalPrice = 0;
    let productCount = {};

    cartItems.forEach(item => {
        if (productCount[item.name]) {
            productCount[item.name]++;
        } else {
            productCount[item.name] = 1;
        }
        totalPrice += item.price;
    });

    cartCountElement.textContent = cartItems.length;

    for (let productName in productCount) {
        const amount = productCount[productName];
        const unitPrice = cartItems.find(item => item.name === productName).price;
        const totalProductPrice = unitPrice * amount;
        const row = cartElement.insertRow();
        const nameCell = row.insertCell(0);
        const amountCell = row.insertCell(1);
        const unitPriceCell = row.insertCell(2);
        const totalProductPriceCell = row.insertCell(3);
        const removeButtonCell = row.insertCell(4);
        nameCell.textContent = productName;
        amountCell.textContent = amount;
        unitPriceCell.textContent = `$${unitPrice}`;
        totalProductPriceCell.textContent = `$${totalProductPrice}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-button';
        removeButton.onclick = function() {
            removeFromCart(cartItems.findIndex(item => item.name === productName));
        };
        removeButtonCell.appendChild(removeButton);
    }

    totalPriceElement.textContent = `Total Price: $${totalPrice}`;
}

function toggleCartDetails() {
    const cartDetails = document.querySelector('#cartDetails');
    if (cartDetails.style.display === 'none') {
        cartDetails.style.display = 'block';
    } else {
        cartDetails.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const cartDetails = document.querySelector('#cartDetails');
    cartDetails.style.display = 'none';

    document.querySelector('#showHideCart').onclick = toggleCartDetails;

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.onclick = function() {
            const productName = button.getAttribute('data-product');
            const productPrice = parseFloat(button.getAttribute('data-price'));
            addToCart(productName, productPrice);
        };
    });
});
