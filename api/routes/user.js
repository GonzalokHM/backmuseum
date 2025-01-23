const isAuth = require('../../middleware/authMiddleware')
const {
  registerUser,
  loginUser,
  updateScore,
  getScore
} = require('../controllers/user')

const userRoutes = require('express').Router()

userRoutes.post('/register', registerUser)
userRoutes.post('/login', loginUser)
userRoutes.post('/update-score', [isAuth], updateScore)
userRoutes.get('/score', [isAuth], getScore)

module.exports = userRoutes
