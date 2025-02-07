import isAuth from '../../middleware/authMiddleware.js'
import { updateScore, getScore } from '../controllers/score.js'
import express from 'express'

const scoreRoutes = express.Router()

scoreRoutes.get('/:game', [isAuth], getScore)
scoreRoutes.put('/update', [isAuth], updateScore)

export default scoreRoutes
