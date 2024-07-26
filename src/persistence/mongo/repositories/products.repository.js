
import { productModel } from "../models/product.model.js";

const getAll = async (query, options) => {
    const products = await productModel.paginate(query, options);
    return products;
}

const getById = async (id) => {
    const product = await productModel.findById(id);
    return product;
}

const create = async (data) => {
    const newProduct = await productModel.create(data);
    return newProduct;
}

const update = async (id, data) => {
    const updatedProduct = await productModel.findByIdAndUpdate(id, data, { new: true });
    return updatedProduct;
}

const deleteOne = async (id) => {
    const deletedProduct = await productModel.deleteOne({ _id: id });
    if (!deletedProduct) {
        throw new Error(`Product not found with id ${id}`);
    }

    return { message: 'Product deleted', success: true };
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne
}

