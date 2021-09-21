class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();//вывод товаров на страницу
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }

    getSum() {
        // Суммарная стоимость всех товаров
        let sumTotal = 0;
        for (let product of this.goods) {
            sumTotal += product.price;
        }
        alert(`Суммарная стоимость всех товаров = ${sumTotal}`);
    }

}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item">
                <img src="${this.img}" alt="product">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

let list = new ProductList();

// list.getSum();
document.getElementById("calculate").addEventListener('click', () => {
    list.getSum();
})

class Basket {
    addProduct() {
        // Добавляем продукт в корзину
    }

    removeProduct() {
        // Удаляем продукт из корзины
    }

    changeProduct() {
        // Изменяем количество продукта в корзине
    }

    render() {
        // Отрисовка
    }
}

class BasketItem {
    render() {
        // Отрисовка
    }
}
