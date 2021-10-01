import express from 'express'
import { authUser, getUserProfile, registerUser } from '../controllers/userController.js' 
const Router = express.Router()
import { protect } from '../middleware/authMiddelware.js'

// Router.route('/login').get(authUser)

Router.route('/').post(registerUser)
Router.post('/login', authUser)
Router.route('/profile').get(protect, getUserProfile)


export default Router

