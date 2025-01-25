import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import setError from './config/errors.js'
import indexRouter from './api/routes/indexRouter.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

connectDB()
const corsOptions = {
  origin: process.env.CORS_ORIGIN.split(','),
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use(express.json())

app.use('/api', indexRouter)

app.use('*', (req, res, next) => {
  return next(setError(404, 'Not found'))
})

//controlador errores generales de servidor
app.use((error, req, res, next) => {
  console.error(error)
  return res
    .status(error.status || 500)
    .json(error.message || 'Internal server Error')
})

const PORT = 4001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
