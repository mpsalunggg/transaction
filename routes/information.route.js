const express = require('express')
const router = express.Router()
const informationController = require('../controllers/information.controller')

router.get('/banner', informationController.getBanner)
router.get('/services', informationController.getService)

module.exports = router
