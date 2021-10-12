Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: '/img/product_img/',
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products latest-proj-flex-container">
            <product v-for="item of filtered" :key="item.id_product" :imgCatalog="imgCatalog" :product="item"></product>
        </div>
    `
});

Vue.component('product', {
    props: ['product', 'imgCatalog'],

    data() {
        let product_img = this.imgCatalog + this.product.id_product + ".jpg"
        return {
            product_img,
        }
    },


    template: `
    <div class="product-item latest-proj-article-preview">
                
            <div class="card">
                <div class="card-image">
                    <figure class="image is-4by4">
                        <img :src="this.product_img" alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                    <div class="media-content">
                        <p class="title is-4 my-0">{{product.product_name}}</p>
                        <p class="subtitle is-6 my-0">{{product.product_cat}}</p>
                        <p class="subtitle is-6 my-0">{{product.price}} RUB</p>
                    </div>
                </div>
                      
                <footer class="card-footer">
                    <button class="buy-btn slider-link-btn button is-link is-small is-outlined" @click="$root.$refs.cart.addProduct(product)"><span class="slider-link-btn-txt">Купить</span></button>
                </footer>
            </div>
    `
})