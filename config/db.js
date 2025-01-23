const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected 😊')
  } catch (error) {
    console.error('😒MongoDB Connection Error:', error)
  }
}

module.exports = connectDB
