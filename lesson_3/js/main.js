const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// API - по этому адресу хранятся данные для отображения на сайте:
// catalogData.json - список товаров на сайте
// - id_product - Код продукта
// - product_name - Название продукта
// - price - Цена
// getBasket.json - список товаров в корзине
// - contents:
// -- id_product - Код продукта
// -- product_name - Название продукта
// -- price - Цена
// -- quantity - Количество в корзине

class ProductsList {
    // Список товаров на сайте

    constructor(container = '.products') {
        // container - блок по умолчанию куда выводим список товаров
        this.container = container;
        this.goods = []; //массив товаров
        this.allProducts = []; //массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render() //вывод товаров на страницу

                // Тест функции calcSum
                // alert(`Суммарная стоимость всех товаров = ${list.calcSum()}`);

            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    calcSum() {
        // Суммарная стоимость всех товаров
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            // Выводим каждый товар
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}

class ProductItem {
    // Отдельный товар

    constructor(product, img = 'img/product.png') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {
        // Верстка для каждого товара
        return `<div class="product-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn">Купить</button>
                    </div>
                </div>`
    }
}

let list = new ProductsList();


class Basket {
    // Корзина, список всех товаров в корзине

    constructor(container = '.cart-block') {
        // container - блок по умолчанию куда выводим элементы корзины
        this.container = container;
        this.goods = []; // массив товаров для вывода

        this._clickBasket(); // Присваиваем событие для переключения режима (click -> toggle)

        this._getBasketItem()  // Получаем содержимое
            .then(data => { //data - объект js
                this.goods = [...data.contents];  // данные о товарах находятся в разделе contents
                this.render()
            });
    }


    _getBasketItem() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }


    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new BasketItem();
            // Выводим каждый товар в корзине
            block.insertAdjacentHTML('beforeend', productObj.render(product));
        }
    }

    _clickBasket() {
        // Для кнопки корзины вешаем событие click для переключения режима показа содержимого корзины
        document.querySelector(".btn-cart").addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
    }

}

class BasketItem {
    // Отдельный товар в корзине

    render(product, img = 'img/product.png') {
        // Верстка для каждого товара
        return `<div class="cart-item" data-id="${product.id_product}">
                    <div class="product-bio">
                        <img src="${img}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${product.product_name}</p>
                            <p class="product-quantity">Quantity: ${product.quantity}</p>
                            <p class="product-single-price">$${product.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">$${product.quantity * product.price}</p>
                        <button class="del-btn" data-id="${product.id_product}">&times;</button>
                    </div>
                </div>`
    }
}

let bask = new Basket();
