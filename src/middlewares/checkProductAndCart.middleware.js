import { request, response } from "express";
import cartServices from "../services/cart.services.js";
import productServices from "../services/product.services.js";

export const checkProductAndCart = async (req = request, res = response, next) => {
    const { cid, pid } = req.params;
    
    const cart = await cartServices.getById(cid)
    const product = await productServices.getById(pid)

    if (!cart) {
        return res.status(404).json({ status: 'Error', message: `Cart with id ${cid} not founded!` })
    }
    if (!product) {
        return res.status(404).json({ status: 'Error', message: `Product with id ${pid} not founded!` })
    }
    next()
}
