import setError from '../../config/errors.js'
import User from '../models/User.js'

const updateScore = async (req, res, next) => {
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
    return res.json({
      message: 'Score updated successfully',
      scores: user.scores
    })
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

    return res.status(200).json({
      top3: topUsers,
      userScore: user || { message: 'User not found' }
    })
  } catch (error) {
    return next(setError(500, 'Error retrieving scores'))
  }
}

export { updateScore, getScore }
