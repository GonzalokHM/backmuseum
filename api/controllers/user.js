import User from '../models/User.js'
import setError from '../../config/errors.js'
import bcrypt from 'bcryptjs'

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return next(setError(400, 'no users found'))
  }
}

const findUser = async (req, res, next) => {
  const { username } = req.params
  try {
    const user = await User.findOne({ username }).select('-password')
    if (!user) {
      return next(setError(404, 'Usuario no encontrado'))
    }
    return res.status(200).json(user)
  } catch (error) {
    next(setError(500, 'Error al obtener el usuario'))
  }
}

const updateUser = async (req, res, next) => {
  const { username } = req.params
  const { newPassword, email } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) {
      return next(setError(404, 'User not found'))
    }
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10)
      user.password = hashedPassword
    }
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return next(setError(400, 'Invalid email format'))
      }
      const existingEmail = await User.findOne({ email })
      if (existingEmail && existingEmail.username !== username) {
        return next(setError(400, 'Email already in use'))
      }

      user.email = email
    }
    await user.save()

    return res.status(200).json({
      message: 'User updated successfully',
      username: user.username,
      email: user.email
    })
  } catch (error) {
    return next(setError(500, 'Error updating user'))
  }
}

export { getUsers, findUser, updateUser }
