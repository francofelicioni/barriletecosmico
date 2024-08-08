import productServices from "../services/product.services.js";
import { logger } from "../utils/logger.js";

const getAll = async (req, res, next) => {
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
            ? res.json({ status: 200,  message: 'Success', products })
            : res.json({ status: 200, message: 'Not products found' });

    } catch (error) {
        logger.error(error)
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productServices.getById(id);
        return res.status(200).json({ status: 'success', payload: product });
    } catch (error) {
        logger.log('error', error.message);
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const productData = req.body;
        const newProduct = await productServices.create(productData);

        return res.status(200).json({ status: 'success', payload: newProduct })
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

const update = async (req, res, next) => {
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
        next(error);
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await productServices.getById(id);
        if (!product) return res.status(404).json({ status: 'Error', message: `Product with id ${id} not found` })

        await productServices.deleteOne(id);
        return res.status(200).json({ status: 'success', message: 'Product deleted' });

    } catch (error) {
        next(error);
    }
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne   
}