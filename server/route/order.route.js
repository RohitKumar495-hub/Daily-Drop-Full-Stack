import { Router } from 'express'
import auth from '../middleware/auth.js'
import { cashOnDeliveryController, getOrderDetailsController, paymentController, webhookStripe } from '../controllers/order.controller.js'

const orderRouter = Router()

orderRouter.post('/cash-on-delivery' , auth , cashOnDeliveryController)
orderRouter.post('/checkout' , auth , paymentController)
orderRouter.post('/webhook' , webhookStripe)
orderRouter.get("/order-list" , auth , getOrderDetailsController)


export default orderRouter