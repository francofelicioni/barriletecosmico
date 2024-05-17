import { Router } from "express";
import { productModel } from "../dao/models/product.model.js";
import productDao from "../dao/mongoDao/product.dao.js";

const router = Router();

router.get('/', readAll);
router.get('/:id', read);
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy);

async function readAll(_req, res) {
    try {
        const products = await productDao.getProducts();
        return products.length
            ? res.json({ status: 200, payload: products })
            : res.json({ status: 200, message: 'Not Found' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
async function read(req, res) {
    try {
        const { id } = req.params;
        const product = await productDao.getProductById(id);

        if (product) {
            return res.json({ status: 200, payload: product })
        }

        return res.json({ status: 404, response: `Not founded for id ${id}!`});

    } catch (error) {
        console.log(error)
        return res.json({ status: error.status || 500, response: error.message || "Error" })
    }
}

async function create(req, res) {
    try {
        const { body } = req;
        const newProduct = await productDao.createProduct(body);

        if (newProduct) {
            return res.status(201).json({status: "Success", payload:newProduct});
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
        const productData = req.body;

        const dataUpdated = await productDao.updateProductById(id, productData)

        res.status(201).json({status: 'success', payload: dataUpdated});

    } catch (error) {
        console.log(error)
        res.json({ status: error.status || 500, response: error.message || 'Error' })
    }
}

async function destroy(req, res) {
    try {
        const { id } = req.params;
        const productToDelete = await productModel.findById(id);

        if (productToDelete) {
            await productDao.deleteProductById(id);
            return res.json({ status: 200, message: 'Product deleted' })
        }

        throw new Error(`Product not founded!`);

    } catch (error) {
        console.log(error);
        res.json({ status: error.status, response: error.message })
    }
}

export default router;