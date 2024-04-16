import express from 'express';
import productManager from './src/data/fs/productManager.js';

const port = 8080;
const ready = console.log(`Server ready on port ${port}`);

const app = express();
app.listen(port, ready);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const response = {
        status: 200,
        message: 'Welcome to Barrilete Cósmico'
    };
    res.json(response);
});
app.get('/products', readAll);
app.get('/products/:id', read);
app.post('/products', create)
app.put('/products/:id', update)
app.delete('/products/:id', destroy);

async function readAll(req, res) {
    try {
        const { limit, category } = req.query;
        const data = await productManager.getProducts();

        if (limit > 0) {
            (data.splice(parseInt(limit)));
        }

        if (category) {
            data = await productManager.getProducts(category);
        }

        return (data.length > 0)
            ? res.json({ status: 200, response: data })
            : res.json({ status: 200, message: 'Not Found' });

    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message })
    }
}

async function read(req, res) {
    try {
        const { id } = req.params;
        const data = await productManager.getProductById(Number(id));

        if (data) {
            return res.json({ status: 200, response: data })
        }

        throw new Error(`Not founded for id ${id}!`);

    } catch (error) {
        console.log(error)
        return res.json({ status: error.status || 500, response: error.message || "Error" })
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const newData = await productManager.addProduct(data)

        if (newData) {
            return res.json({
                status: 200,
                response: data,
            })
        }

        throw new Error(`Error: no data to create a new resource!`);

    } catch (error) {
        console.log(error)
        res.json({ status: error.status || 500, response: error.message || 'Error' })
    }

}

async function update(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;

        if (data) {
            const dataUpdated = await productManager.updateProduct(id, data)
            return res.json({ status: 200, response: dataUpdated })
        }

        throw new Error(`Not founded for id ${id}!`);

    } catch (error) {
        console.log(error)
        res.json({ status: error.status || 500, response: error.message || 'Error' })
    }
}

async function destroy(req, res) {
    try {
        const { id } = req.params;
        if (id) {
            const data = await productManager.getProductById(parseInt(id));
            if (data) {
                await productManager.deleteProduct(parseInt(id));
                return res.json({ status: 200, response: data })
            }
        }

        throw new Error(`Not founded for id ${id}!`);

    } catch (error) {
        console.log(error);
        res.json({ status: error.status, response: error.message })
    }
}
