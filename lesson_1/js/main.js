const products = [
  {id: 1, title: 'Shirt', price: 150 },
  {id: 2, title: 'Socks', price: 50 },
  {id: 3, title: 'Jacket', price: 350 },
  {id: 4, title: 'Shoes', price: 250 },
];

const renderProduct = (product, img='img/product.png') =>
    `<div class="catalog_item">
        <img alt='product' src=${img}>
        <h3>${product.title}</h3>
        <p>${product.price}</p>
        <button class="button_buy">Купить</button>
    </div>`;


const renderPage = list =>
    document.querySelector('.goods-list').innerHTML = list.map(item => renderProduct(item)).join('');


renderPage(products);
