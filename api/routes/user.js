import isAuth from '../../middleware/authMiddleware.js'
import { getUsers, findUser, updateUser } from '../controllers/user.js'
import express from 'express'

const userRoutes = express.Router()

userRoutes.get('/', getUsers)
userRoutes.get('/profile/:username', [isAuth], findUser)
userRoutes.put('/profile/:username/update', [isAuth], updateUser)

export default userRoutes
