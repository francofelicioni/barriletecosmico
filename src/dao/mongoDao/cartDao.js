import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

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
    if (!product) return { product: false }

    await cartModel.findByIdAndUpdate(cid, { $push: { products: product } });

    const cart = await cartModel.findById(cid);
    if (!cart) return { cart: false }

    return cart;
}

export default {
    getCartById,
    createCart,
    addProductToCart
}