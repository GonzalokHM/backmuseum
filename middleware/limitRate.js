const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutos
  max: 50, // Limita cada IP a 50 peticiones por ventana
  standardHeaders: true, // Devuelve la información de los límites de rate en los headers `RateLimit-*`
  legacyHeaders: false, // Deshabilita los headers `X-RateLimit-*`
  handler: (req, res) => {
    res.status(429).json({
      error:
        'Demasiadas peticiones desde esta IP, por favor intente nuevamente después de un rato.'
    })
  }
})

module.exports = { apiLimiter }
