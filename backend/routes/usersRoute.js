import express from 'express'
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } from '../controllers/userController.js' 
const Router = express.Router()
import { protect, admin } from '../middleware/authMiddelware.js'

// Router.route('/login').get(authUser)

Router.route('/').post(registerUser).get(protect, admin, getUsers)
Router.post('/login', authUser)
Router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
Router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

export default Router

