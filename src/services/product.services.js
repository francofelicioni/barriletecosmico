import { productResponseDto } from "../dto/product-response.dto.js";
import productsRepository from "../persistence/mongo/repositories/products.repository.js";
import error from '../errors/customErrors.js';
import customErrors from "../errors/customErrors.js";
import { sendMail } from "../utils/emailSender.js";

const getAll = async (query, options) => {
    return await productsRepository.getAll(query, options);
}

const getById = async (pid) => {
    const productData = await productsRepository.getById(pid);
    if (!productData) throw customErrors.notFound(`Product with id ${pid} not found!`);
    const product = productResponseDto(productData);

    return product;
}

const create = async (data, user) => {
    let productData = data;

    if (user.role === 'premium') {
        productData = {
            ...data,
            owner: user.email
        }
    }

    const product = await productsRepository.create(productData);
    if (!productData) throw error.notFound(`There was an error creating the product!`);

    return product;
}

const update = async (id, data) => {
    const product = await productsRepository.update(id, data)
    if (!product) throw error.notFoundError(`Product id ${id} not found`)
    return product
}

const destroy = async (id, user) => {
    const productData = await productsRepository.getById(id);
    if (user.role === "premium" && productData.owner !== user.email) {
        throw customErrors.unAuthorized("User not authorized");
    }

    if (user.role === 'admin' && productData.owner !== 'admin') {
        await sendMail(productData.owner, "Product deleted", `The product with id ${id}, and title ${productData.title} was deleted by admin user`)
    }

    const product = await productsRepository.deleteOne(id);

    return product;
};

export default {
    getAll,
    getById,
    create,
    update,
    destroy
}

