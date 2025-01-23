const User = require('../api/models/User')
const { setError } = require('../config/errors')
const { verifyJwt } = require('../config/jwt')

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

module.exports = isAuth
