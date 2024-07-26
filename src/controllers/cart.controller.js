import cartServices from "../services/cart.services.js";

const getById = async (req, res) => {
    try {
        const { cid } = req.params;

        const cartFounded = await cartServices.getById(cid);

        if (cartFounded) {
            return res.status(200).json({ message: 'success', payload: cartFounded })
        }

        return json.status(404).message(`Cart not founded for id ${id}!`)

    } catch (err) {
        return res.status(500).json({ status: 'Error', message: "500 Internal Server Error" });
    }
}

const createCart = async (_req, res) => {
    try {
        const newCart = await cartServices.create();

        if (newCart) {
            return res.status(201).json({ message: "success", payload: newCart })
        }

        throw new Error('Error: no data to create a new resource!');

    } catch (err) {
        return res.status(500).json({ status: 'Error', message: err.message });
    }
}

const addProductToCart = async (req, res) => {

    try {
        const { cid, pid } = req.params;
        const cart = await cartServices.addProductToCart(cid, pid)

        if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
        if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        return res.status(500).json({ status: "Error", message: "500 Internal Server Error" });
    }
}

const updateProductQuantityInCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartServices.updateProductQuantityInCart(cid, body)

        if (!cart.cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        return res.status(500).json({ status: "Error", message: "500 Internal Server Error" });
    }
}

const deleteProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartServices.deleteProductFromCart(cid, pid)
        
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        return res.status(500).json({ status: "Error", message: "500 Internal Server Error" });
    }
}

const deleteAllProductsInCart = async (req, res) => {
    try {
        const { cid } = req.params

        const cartFounded = cartServices.deleteAllProductsInCart(cid);
        if (!cartFounded) return res.status(404).json({ status: "Error", message: `Cart with id ${cid} not founded` })

        res.status(200).json({ status: 'Success', payload: cartFounded })

    } catch (error) {
        res.status(500).json({ status: 'Error', message: '500 Internal Server Error' })
    }
}

export default {
    createCart,
    getById,
    addProductToCart,
    updateProductQuantityInCart,
    deleteProductFromCart,
    deleteAllProductsInCart
}