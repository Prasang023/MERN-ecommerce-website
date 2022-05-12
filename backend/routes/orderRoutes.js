import express from 'express'
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } from '../controllers/orderController.js' 
const Router = express.Router()
import { protect } from '../middleware/authMiddelware.js'

// Router.route('/login').get(authUser)

Router.route('/').post(protect, addOrderItems)
Router.route('/myorders').get(protect, getMyOrders)
Router.route('/:id').get(protect, getOrderById)
Router.route('/:id/pay').put(protect, updateOrderToPaid)

export default Router

