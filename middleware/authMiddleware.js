import User from '../api/models/User.js'
import setError from '../config/errors.js'
import { verifyJwt } from '../config/jwt.js'

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return next(setError(400, 'Te has columpiado, acceso privado'))
    }

    const parsedToken = token.replace('Bearer', '').trim()
    const { id } = verifyJwt(parsedToken)
    const userLogued = await User.findById(id)

    userLogued.password = null
    req.user = userLogued

    next()
  } catch (error) {
    return next(setError(400, 'Llave incorrecta'))
  }
}

export default isAuth
