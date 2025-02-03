import bcrypt from 'bcryptjs'
import { generateSign } from '../../config/jwt.js'
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

const registerUser = async (req, res) => {
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

const loginUser = async (req, res) => {
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

const updateScore = async (req, res) => {
  const { game, score } = req.body
  const { username } = req.user
  try {
    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ error: 'User not found' })

    if (!['puzzle', 'racer', 'shooter'].includes(game)) {
      return next(setError(400, 'Invalid game type'))
    }

    switch (game) {
      case 'puzzle':
        if (!user.scores.puzzle || score < user.scores.puzzle) {
          user.scores.puzzle = score
        }
        break
      case 'racer':
        if (!user.scores.racer || score > user.scores.racer) {
          user.scores.racer = score
        }
        break
      case 'shooter':
        user.scores.shooter = score
        break
      default:
        return next(setError(400, 'Invalid game'))
    }

    await user.save()
    res.json({ message: 'Score updated successfully', scores: user.scores })
  } catch (error) {
    return next(setError(400, "can't update scores 😱"))
  }
}

const getScore = async (req, res, next) => {
  const { game } = req.params
  const { username } = req.user

  if (!['puzzle', 'racer', 'shooter'].includes(game)) {
    return next(setError(400, 'Invalid game type'))
  }

  try {
    // Obtener top 3 puntuaciones
    const topUsers = await User.find(
      {},
      { username: 1, [`scores.${game}`]: 1, _id: 0 }
    )
      .sort({ [`scores.${game}`]: game === 'puzzle' ? 1 : -1 })
      .limit(3)

    // Obtener puntuación del usuario actual
    const user = await User.findOne(
      { username },
      { username: 1, [`scores.${game}`]: 1, _id: 0 }
    )

    res.status(200).json({
      top3: topUsers,
      userScore: user || { message: 'User not found' }
    })
  } catch (error) {
    return next(setError(500, 'Error retrieving scores'))
  }
}

export { registerUser, loginUser, updateScore, getScore, getUsers, findUser }
