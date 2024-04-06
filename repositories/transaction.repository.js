const db = require('../configs/db.config')

const updateBalance = (id_user, top_up_amount, response) => {
  db.query(
    'UPDATE user SET balance = ? WHERE id_user = ?',
    [top_up_amount, id_user],
    (err, results) => {
      if (err) {
        response(err.sqlMessage, null)
        return
      }
      response(null, results)
    }
  )
}

const createTransaction = (id_user, data, response) => {
  db.query(
    'INSERT INTO transaction (id_user, invoice_number, transaction_type, description, total_amount, created_on) VALUES (?, ?, ?, ?, ?, ?)',
    [
      id_user,
      data.invoice_number,
      data.transaction_type,
      data.description,
      data.total_amount,
      data.created_on,
    ],
    (err, results) => {
      if (err) {
        response(err.sqlMessage, null)
        return
      }
      response(null, results)
    }
  )
}

module.exports = { updateBalance, createTransaction }
