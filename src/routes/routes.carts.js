import { Router } from "express";
import cartManager from "../data/fs/managers/cartManager.js";

const router = Router()


router.get('/', readAll)
router.get('/:id', read);
router.post('/:cid/product/:pid', create)


async function readAll(_req, res) {
  try {
    const data = await cartManager.getCarts()
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}

async function read(req, res) {
  try {
    const { id } = req.params;
    const data = await cartManager.getCartById(Number(id));

    if (data) {
      return res.json({ status: 200, response: data })
    }

    throw new Error(`Not founded for id ${id}!`);

  } catch (error) {
    console.log(error)
    return res.json({ status: error.status || 500, response: error.message || "Error" })
  }
}

async function create(req, res) {
  try {
    const {cid, pid} = req.params
    const cart = await cartManager.addCart(cid, pid)
    res.status(201).json(cart)

  } catch (err) {
    console.log(err)
  }
}

export default router;