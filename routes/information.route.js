const express = require('express')
const router = express.Router()
const informationController = require('../controllers/information.controller')
const authenticateToken = require('../middleware/authenticateToken.middleware')

router.get('/banner', informationController.getBanner)
router.get('/services', authenticateToken, informationController.getService)

module.exports = router
