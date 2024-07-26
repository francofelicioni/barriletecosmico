import cartsRepository from "../persistence/mongo/repositories/carts.repository.js";

const getById = async (id) => {
   return await cartsRepository.getById(id);
}

const create = async () => {
    return await cartsRepository.create()
}

const addProductToCart = async (cid, pid) => {
    return await cartsRepository.addProductToCart(cid, pid);
}

const updateProductQuantityInCart = async (cartId, productId, quantity) => {
    return await cartsRepository.updateProductQuantityInCart(cartId, productId, quantity);
}

const deleteProductFromCart = async (cid, pid) => {
    return await cartsRepository.deleteProductFromCart(cid, pid);    
};

const deleteAllProductsInCart = async (cartId) => {
    return await cartsRepository.deleteAllProductsInCart(cartId);
}

export default {
    getById,
    create,
    deleteProductFromCart,
    addProductToCart,
    updateProductQuantityInCart,
    deleteAllProductsInCart,
}