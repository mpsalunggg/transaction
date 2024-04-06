const express = require('express')
const authenticateToken = require('../middleware/authenticateToken.middleware')

const userController = require('../controllers/user.controller')
const router = express.Router()

router.get('/profile', authenticateToken, userController.profileUser)
router.put('/profile/update', authenticateToken, userController.updateProfileUser)

module.exports = router
