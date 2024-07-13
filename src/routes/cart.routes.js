import { Router } from "express";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import cartController from "../controllers/cart.controller.js";

const router = Router()

router.post('/', passportCall("jwt"), authorization("user"), cartController.createCart)
router.get('/:cid', passportCall('jwt'), authorization("user"), cartController.readOne);
router.post('/:cid/product/:pid',passportCall("jwt"), cartController.updateByOne)
router.put('/:cid/product/:pid', passportCall("jwt"), cartController.updateAll)
router.post('/:cid', passportCall('jwt'), authorization("user"), cartController.update)
router.delete('/:cid/product/:pid', passportCall('jwt'), authorization("user"), cartController.destroyOne)
router.delete('/:cid', passportCall('jwt'), authorization("user"), cartController.destroyAll)

export default router;