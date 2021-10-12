const express = require('express'); // фреймворк для создания веб-приложений на Node.js
const fs = require('fs'); // для работы с файлами
const cart = require('./cartRouter'); // файл js с путями
const app = express();

app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/cart', cart);

app.get('/api/products', (req, res) => {
    fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}))
        } else {
            res.send(data);
        }
    })
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port} ....`));
