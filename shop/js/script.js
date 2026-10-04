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

// элементы корзины

const cartButton = document.querySelector('.cart-button');
const cartPanel = document.querySelector('.cart-panel');
const cartOverlay = document.querySelector('.cart-overlay');
const cartClose = document.querySelector('.cart-close');


// открыть корзину

function openCart() {
    cartPanel.classList.add('active');
    cartOverlay.classList.add('active');
}


// закрыть корзину

function closeCart() {
    cartPanel.classList.remove('active');
    cartOverlay.classList.remove('active');
}

cartButton.addEventListener('click', openCart);

cartClose.addEventListener('click', closeCart);

cartOverlay.addEventListener('click', closeCart);