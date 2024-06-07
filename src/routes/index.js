import { Router } from 'express'
import productRoutes from './product.routes.js'
import cartRoutes from './cart.routes.js'
import sessionRoutes from './session.routes.js'
import { isLogged } from '../middlewares/isLogged.middleware.js'

const router = Router()

router.use('/products', isLogged, productRoutes)
router.use('/carts', cartRoutes)
router.use('/sessions', sessionRoutes)

export default router
