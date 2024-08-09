import cartServices from "../services/cart.services.js";
import ticketServices from "../services/ticket.services.js";
import { logger } from "../utils/logger.js";

const getById = async (req, res, next) => {
    try {
        const { cid } = req.params;

        const cartFound = await cartServices.getById(cid);

        if (cartFound) {
            return res.status(200).json({ message: 'success', payload: cartFound })
        }

        return json.status(404).message(`Cart not found for id ${id}!`)

    } catch (error) {
        logger.error(error)
        next(error);
    }
}

const createCart = async (_req, res, next) => {
    try {
        const newCart = await cartServices.create();

        if (newCart) {
            return res.status(201).json({ message: "success", payload: newCart })
        }

        throw customErrors.notFound(`Error: no data to create a new resource!`)

    } catch (error) {
        logger.error(error)
        next(error);
    }
}

const addProductToCart = async (req, res, next) => {

    try {
        const { cid, pid } = req.params;
        const cart = await cartServices.addProductToCart(cid, pid)

        if (cart.product == false) throw customErrors.notFound(`Product with id ${pid} not found!`);
        if (cart.cart == false) throw customErrors.notFound(`Cart with id ${cid} not found!`);

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

const updateProductQuantityInCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await cartServices.updateProductQuantityInCart(cid, body)

        if (!cart.product) throw customErrors.notFound(`Product with id ${pid} not found!`);

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

const deleteProductFromCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartServices.deleteProductFromCart(cid, pid)
        
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

const deleteAllProductsInCart = async (req, res, next) => {
    try {
        const { cid } = req.params

        const cartFound = cartServices.deleteAllProductsInCart(cid);
        if (!cartFound) throw customErrors.notFound(`Cart with id ${cid} not found!`);

        res.status(200).json({ status: 'Success', payload: cartFound })

    } catch (error) {
        logger.error(error);
        next (error);
    }
}

const purchaseCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await cartServices.getById(cid);
        const { email } = req.user.email

        if (!cart) throw customErrors.notFound(`Cart with id ${cid} not found!`);

        // Obtain cart total
        const total = await cartServices.purchaseCart(cid);

        // Create ticket
        const ticket = await ticketServices.createTicket(email, total);

        res.status(200).json({ status: 'Success', payload: ticket })

    } catch (error) {
        logger.error(error);
        next (error);
    }
}

export default {
    createCart,
    getById,
    addProductToCart,
    updateProductQuantityInCart,
    deleteProductFromCart,
    deleteAllProductsInCart,
    purchaseCart
}