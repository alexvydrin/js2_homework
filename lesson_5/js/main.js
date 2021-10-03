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

const app = new Vue({
    el: '#app',  // Контейнер на html странице
    data: {
        userSearch: '',  // Строка для поиска (фильтра)
        showCart: false,  // По умолчанию страница не показана
        catalogUrl: '/catalogData.json', // Источник данных для списка продуктов на сайте
        cartUrl: '/getBasket.json', // // Источник данных для списка продуктов в корзине
        cartItems: [], // Массив для списка продуктов на сайте
        filtered: [], // Массив для списка продуктов на сайте после использования фильтра
        imgCart: 'https://placehold.it/50x100', // Картинка для продукта в каталоге
        products: [], // Массив для списка продуктов в корзине
        imgProduct: 'https://placehold.it/200x150'  // Картинка для продукта в корзине
    },
    methods: {

        getJson(url) {
            // Делаем запрос к API и в случае успеха возвращаем результат
            return fetch(url)
                .then(result => result.json())// Успешное завершение
                .catch(error => console.log(error)) // Неудача
        },

        addProduct(item) {
            // Добавляем продукт в корзину
            this.getJson(`${API}/addToBasket.json`) // Узнаем есть ли разрешение - пока флаг хранится в файле
                .then(data => {
                    if (data.result === 1) { // Есть разрешение
                        let find = this.cartItems.find(el => el.id_product === item.id_product);
                        if (find) { // Такой продукт уже есть в корзине
                            find.quantity++;  // Увеличиваем количество на единицу
                        } else { // Такого продукта еще нет в корзине
                            const prod = Object.assign({quantity: 1}, item); //создание нового объекта на основе двух, указанных в параметрах
                            this.cartItems.push(prod)
                        }
                    }
                })
        },

        remove(item) {
            // Удаляем продукт из корзины
            this.getJson(`${API}/addToBasket.json`) // Узнаем есть ли разрешение - пока флаг хранится в файле
                .then(data => {
                    if (data.result === 1) { // Есть разрешение
                        if (item.quantity > 1) { // Такой продукт еще есть в корзине и больше 1
                            item.quantity--; // Уменьшаем количество на единицу
                        } else { // Товар всего 1 - удаляем продут полностью из корзины
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },

        filter() {
            // Фильтр
            let regexp = new RegExp(this.userSearch, 'i'); // Получаем регулярное выражение из строки поиска

            // this.filtered = this.filtered.filter(el => regexp.test(el.product_name));
            this.filtered = this.products.filter(el => regexp.test(el.product_name)); // Лучше будем накладывать фильтр на исходный полный список продуктов
        }
    },

    mounted() {
        // Этот блок выполняется в первую очередь после загрузки

        // Считываем из API данные о товарах в корзине
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents) {
                    this.cartItems.push(item);
                }
            });

        // Считываем из API данные о товарах в каталоге
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data) {
                    this.products.push(item);
                    this.filtered.push(item);
                }
            });

    }

});
