const informationServices = require('../services/information.service')

const getBanner = (req, res) => {
  informationServices.getAllBannerService((status, message, result) => {
    res.status(status).json({ status: status, message, data: result })
  })
}

const getService = (req, res) => {
  informationServices.getAllService((status, message, result) => {
    res.status(status).json({ status: status, message, data: result })
  })
}

module.exports = { getBanner, getService }
