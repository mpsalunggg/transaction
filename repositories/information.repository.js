const db = require('../configs/db.config')

const getAllBanner = (response) => {
  db.query('SELECT * FROM banner', (err, result) => {
    if (err) {
      response(err, null)
      return
    }
    response(null, result)
  })
}

const getAllService = (response) => {
  db.query('SELECT * FROM service', (err, result) => {
    if (err) {
      response(err, null)
      return
    }
    response(null, result)
  })
}

module.exports = { getAllBanner, getAllService }
