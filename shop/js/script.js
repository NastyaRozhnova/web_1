const addButtons = document.querySelectorAll('.add-button');
const cartCount = document.querySelector('.cart-count');

const cartButton = document.querySelector('.cart-button');
const cartPanel = document.querySelector('.cart-panel');
const cartOverlay = document.querySelector('.cart-overlay');
const cartClose = document.querySelector('.cart-close');

const cartItems = document.querySelector('.cart-items');
const cartTotalPrice = document.querySelector('.cart-total-price');

const products = Array.from(
    document.querySelectorAll('.product-card')
).map(card => {

    const button = card.querySelector('.add-button');

    return {
        id: Number(button.dataset.id),

        artist: card.querySelector('.artist').textContent,

        title: card.querySelector('h3').textContent,

        price: Number(
            card
                .querySelector('.price')
                .textContent
                .replace(/\D/g, '')
        ),

        image: card.querySelector('.album-cover').src
    };
});


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

        updateCart();
    });
});

// обновление корзины

function updateCart() {

    updateCartCount();

    renderCart();

    updateTotalPrice();
}


// количество товаров

function updateCartCount() {

    const totalCount = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cartCount.textContent = totalCount;
}


// отображение товаров

function renderCart() {

    cartItems.innerHTML = '';

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="cart-empty">
                В корзине пока пусто 💿
            </p>
        `;

        return;
    }


    cart.forEach(item => {

        const product = products.find(
            product => product.id === item.id
        );


        const cartItem = document.createElement('div');

        cartItem.classList.add('cart-item');


        cartItem.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.title}"
                class="cart-item-image"
            >

            <div class="cart-item-info">

                <p class="cart-item-artist">
                    ${product.artist}
                </p>

                <h3>
                    ${product.title}
                </h3>

                <p class="cart-item-price">
                    ${product.price.toLocaleString('ru-RU')} ₽
                </p>


                <div class="cart-item-bottom">

                    <div class="quantity-controls">

                        <button
                            class="quantity-button"
                            data-action="minus"
                            data-id="${item.id}"
                        >
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            class="quantity-button"
                            data-action="plus"
                            data-id="${item.id}"
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="remove-button"
                        data-action="remove"
                        data-id="${item.id}"
                    >
                        Удалить
                    </button>

                </div>

            </div>
        `;


        cartItems.appendChild(cartItem);
    });
}


// плюс минус и удаление

cartItems.addEventListener('click', event => {

    const button = event.target.closest('button');

    if (!button) {
        return;
    }


    const productId = Number(button.dataset.id);

    const action = button.dataset.action;

    const item = cart.find(
        item => item.id === productId
    );


    if (action === 'plus') {

        item.quantity++;

    }


    if (action === 'minus') {

        if (item.quantity > 1) {
            item.quantity--;
        }

    }


    if (action === 'remove') {

        cart = cart.filter(
            item => item.id !== productId
        );

    }


    updateCart();
});


// подсчёт общей стоимости

function updateTotalPrice() {

    const total = cart.reduce((sum, item) => {

        const product = products.find(
            product => product.id === item.id
        );

        return sum + product.price * item.quantity;

    }, 0);


    cartTotalPrice.textContent =
        `${total.toLocaleString('ru-RU')} ₽`;
}


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
updateCart();