const express = require('express')
const router = express.Router()
const authenticateToken = require('../middleware/authenticateToken.middleware')

const transactionController = require('../controllers/transaction.controller')

router.get('/balance', authenticateToken, transactionController.getBalance)
router.post('/topup', authenticateToken, transactionController.postTopup)
router.post('/transaction', authenticateToken, transactionController.postTransaction)

module.exports = router
