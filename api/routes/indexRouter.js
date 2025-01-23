const { apiLimiter } = require('../../middleware/limitRate')
const userRoutes = require('./user')

const indexRouter = require('express').Router()

indexRouter.use(apiLimiter)

indexRouter.use('/users', userRoutes)

module.exports = indexRouter
