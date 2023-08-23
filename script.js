document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItems = document.querySelector('.cart-items');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            const productContainer = event.target.parentElement;
            const productName = productContainer.querySelector('.product-name').textContent;
            const productPrice = parseFloat(productContainer.querySelector('.product-price').textContent.replace('$', ''));
            
            let cartItem = cartItems.querySelector(`[data-product="${productName}"]`);
            
            if (cartItem) {
                const quantityElement = cartItem.querySelector('.cart-quantity');
                const quantity = parseInt(quantityElement.textContent) + 1;
                quantityElement.textContent = quantity;
                
                const totalPriceElement = cartItem.querySelector('.cart-total-price');
                const totalPrice = (quantity * productPrice).toFixed(2);
                totalPriceElement.textContent = `$${totalPrice}`;
            } else {
                cartItem = document.createElement('li');
                cartItem.classList.add('cart-item');
                cartItem.dataset.product = productName;
                
                const quantityElement = document.createElement('span');
                quantityElement.classList.add('cart-quantity');
                quantityElement.textContent = '1';
                
                const totalPriceElement = document.createElement('span');
                totalPriceElement.classList.add('cart-total-price');
                totalPriceElement.textContent = `$${productPrice.toFixed(2)}`;
                
                const removeFromCartBtn = document.createElement('button');
                removeFromCartBtn.classList.add('remove-from-cart-btn');
                removeFromCartBtn.textContent = 'Remove';

                removeFromCartBtn.addEventListener('click', function () {
                    cartItem.remove();
                });

                cartItem.appendChild(quantityElement);
                cartItem.appendChild(document.createTextNode(` x ${productName} - `));
                cartItem.appendChild(totalPriceElement);
                cartItem.appendChild(removeFromCartBtn);
                cartItems.appendChild(cartItem);
            }
        });
    });
});
