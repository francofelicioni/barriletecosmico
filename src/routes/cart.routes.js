import { Router } from "express";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middleware.js";
import cartController from "../controllers/cart.controller.js";
import { isUserCart } from "../middlewares/isUserCart.js";

const router = Router();

router.get('/:cid', passportCall('jwt'), authorization("user"), cartController.getById);

router.post('/', passportCall("jwt"), authorization("admin"), cartController.createCart);

router.post('/:cid/product/:pid', passportCall('jwt'), authorization("user"), checkProductAndCart, isUserCart,  cartController.addProductToCart);

router.put("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkProductAndCart, cartController.updateProductQuantityInCart);

router.delete('/:cid/product/:pid', passportCall('jwt'), authorization("user"), checkProductAndCart, cartController.deleteProductFromCart);

router.delete('/:cid', passportCall('jwt'), authorization("user"), cartController.deleteAllProductsInCart);

router.get('/:cid/purchase', passportCall('jwt'), authorization("user"), cartController.purchaseCart);

export default router;