const mongoose = require('mongoose');
const express = require('express');
const fs = require('fs');
const rawConfig = fs.readFileSync('config.json');
const config = JSON.parse(rawConfig);
//Demo Test Webhooks Github 1

const dbUrl = config.mongodb;

//process.env.MONGODB_URL || dbUrl || 
const mongourl = process.env.MONGODB_URL || dbUrl;

mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


const productSchema = mongoose.Schema({
    name: String,
    quantity: Number,
});

const Product = mongoose.model('Product', productSchema);

app.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('index',{ products });
    }catch (error) {
        console.error('Error al obtener productos:', error);
        res.render('index', { products: [] });
    }
});
app.post('/add-product', async (req, res) => {
    const { productName, productQuantity } = req.body;

    try {
        const newProduct = new Product({
            name: productName,
            quantity: parseInt(productQuantity)
        });

        const savedProduct = await newProduct.save();
        console.log('Producto agregado:', savedProduct);

        res.redirect('/');
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).send('Error al agregar el producto.');
    }
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000')
})

//Funciones manuales.

async function printProducts() {
    try {
        const products = await Product.find();
        products.forEach(product => {
            console.log(`Product: ${product.name} - Quantity: ${product.quantity}`);
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
    } finally {
        //mongoose.disconnect();
    }
}

async function addProducts(){
    const newProducts = [
      {name:'Producto 1', quantity:5},
      {name:'Producto 4', quantity:7},
      {name:'Producto 9', quantity:23}
    ];

    try{
        const savedProducts = await Product.insertMany(newProducts);
        console.log('Productos agregados');
    }catch(error){
        console.error('Error al agregar productos', error);
    }
}


//addProducts();
printProducts();
