import { Router } from "express";
import { productModel } from "../dao/models/products.model.js";

const router = Router();

router.get('/', readAll);
router.get('/:_id', read);
router.post('/', create)
router.put('/:_id', update)
router.delete('/:_id', destroy);

async function readAll(req, res) {
    try {
        const { limit, category } = req.query;
        let products = await productModel.find();

        if (limit > 0) {
            products = products.slice(0, parseInt(limit));
        }

        if (category) {
            products = await productModel.find(category);
        }

        if (products.length === 0) {
            products = [];
        }

        return products
            ? res.json({ status: 200, response: products })
            : res.json({ status: 200, message: 'Not Found' });
    } catch (error) {
        return res.json({ status: 500, response: error.message });
    }
}

async function read(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.json({ status: 404, response: `Not founded for id ${id}!`});
        }

        const data = await productModel.findById(id);

        if (data) {
            return res.json({ status: 200, response: data })
        }

        throw new Error(`Error when fetching data!`);

    } catch (error) {
        console.log(error)
        return res.json({ status: error.status || 500, response: error.message || "Error" })
    }
}

async function create(req, res) {
    try {
        const { body } = req;
        const newProduct = await productModel.create(body);

        if (newProduct) {
            return res.status(201).json(newProduct);
        }

        throw new Error('Error: no data to create a new resource!');

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}


async function update(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;

        const dataUpdated = await productModel.findByIdAndUpdate(id, data)

        res.status(201).json(dataUpdated);

    } catch (error) {
        console.log(error)
        res.json({ status: error.status || 500, response: error.message || 'Error' })
    }
}

async function destroy(req, res) {
    try {
        const { id } = req.params;
        const data = await productModel.findById(Number(id));

        if (data) {
            await productModel.findByIdAndDelete(parseInt(id));
            return res.json({ status: 200, message: 'Product deleted' })
        }

        throw new Error(`Product not founded!`);

    } catch (error) {
        console.log(error);
        res.json({ status: error.status, response: error.message })
    }
}

export default router;