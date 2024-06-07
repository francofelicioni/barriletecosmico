import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";
import productDao from "./product.dao.js";

const getCartById = async (id) => {
    const cartFounded = cartModel.findById(id);
    return cartFounded;
}
const createCart = async (data) => {
    const newCart = await cartModel.create(data)
    return newCart;
}

const addProductToCart = async (cid, pid) => {
    const product = await productModel.findById(pid);
    if (!product) return { product: false };

    const cart = await cartModel.findById(cid);
    if (!cart) { return { cart: false } }

    const productFounded = await cartModel.findOneAndUpdate(
        { _id: cid, "products.product": pid }, 
        { $inc: { "products.$.quantity": 1 } }
    );

    if (!productFounded) {
        await cartModel.updateOne(
            { _id: cid }, 
            { $push: { products: { product: pid, quantity: 1 } } }
        );
    }

    const cartUpdated = await cartModel.findById(cid)
    return cartUpdated
}
const deleteProductFromCart = async (cid, pid) => {
    const product = await productModel.findById(pid);
    if (!product) return { product: false };

    const cart = await cartModel.findOneAndUpdate(
        { _id: cid, "products.product": pid }, 
        { $inc: { "products.$.quantity": -1 } }
    );

    if (!cart) return { cart: false };
    const cartUpdate = await cartModel.findById(cid);

    return cartUpdate;
};

const update = async (cid, data) => {
    await cartModel.updateOne({ _id: cid }, { $set: { products: [] } })
    await cartModel.updateOne({ _id: cid }, { $set: { products: data } })

    const cart = await cartModel.findById(cid)
    return cart
}

const updateProductQuantityInCart = async (cartId, productId, quantity) => {
    const productFounded = await productModel.findById(productId)
    if (!productFounded) return { product: false }

    const cartFounded = await cartModel.findById(cartId)
    if (!cartFounded) return { cart: false }

    const cartUpdated = await cartModel.findByIdAndUpdate(
        cartId,
        { $inc: { "products.$.quantity": quantity } },
        { new: true }
    )

    return cartUpdated
}

const deleteAllProductsInCart = async (cartId) => {
    const cart = await cartModel.findByIdAndUpdate(
        cartId, 
        { products: [] }, 
        { new: true }
    );
    return cart;
}


export default {
    createCart,
    getCartById,
    addProductToCart,
    update,
    updateProductQuantityInCart,
    deleteProductFromCart,
    deleteAllProductsInCart
}