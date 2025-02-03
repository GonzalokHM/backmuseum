import User from '../models/User.js'
import setError from '../../config/errors.js'

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
    res.status(200).json(user)
  } catch (error) {
    next(setError(500, 'Error al obtener el usuario'))
  }
}

export { getUsers, findUser }
