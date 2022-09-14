import { Router } from 'express'
import * as orderController from '../controllers/orderController.js'
import auth from '../middlewares/auth.js'

const orderRouter = Router()

orderRouter.get("/orders", auth, orderController.listOrders)
orderRouter.post("/order", auth, orderController.createOrder)


export default orderRouter;