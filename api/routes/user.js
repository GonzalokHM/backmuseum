import isAuth from '../../middleware/authMiddleware.js'
import {
  registerUser,
  loginUser,
  updateScore,
  getScore
} from '../controllers/user.js'
import express from 'express'

const userRoutes = express.Router()

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.post('/update-score', [isAuth], updateScore)
userRoutes.get('/score', [isAuth], getScore)

export default userRoutes
