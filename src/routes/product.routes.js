import { Router } from "express";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { productDataValidator } from "../validators/productData.validator.js";
import productController from "../controllers/product.controller.js";

const router = Router();

router.get('/', productController.getAll);

router.get('/:id', productController.getById);

router.post('/', passportCall('jwt'), authorization(['admin', 'premium']), productDataValidator, productController.create);

router.put('/:id', passportCall('jwt'), authorization(['admin', 'premium']), productController.update);

router.delete('/:id', passportCall('jwt'), authorization(['admin', 'premium']), productController.deleteOne);

export default router;