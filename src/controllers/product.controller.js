import { productModel } from "../persistence/mongo/models/product.model.js";
import productServices from "../services/product.services.js";


const getAll = async (req, res) => {
    try {
        const { limit, page, sort, category, status } = req.query;

        const options = {
            limit: Number(limit) || 10,
            page: Number(page) || 1,
            sort: { price: sort === "asc" ? 1 : -1 },
            lean: true,
        };

        if (status) {
            const products = await productServices.getAll({ status }, options)
            return res.status(200).json({status: 'success', products})
        }

        if (category) {
            const products = await productServices.getAll({ category }, options)
            return res.status(200).json({status: 'success', products})
        }

        const products = await productServices.getAll({}, options);

        return products.docs.length
            ? res.json({ status: 200, products })
            : res.json({ status: 200, message: 'Not products founded' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'Error', message: "500 Internal Server Error" });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productServices.getById(id);

        if (!product) return res.status(404).json({ status: "Error", response: `Product with id ${id} not founded!` });

        return res.status(200).json({ status: 'success', payload: product });
    } catch (error) {
        console.log(error)
        return res.json({ status: error.status || 500, response: error.message || "Error" })
    }
}

const create = async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await productServices.create(productData);

        return res.status(201).json({ status: 'Success', payload: newProduct });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const productData = req.body

        const dataUpdated = await productServices.update(id, productData)

        if (!dataUpdated) {
            res.status(404).json({ status: "Error", meesage: `Not found product with id ${id}` })
        }

        return res.status(200).json({ status: 'success', payload: dataUpdated })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

const deleteOne = async (req, res) => {
    try {
        const { id } = req.params;
        const productToDelete = await productModel.findById(id);

        if (productToDelete) {
            await productServices.destroy(id);
            return res.json({ status: 200, message: 'Product deleted' })
        }

        throw new Error(`Product with id ${id} not founded!`);

    } catch (error) {
        console.log(error);
        res.json({ status: error.status, response: error.message })
    }
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne
}