const informationRepositories = require('../repositories/information.repository')

const getAllBannerService = (response) => {
  informationRepositories.getAllBanner((err, result) => {
    if (err) {
      response(400, err.sqlMessage, null)
      return
    }
    response(200, 'Sukses', result)
  })
}

const getAllService = (response) => {
  informationRepositories.getAllService((err, result) => {
    if (err) {
      response(400, err.sqlMessage, null)
      return
    }
    response(200, 'Sukses', result)
  })
}

module.exports = { getAllBannerService, getAllService }
