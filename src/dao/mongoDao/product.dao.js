import { productModel } from "../models/product.model.js";


const getProducts = async (query, options = {}) => {
    const products = await productModel.paginate(query, options);
    return products;
};

const getProductById = async id => {
    const product = await productModel.findById(id);
    return product;
};

const createProduct = async (data) => {
    const newProduct = await productModel.create(data);
    return newProduct;
};

const updateProductById = async (id, data) => {
    const updatedProduct = await productModel.findByIdAndUpdate(id, data, { new: true });
    return updatedProduct;
};

const deleteProductById = async (id) => {
    const deletedProduct = await productModel.deleteOne({ _id: id });
    if (!deletedProduct) {
        throw new Error(`Product not found with id ${id}`);
    }

    return { message: 'Product deleted', success: true };
};

export default {
    getProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
}