Vue.component('cart',
    /* Компонент для корзины */
    {
    props: ['cartItems', 'img', 'visibility'],
    // cartItems - массив с содержимым корзины
    // img - картинка для продукта в корзине
    // visibility - условие видимости

    template: `
        <div class="cart-block" v-show="visibility"> <!-- выводим в цикле все элементы массива -->
            <!-- item - элемент массива с информацией о продукте в корзине -->
            <!-- item.id_product - идентификатор продукта в корзине -->
            <cart-item v-for="item of cartItems" 
                :key="item.id_product"
                :img="img"  
                :cart-item="item">
            </cart-item>
        </div>`
    });

Vue.component('cart-item',
    /* Компонент для каждого продукта в корзине */
    {
    props: ['img', 'cartItem'],
    template: `
        <div class="cart-item">
            <div class="product-bio">
                <img :src="img" alt="Some img">
                <div class="product-desc">
                    <div class="product-title">{{ cartItem.product_name }}</div>  <!-- Наименование товара -->
                    <div class="product-quantity">Количество: {{ cartItem.quantity }}</div>  <!-- Количество -->
                    <div class="product-single-price">$ {{ cartItem.price }} за единицу</div> <!-- Цена -->
                </div>
            </div>
            <div class="right-block">
                <div class="product-price">{{ cartItem.quantity * cartItem.price }}</div>  <!-- Сумма всего по товару -->
                <button class="del-btn" @click="$parent.$emit('remove', cartItem)">&times;</button>  <!-- Кнопка удалить -->
            </div>
        </div>`
})