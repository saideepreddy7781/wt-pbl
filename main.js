document.addEventListener('DOMContentLoaded', function() {
    const cart = [];
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.closest('.product');
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.getAttribute('data-name');
            const productPrice = parseFloat(productElement.getAttribute('data-price'));

            const existingProductIndex = cart.findIndex(item => item.id === productId);

            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            updateCart();
        });
    });

    function updateCart() {
        cartCountElement.textContent = cart.length;
        cartItemsElement.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItemElement = document.createElement('li');
            cartItemElement.textContent = ` ₹{item.name} =  ₹ ₹{item.price.toFixed(2)} x  ₹{item.quantity}`;
            cartItemsElement.appendChild(cartItemElement);
            total += item.price * item.quantity;
        });

        if (cart.length === 0) {
            cartItemsElement.innerHTML = '<li>No items in cart.</li>';
        }

        cartTotalElement.textContent = total.toFixed(2);
    }
});
