import { productResponseDto } from "../dto/product-response.dto.js";
import productsRepository from "../persistence/mongo/repositories/products.repository.js";

const getAll = async (query, options) => {
    return await productsRepository.getAll(query, options);
}

const getById = async (id) => {
    const productData = await productsRepository.getById(id);
    const product = productResponseDto(productData);
    return product;
}

const create = async (data) => {
    return await productsRepository.create(data);
}

const update = async (id, data) => {
    return await productsRepository.update(id, data);
}

const destroy = async (id) => {
    return await productsRepository.deleteOne(id);
}

export default {
    getAll,
    getById,
    create,
    update,
    destroy
}

