import bcrypt from 'bcryptjs'
import { generateSign } from '../../config/jwt.js'
import setError from '../../config/errors.js'

const register = async (req, res) => {
  const { username, password } = req.body
  try {
    const existingUser = await User.findOne({ username })
    if (existingUser) return next(setError(400, 'El usuario ya existe'))

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, password: hashedPassword })
    await newUser.save()
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    next(setError(500, 'Error al registrar el usuario'))
  }
}

const login = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return next(setError(400, 'Credenciales inválidas'))

    const token = generateSign(user._id)
    res.status(200).json({ user, token })
  } catch (error) {
    next(setError(500, 'Error during login'))
  }
}

export { register, login }
