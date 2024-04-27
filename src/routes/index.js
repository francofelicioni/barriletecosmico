import { Router } from 'express'
import productsRouter from './routes.products.js'
import cartsRouter from './routes.carts.js'

const router = Router()

router.use ('/products', productsRouter)
router.use ('/carts', cartsRouter)

export default router