import { Router } from "express";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import productController from "../controllers/product.controller.js";

const router = Router();

router.get('/', productController.readAll);
router.get('/:id', productController.read);
router.post('/', passportCall('jwt'), authorization("user"), productController.create)
router.put('/:id', passportCall('jwt'), authorization("user"), productController.update)
router.delete('/:id', passportCall('jwt'), authorization("user"), productController.destroy);


export default router;