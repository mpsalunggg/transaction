const db = require('../configs/db.config')

const getUserByEmail = (email, response) => {
  db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
    if (err) {
      response(err.sqlMessage, null)
      return
    }

    response(null, results[0])
  })
}

const getUserById = (id_user, response) => {
  db.query(
    'SELECT * FROM user WHERE id_user = ?',
    [id_user],
    (err, results) => {
      if (err) {
        response(err.sqlMessage, null)
        return
      }

      response(null, results[0])
    }
  )
}

const updateUser = (data, id_user, response) => {
  db.query(
    'UPDATE user SET firstname = ?, lastname = ? WHERE id_user = ?',
    [data.firstname, data.lastname, id_user],
    (err, results) => {
      if (err) {
        response(err.sqlMessage, null)
        return
      }
      response(null, results)
    }
  )
}

module.exports = { getUserByEmail, getUserById, updateUser }
