import customErrors from "../errors/customErrors.js";
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
            return res.status(200).json({ status: 'success', products })
        }

        if (category) {
            const products = await productServices.getAll({ category }, options)
            return res.status(200).json({ status: 'success', products })
        }

        const products = await productServices.getAll({}, options);

        return products.docs.length
            ? res.json({ status: 200, message: 'Success', products })
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
        logger.error(error)
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const productData = req.body;
        const newProduct = await productServices.create(productData, req.user);

        return res.status(201).json({ status: 'success', payload: newProduct })
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

        if (!dataUpdated) throw customErrors.notFound(`Product id ${id} not found`);
        return res.status(200).json({ status: 'success', payload: dataUpdated })

    } catch (error) {
        logger.error(error)
        next(error);
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await productServices.destroy(pid, req.user);
        if (!product) return res.status(404).json({ status: "Error", msg: `Product with id ${pid} not found` });

        res.status(200).json({ status: "success", payload: "Product deleted" });
    } catch (error) {
        next(error);
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne
}