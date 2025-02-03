import apiLimiter from '../../middleware/limitRate.js'
import authRoutes from './auth.js'
import scoreRoutes from './score.js'
import userRoutes from './user.js'
import express from 'express'

const indexRouter = express.Router()

indexRouter.use(apiLimiter)

indexRouter.get('/', (req, res) => {
  res.status(200).json({
    message: 'API running perfect',
    documentation: 'Refer to endpoint /users'
  })
})

indexRouter.use('/users', userRoutes)
indexRouter.use('/auth', authRoutes)
indexRouter.use('/score', scoreRoutes)

export default indexRouter
