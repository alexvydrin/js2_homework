Vue.component('products',
    /* Компонент для списка товаров на сайте (каталог) */
    {
        props: ['products', 'img'],
        // products - массив со списком товаров на сайте
        // img - картинка для продукта в каталоге
        template: `
        <div class="products">
            <!-- выводим в цикле все элементы массива -->
            <!-- item - элемент массива с информацией о продукте в каталоге -->
            <product v-for="item of products"
                :key="item.id_product" 
                :img="img"
                :product="item">
            </product>
       </div>`
    });

Vue.component('product',
    /* Компонент для каждого товара на сайте (товар в каталоге) */
    {
        props: ['product', 'img'],
        template: `
        <div class="product-item">
            <img :src="img" alt="Some img">
            <div class="desc">
                <h3>{{product.product_name}}</h3>
                <p>{{product.price}}</p>
                <button class="buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
            </div>
        </div>`
    })
