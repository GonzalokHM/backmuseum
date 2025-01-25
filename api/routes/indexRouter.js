import apiLimiter from '../../middleware/limitRate.js'
import userRoutes from './user.js'
import express from 'express'

const indexRouter = express.Router()

indexRouter.use(apiLimiter)

indexRouter.get('/', (req, res) => {
  res
    .status(200)
    .json({
      message: 'API running perfect',
      documentation: 'Refer to endpoint /users'
    })
})

indexRouter.use('/users', userRoutes)

export default indexRouter
