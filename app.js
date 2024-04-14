import express from 'express';
import productManager from '/src/fs/productManager';

//Create express app/server 
const app = express();

// Initialize app express config
const port = 8080;
const ready = console.log(`Server ready on port ${port}`);

// Initialize server
app.listen(port, ready);

//Config req/res
app.get('/', (req, res) => {
    try {
        const message = 'Welcome to kite mania'
        return res.json({
            status: 200,
            message: message
        })

    } catch (error) {
        console.log(error)
        res.json({
            status: 505,
            message: error,
        })
    }
})

app.get('/products', read);

async function read(req, res) {
    try {
        const all = await productManager.getProducts();
        return res.json({
            status: 200,
            response: all
        })
    } catch (error) {
        console.log(err);
        return res.json({
            status: 500,
            response: error.message
        })
    }
}