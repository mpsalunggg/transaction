const userServices = require('../services/user.service')

const profileUser = (req, res) => {
  const token = req.jwt
  userServices.profileUser(token.id, (code, message, data) => {
    res.status(code).json({
      status: code,
      message,
      data,
    })
  })
}

const updateProfileUser = (req, res) => {
  const token = req.jwt
  userServices.updateProfileUser(req.body, token.id, (code, message, data) => {
    res.status(code).json({
      status: code,
      message,
      data,
    })
  })
}

module.exports = { profileUser, updateProfileUser }
