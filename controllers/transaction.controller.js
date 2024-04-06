const transactionService = require('../services/transaction.service')

const getBalance = (req, res) => {
  const token = req.jwt
  transactionService.getBalanceService(token.id, (code, message, data) => {
    res.status(code).json({ status: code, message: message, data: data })
  })
}

const postTopup = (req, res) => {
  const token = req.jwt
  transactionService.postTopupService(
    token.id,
    req.body,
    (code, message, data) => {
      res.status(code).json({ status: code, message: message, data: data })
    }
  )
}

module.exports = { getBalance, postTopup }