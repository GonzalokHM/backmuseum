import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import indexRouter from './api/routes/indexRouter.js'
import dotenv from 'dotenv'
import setError from './config/errors.js'
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

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Museum API' })
})

app.use('/api', indexRouter)

app.use('*', (req, res, next) => {
  console.log(`Ruta no encontrada: ${req.originalUrl}`)
  return next(setError(404, 'Not found'))
})

//controlador errores generales de servidor
app.use((error, req, res, next) => {
  console.error(error)
  return res
    .status(error.status || 500)
    .json({ success: false, error: error.message || 'Internal server Error' })
})

const PORT = process.env.PORT || 4001

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
