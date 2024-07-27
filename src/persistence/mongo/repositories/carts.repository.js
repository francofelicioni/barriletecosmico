import { cartModel } from "../models/cart.model.js";

const getById = async (id) => {
    const cartFounded = cartModel.findById(id);
    return cartFounded;
}

const create = async (data) => {
    const newCart = await cartModel.create(data)
    return newCart;
}

const addProductToCart = async (cid, pid) => {

    const productFounded = await cartModel.findOneAndUpdate(
        { _id: cid, "products.product": pid },
        { $inc: { "products.$.quantity": 1 } },
        { new: true }
    );

    if (!productFounded) {
        return await cartModel.updateOne({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } }, { new: true });
    }

    return productFounded;
}

const deleteProductFromCart = async (cid, pid) => {
    const cartUpdate = await cartModel.findOneAndUpdate(
        { _id: cid, "products.product": pid },
        { $inc: { "products.$.quantity": -1 } },
        { new: true }
    );

    return cartUpdate;
};

const updateProductQuantityInCart = async (cartId, productId, quantity) => {
    const cartUpdated = await cartModel.findByIdAndUpdate(
        { _id: cartId, "products.product": productId },
        { $inc: { "products.$.quantity": quantity } },
        { new: true }
    )

    return cartUpdated;
}

const deleteAllProductsInCart = async (cartId) => {c
    const cart = await cartModel.findByIdAndUpdate(
        cartId,
        { products: [] },
        { new: true }
    );
    return cart;
}

const updateCart = async (cid, products) => {
    const cart = await cartModel.findByIdAndUpdate(cid, { $set: { products } }, { new:true });
    return cart;
}


export default {
    getById,
    create,
    deleteProductFromCart,
    addProductToCart,
    updateProductQuantityInCart,
    deleteAllProductsInCart,
    updateCart
}