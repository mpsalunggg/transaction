const authServices = require('../services/auth.service')

const registerUser = (req, res) => {
  authServices.registerUser(req.body, (code, message, data) => {
    res.status(code).json({
      status: code,
      message,
      data,
    })
  })
}

const loginUser = (req, res) => {
  authServices.loginUser(req.body, (code, message, data) => {
    res.status(code).json({
      status: code,
      message,
      data,
    })
  })
}

module.exports = {
  registerUser,
  loginUser,
}
