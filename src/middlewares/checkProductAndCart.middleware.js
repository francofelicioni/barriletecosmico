import { request, response } from "express";
import customErrors from "../errors/customErrors.js";
import cartServices from "../services/cart.services.js";
import productServices from "../services/product.services.js";

export const checkProductAndCart = async (req = request, res = response, next) => {
    const { cid, pid } = req.params;
    
    const cart = await cartServices.getById(cid)
    const product = await productServices.getById(pid)

    if (!cart) {
        throw customErrors.notFound(`Cart with id ${cid} not found!`)
    }
    if (!product) {
        throw customErrors.notFound(`Cart with id ${cid} not found!`)
    }
    next()
}
