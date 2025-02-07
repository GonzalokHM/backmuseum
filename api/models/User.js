import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  scores: {
    puzzle: { type: String, default: '99:59' },
    racer: { type: Number, default: 0 },
    shooter: { type: Number, default: 0 }
  }
})

const User = mongoose.model('User', userSchema)
export default User
