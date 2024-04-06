const db = require('../configs/db.config')

const register = (newUser, response) => {
  const { email, firstname, lastname, password } = newUser
  db.query(
    'INSERT INTO user (email, firstname, lastname, password) VALUES (?, ?, ?, ?)',
    [email, firstname, lastname, password],
    (err, results) => {
      if (err) {
        response(err.sqlMessage, null)
        return
      }
      response(null, results.insertId)
    }
  )
}

module.exports = { register }
