const addButtons = document.querySelectorAll('.add-button');
const cartCount = document.querySelector('.cart-count');

const cartButton = document.querySelector('.cart-button');
const cartPanel = document.querySelector('.cart-panel');
const cartOverlay = document.querySelector('.cart-overlay');
const cartClose = document.querySelector('.cart-close');

const cartItems = document.querySelector('.cart-items');
const cartTotalPrice = document.querySelector('.cart-total-price');

const checkoutButton = document.querySelector('.checkout-button');

const orderModal = document.querySelector('.order-modal');
const orderOverlay = document.querySelector('.order-overlay');
const orderClose = document.querySelector('.order-close');
const orderForm = document.querySelector('.order-form');

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


// загружаем сохранённую корзину

let cart = JSON.parse(localStorage.getItem('cart')) || [];


// сохраняем корзину

function saveCart() {
    localStorage.setItem(
        'cart',
        JSON.stringify(cart)
    );
}


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

    saveCart();
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

    cartItems.replaceChildren();

    if (cart.length === 0) {

        const emptyMessage = document.createElement('p');

        emptyMessage.classList.add('cart-empty');

        emptyMessage.textContent = 'В корзине пока пусто 💿';

        cartItems.append(emptyMessage);

        return;
    }


    cart.forEach(item => {

        const product = products.find(
            product => product.id === item.id
        );


        const cartItem = document.createElement('div');

        cartItem.classList.add('cart-item');


        // обложка

        const image = document.createElement('img');

        image.src = product.image;

        image.alt = product.title;

        image.classList.add('cart-item-image');


        // инфо

        const info = document.createElement('div');

        info.classList.add('cart-item-info');


        // исполнитель

        const artist = document.createElement('p');

        artist.classList.add('cart-item-artist');

        artist.textContent = product.artist;


        // название альбома

        const title = document.createElement('h3');

        title.textContent = product.title;


        // цена

        const price = document.createElement('p');

        price.classList.add('cart-item-price');

        price.textContent =
            `${product.price.toLocaleString('ru-RU')} ₽`;


        // нижняя часть

        const bottom = document.createElement('div');

        bottom.classList.add('cart-item-bottom');


        // кнопки количества

        const quantityControls = document.createElement('div');

        quantityControls.classList.add('quantity-controls');


        // минус

        const minusButton = document.createElement('button');

        minusButton.classList.add('quantity-button');

        minusButton.dataset.action = 'minus';

        minusButton.dataset.id = item.id;

        minusButton.textContent = '−';


        // количество

        const quantity = document.createElement('span');

        quantity.textContent = item.quantity;


        // плюс

        const plusButton = document.createElement('button');

        plusButton.classList.add('quantity-button');

        plusButton.dataset.action = 'plus';

        plusButton.dataset.id = item.id;

        plusButton.textContent = '+';


        // удалить

        const removeButton = document.createElement('button');

        removeButton.classList.add('remove-button');

        removeButton.dataset.action = 'remove';

        removeButton.dataset.id = item.id;

        removeButton.textContent = 'Удалить';

        quantityControls.append(
            minusButton,
            quantity,
            plusButton
        );

        bottom.append(
            quantityControls,
            removeButton
        );

        info.append(
            artist,
            title,
            price,
            bottom
        );

        cartItem.append(
            image,
            info
        );

        cartItems.append(cartItem);
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


cartButton.addEventListener(
    'click',
    openCart
);

cartClose.addEventListener(
    'click',
    closeCart
);

cartOverlay.addEventListener(
    'click',
    closeCart
);

updateCart();

function openOrderForm() {

    if (cart.length === 0) {

        alert('Корзина пуста');

        return;
    }

    orderModal.classList.add('active');

    orderOverlay.classList.add('active');
}

function closeOrderForm() {

    orderModal.classList.remove('active');

    orderOverlay.classList.remove('active');
}


checkoutButton.addEventListener(
    'click',
    openOrderForm
);

orderClose.addEventListener(
    'click',
    closeOrderForm
);

orderOverlay.addEventListener(
    'click',
    closeOrderForm
);


// создание заказа

orderForm.addEventListener('submit', event => {

    event.preventDefault();


    alert('Заказ создан!');

    cart = [];

    updateCart();

    orderForm.reset();

    closeOrderForm();

    closeCart();
});
