import express from 'express'
import { addOrderItems } from '../controllers/orderController.js' 
const Router = express.Router()
import { protect } from '../middleware/authMiddelware.js'

// Router.route('/login').get(authUser)

Router.route('/').post(protect, addOrderItems)

export default Router

