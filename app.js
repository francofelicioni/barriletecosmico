import express from 'express';
import productManager from './src/fs/productManager.js';

//Create express app/server 
const app = express();

// Initialize app express config
const port = 8080;
const ready = console.log(`Server ready on port ${port}`);


// Initialize server
app.listen(port, ready);
app.use(express.urlencoded({extended: true}));

//Config routes
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
app.get('/products/:id', readOne);


async function read(req, res) {
    try {
        const { category } = req.query;
        let data = await productManager.getProducts();

        if (category) {
           data = await productManager.getProducts(category);
        }
        
        if (data.length > 0) {
            return res.json({status: 200, response: data, category: category})
        }

        return res.json({status: 200, message: 'Not Found'});

    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            response: error.message
        })
    }
}


async function readOne (req, res) {
    try {
        let { id } = req.params;
        const data = await productManager.getProductById(Number(id));
        
        if (data) {
            return res.json({ status: 200, response: data })
        }
       
        const error = new Error (`Not founded for id ${id}!`);
        error.status = 404;
        throw error;

    } catch (error) {
        console.log(error)
        return res.json({ status: error.status || 500, response: error.message || "Error" })
    }
}