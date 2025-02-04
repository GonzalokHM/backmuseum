import isAuth from '../../middleware/authMiddleware.js'
import { getUsers, findUser } from '../controllers/user.js'
import express from 'express'

const userRoutes = express.Router()

userRoutes.get('/', getUsers)
userRoutes.get('/profile/:username', [isAuth], findUser)

export default userRoutes
