import { productResponseDto } from "../dto/product-response.dto.js";
import productsRepository from "../persistence/mongo/repositories/products.repository.js";
import error from '../errors/customErrors.js';

const getAll = async (query, options) => {
    return await productsRepository.getAll(query, options);
}

const getById = async (id) => {
    const productData = await productsRepository.getById(id);
    if (!productData) throw error.notFound(`Product with id ${id} not found!`);
    const product = productResponseDto(productData);
    return product;
}

const create = async (data) => {
    const product = await productsRepository.create(data);
    if (!product) throw error.notFound(`There was an error creating the product!`);
    return product;
}

const update = async (id, data) => {
    const product = await productsRepository.update(id, data)
    if (!product) throw error.notFoundError(`Product id ${id} not found`)
    return product
}

const destroy = async (id) => {
    const product = await productsRepository.deleteOne(id)
    if (!product) throw error.notFoundError(`Product id ${id} not found`)
    return product
}

export default {
    getAll,
    getById,
    create,
    update,
    destroy
}

