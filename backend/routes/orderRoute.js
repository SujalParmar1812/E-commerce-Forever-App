import express from 'express'
import {placeOrder,placeOrderStripe,allOrders,updateStatus,userOrders, verifyStripe} from "../controllers/orderController.js"
import adminAuth from '../middlewares/adminAuth.js'
import auth from '../middlewares/auth.js'

const orderRouter = express.Router();


//admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)


//payment features
orderRouter.post('/place',auth,placeOrder)
orderRouter.post('/stripe',auth,placeOrderStripe)

//user features
orderRouter.post('/userorders',auth,userOrders)

//verify payment
orderRouter.post('/verifyStripe',auth,verifyStripe)

export default orderRouter;