import { Router } from "express";
import cartDao from "../dao/mongoDao/cartDao.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
const router = Router()

router.get('/:cid', passportCall('jwt'), authorization("user"), readOne);
router.post('/', authorization("user"), create)
router.post('/:cid/product/:pid', updateByOne)
router.put('/:cid/product/:pid', updateAll)
router.post('/:cid', passportCall('jwt'), authorization("user"), update)
router.delete('/:cid/product/:pid', passportCall('jwt'), authorization("user"), destroyOne)
router.delete('/:cid', passportCall('jwt'), authorization("user"), destroyAll)

async function readOne(req, res) {
  try {
    const { cid } = req.params;

    const cartFounded = await cartDao.getCartById(cid);

    if (cartFounded) {
      return res.status(200).json({ message: 'success', payload: cartFounded })
    }

    return json.status(404).message(`Cart not founded for id ${id}!`)

  } catch (err) {
    return res.status(500).json({ status: 'Error', message: "500 Internal Server Error" });
  }
}

async function create(_req, res) {
  try {
    const newCart = await cartDao.createCart();

    if (newCart) {
      return res.status(201).json({ message: "success", payload: newCart })
    }

    throw new Error('Error: no data to create a new resource!');

  } catch (err) {
    return res.status(500).json({ status: 'Error', message: err.message });
  }
}

async function updateByOne(req, res) {

  try {
    const { cid, pid } = req.params;
    const cart = await cartDao.addProductToCart(cid, pid)

    if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
    if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    return res.status(500).json({ status: "Error", message: "500 Internal Server Error" });
  }
}

async function updateAll(req, res) {

  try {
    const { cid, pid } = req.params
    const { quantity } = req.body

    const cart = await cartDao.updateProductQuantityInCart(cid, pid, quantity)

    if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
    if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    return res.status(500).json({ status: "Error", message: "500 Internal Server Error" });
  }
}


async function update(req, res) {
  try {
    const { cid } = req.params;
    const cart = await cartDao.update(cid, body)

    if (!cart.cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    return res.status(500).json({ status: "Error", message: "500 Internal Server Error" });
  }
}

async function destroyOne(req, res) {
  try {
    const { cid, pid } = req.params;
    const cart = await cartDao.deleteProductFromCart(cid, pid)

    if (cart.product === false) return res.status(400).json({ status: "Error", msg: `Product with id ${pid} not founded` })

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    return res.status(500).json({ status: "Error", message: "500 Internal Server Error" });
  }
}

async function destroyAll(req, res) {
  try {
    const { cid } = req.params

    const cartFounded = cartDao.deleteAllProductsInCart(cid);
    if (!cartFounded) return res.status(404).json({ status: "Error", message: `Cart with id ${cid} not founded` })

    res.status(200).json({ status: 'Success', payload: cartFounded })

  } catch (error) {
    res.status(500).json({ status: 'Error', message: '500 Internal Server Error' })
  }
}



export default router;