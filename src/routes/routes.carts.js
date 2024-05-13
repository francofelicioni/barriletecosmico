import { Router } from "express";
import cartManager from "../data/fs/managers/cartManager.js";

const router = Router()


router.get('/', readAll)
router.post('/', create)
router.get('/:id', read);
router.post('/:cid/product/:pid', update)


async function readAll(_req, res) {
  try {
    const data = await cartManager.getCarts()

    if (data.length === 0) {
      return res.json({ status: 200, message: 'No carts created' })
    }

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}

async function read(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({ status: 404, response: `Not founded for id ${id}!`});
    }

    const data = await cartManager.getCartById(Number(id));
    if (data) {
      return res.json({ status: 200, response: data })
    }

    throw new Error(`Error when fetching data!`);
  } catch (error) {
    console.log(error)
    return res.json({ status: error.status || 500, response: error.message || "Error" })
  }
}

async function create(req, res) {
  try {    
    const newCart = await cartManager.addCart();
    res.status(201).json(newCart)

  } catch (err) {
    console.log(err)
  }
}

async function update(req, res) {
  try {
    const {cid, pid} = req.params
    const cart = await cartManager.updateCart(cid, pid)
    res.status(201).json(cart)

  } catch (err) {
    console.log(err)
  }
}

export default router;