import { Router } from "express";
import { cartModel } from "../dao/models/cart.model.js";


const router = Router()


router.get('/', readAll)
router.post('/', create)
router.get('/:id', read);
router.post('/:cid/product/:pid', update)


async function readAll(_req, res) {
  try {
    const data = await cartModel.find()

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

    const data = await cartModel.findById(Number(id));
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
    const newCart = await cartModel.create();
    res.status(201).json(newCart)

  } catch (err) {
    console.log(err)
  }
}

async function update(req, res) {
  try {
    const {cid, pid} = req.params
    const cart = await cartModel.findByIdAndUpdate(cid, pid)
    res.status(201).json(cart)

  } catch (err) {
    console.log(err)
  }
}

export default router;