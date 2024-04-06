const jwt = require('jsonwebtoken')
const { secretKey } = require('../configs/jwt.config')

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 401,
      message: 'Token tidak tidak valid atau kadaluwarsa',
      data: null,
    })
  }

  const token = authHeader.split(' ')[1]
  try {
    const decodedToken = jwt.verify(token, secretKey)
    req.jwt = decodedToken
    next()
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: 'Token tidak valid atau kadaluwarsa',
      data: null,
    })
  }
}

module.exports = authenticateToken
