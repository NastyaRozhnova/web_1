const addButtons = document.querySelectorAll('.add-button');
const cartCount = document.querySelector('.cart-count');

let cart = [];

addButtons.forEach(button => {
    button.addEventListener('click', () => {

        const productId = Number(button.dataset.id);

        const productInCart = cart.find(
            item => item.id === productId
        );

        if (productInCart) {
            productInCart.quantity++;
        } else {
            cart.push({
                id: productId,
                quantity: 1
            });
        }

        updateCartCount();
    });
});


function updateCartCount() {

    const totalCount = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cartCount.textContent = totalCount;
}