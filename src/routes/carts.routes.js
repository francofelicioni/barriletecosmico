import { Router } from "express";
import cartDao from "../dao/mongoDao/cartDao.js";
const router = Router()

router.get('/:cid', read);
router.post('/', create)
router.post('/:cid/product/:pid', update)
router.delete('/:cid/product/:pid', destroy)


async function read(req, res) {
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

async function update(req, res) {

  const { cid, pid } = req.params;
  const cart = await cartDao.addProductToCart(cid, pid)

  if (cart.product == false) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
  if (cart.cart == false) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });

  res.status(200).json({ status: "success", payload: cart });
}

async function destroy(req, res) {
  try {
    const { cid, pid } = req.params;
    const cart = await cartDao.deleteProductFromCart(cid, pid)

    if (cart.product === false) return res.status(400).json({status: "Error", msg: `Product with id ${pid} not founded`})

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    return res.status(500).json({ status: "Error", message: "500 Internal Server Error" });
  }
}

export default router;