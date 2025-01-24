import apiLimiter from '../../middleware/limitRate.js'
import userRoutes from './user.js'

const indexRouter = require('express').Router()

indexRouter.use(apiLimiter)

indexRouter.use('/users', userRoutes)

export default indexRouter
