import express from 'express'
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered } from '../controllers/orderController.js' 
const Router = express.Router()
import { protect, admin } from '../middleware/authMiddelware.js'

// Router.route('/login').get(authUser)

Router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
Router.route('/myorders').get(protect, getMyOrders)
Router.route('/:id').get(protect, getOrderById)
Router.route('/:id/pay').put(protect, updateOrderToPaid)
Router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

export default Router

