import { Router } from 'express'
import productRoutes from './product.routes.js'
import cartRoutes from './cart.routes.js'
import sessionRoutes from './session.routes.js'
import mockingRoutes from './mocking.routes.js'

const router = Router()

router.use('/products', productRoutes)
router.use('/carts', cartRoutes)
router.use('/sessions', sessionRoutes)
router.use('/mockingproducts', mockingRoutes)


export default router
