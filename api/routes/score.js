import isAuth from '../../middleware/authMiddleware.js'
import { updateScore, getScore } from '../controllers/score.js'
import express from 'express'

const scoreRoutes = express.Router()

scoreRoutes.get('/score/:game', [isAuth], getScore)
scoreRoutes.post('/update-score', [isAuth], updateScore)

export default scoreRoutes
