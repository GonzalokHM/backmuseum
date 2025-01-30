import User from '../api/models/User.js'
import setError from '../config/errors.js'
import { verifyJwt } from '../config/jwt.js'

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return next(setError(401, 'Te has columpiado, acceso privado'))
    }

    const parsedToken = token.replace('Bearer', '').trim()
    const { id } = verifyJwt(parsedToken)
    const userLogued = await User.findById(id)
    if (!userLogued) {
      return next(setError(404, 'Usuario no encontrado'))
    }

    userLogued.password = null
    req.user = userLogued

    next()
  } catch (error) {
    return next(setError(403, 'Llave incorrecta'))
  }
}

export default isAuth
