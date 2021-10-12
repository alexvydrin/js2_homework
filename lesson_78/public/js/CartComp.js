Vue.component('cart', {
    data() {
        return {
            imgCartDir: '/img/product_img/prod_thumbs/',
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {

            let find = this.cartItems.find(el => el.id_product === product.id_product);
            console.log(find);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    })
            }
        },
        remove(product) {
            for (let i = 0; i < this.cartItems.length; i++) {
                if (this.cartItems[i].id_product === +product.id_product) {

                    this.$parent.deleteJson(`/api/cart/${this.cartItems[i].id_product}`, this.cartItems[i])
                        .then(data => {
                            if (data.result === 1) {
                                this.cartItems[i].quantity -= 1;
                                if (this.cartItems[i].quantity === 0) {
                                    this.cartItems.splice(i, 1)
                                }

                            }
                        })
                }
            }
        }


    },
    mounted() {
        // this.$on('remove', this.remove);
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    }
    ,
    template: `
<div>
            <button class="btn-cart basket-btn" type="button" @click="showCart = !showCart"></button>
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Cart is empty</p>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                :imgCartDir="imgCartDir"
                @remove="remove">
                </cart-item>
            </div>
</div>`
})
    ;
Vue.component('cart-item', {
    props: ['cartItem', 'imgCartDir'],

    data() {
        let cart_img = this.imgCartDir + this.cartItem.id_product + ".png"
        return {
            cart_img,
        }
    },

    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="this.cart_img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
                            <p class="product-single-price">$ {{cartItem.price}} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
});