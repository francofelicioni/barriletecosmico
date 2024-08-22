import customErrors from "../errors/customErrors.js";
import cartsRepository from "../persistence/mongo/repositories/carts.repository.js";
import productsRepository from "../persistence/mongo/repositories/products.repository.js";

const getById = async (id) => {
   const cart = await cartsRepository.getById(id);
   if (!cart) throw customErrors.notFound(`Cart with id ${id} not found!`);
   return cart;
}

const create = async () => {
    return await cartsRepository.create()
}

const addProductToCart = async (cid, pid, user) => {
    if (user.role === 'premium' && product.owner !== user._id) {
        throw customErrors.unAuthorized("Only the owner can add a product");
    }

    return await cartsRepository.addProductToCart(cid, pid);
}

const updateProductQuantityInCart = async (cartId, productId, quantity) => {
    return await cartsRepository.updateProductQuantityInCart(cartId, productId, quantity);
}

const deleteProductFromCart = async (cid, pid) => {
    return await cartsRepository.deleteProductFromCart(cid, pid);    
};

const deleteAllProductsInCart = async (cartId) => {
    const cart = cartsRepository.getById(cartId);
    if (!cart) throw customErrors.notFound(`Cart with id ${cartId} not found!`);
    return cart;
}

const purchaseCart = async (cid) => {
    const cart = await cartsRepository.getById(cid);
    let total = 0;
    const products = [];

    // Use a for loop to iterate over the cart products as it is more predictable in terms of handling the asynchronous nature of the code 
    // (for each does not do this)
    for (const cartProduct of cart.products) {
        const product = await productsRepository.getById(cartProduct.product);

        if ( product.stock >= cartProduct.quantity ) {
            total += prod.price * cartProduct.quantity;
        } else {
            products.push(cartProduct)
        }

        //Modify cart products
        await cartsRepository.updateCart(cid, products);  
    }

    return total;
}

export default {
    getById,
    create,
    deleteProductFromCart,
    addProductToCart,
    updateProductQuantityInCart,
    deleteAllProductsInCart,
    purchaseCart
}