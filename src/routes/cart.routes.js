import { Router } from "express";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import cartsControllers from "../controllers/carts.controllers.js";
const router = Router()

router.get('/:cid', passportCall('jwt'), authorization("user"), cartsControllers.readOne);
router.post('/', authorization("user"), cartsControllers.createCart)
router.post('/:cid/product/:pid', cartsControllers.updateByOne)
router.put('/:cid/product/:pid', cartsControllers.updateAll)
router.post('/:cid', passportCall('jwt'), authorization("user"), cartsControllers.update)
router.delete('/:cid/product/:pid', passportCall('jwt'), authorization("user"), cartsControllers.destroyOne)
router.delete('/:cid', passportCall('jwt'), authorization("user"), cartsControllers.destroyAll)

export default router;