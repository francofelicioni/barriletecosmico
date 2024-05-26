import { Router } from "express";
import { productModel } from "../dao/models/product.model.js";
import productDao from "../dao/mongoDao/product.dao.js";

const router = Router();

router.get('/', readAll);
router.get('/:id', read);
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', destroy);

async function readAll(req, res) {
    try {
        const { limit, page, sort, category, status } = req.query;

        const options = {
            limit: Number(limit) || 10,
            page: Number(page) || 1,
            sort: { price: sort === "asc" ? 1 : -1 },
            lean: true,
        };

        if (status) {
            const products = await productDao.getProducts({ status }, options)
            return res.status(200).json(products)
        }

        if (category) {
            const products = await productDao.getProducts({ category }, options)
            return res.status(200).json(products)
        }

        const products = await productDao.getProducts({}, options);

        console.log(products)

        return products.docs.length
            ? res.json({ status: 200, products })
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
        const { id } = req.params
        const productData = req.body

        const dataUpdated = await productDao.updateProductById(id, productData)

        if (!dataUpdated) {
            res.status(404).json({ status:"Error", meesage: `Not found product with id ${id}`})
        }

        return res.status(200).json({status: 'success', payload: dataUpdated})

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
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

        throw new Error(`Product with id ${id} not founded!`);

    } catch (error) {
        console.log(error);
        res.json({ status: error.status, response: error.message })
    }
}

export default router;