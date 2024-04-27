import { Router } from "express";
import productManager from "../data/fs/managers/productManager.js";

const router = Router();

router.get('/', readAll);
router.get('/:id', read);
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy);

async function readAll(req, res) {
    try {
        const { limit, category } = req.query;
        let data = await productManager.getProducts();

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

        //res.status(201).json(newData);

        if (newData) {
            return res.json({
                status: 200,
                response: data,
            })
        }

        //res.status(201).json(newData)

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

        const dataUpdated = await productManager.updateProduct(id, data)
       
        res.status(201).json(dataUpdated);

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

export default router;