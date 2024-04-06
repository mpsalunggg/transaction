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
    'INSERT INTO transaction (id_user, id_service, invoice_number, transaction_type, description, total_amount, created_on) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      id_user,
      data.id_service,
      data.invoice_number,
      data.transaction_type,
      data.description,
      data.total_amount,
      data.created_on,
    ],
    (err) => {
      if (err) {
        response(err.sqlMessage, null)
        return
      }
      response(null, {
        invoice_number: data.invoice_number,
        service_code: data.service_code,
        service_name: data.description,
        transaction_type: data.transaction_type,
        total_amount: data.total_amount,
        created_on: data.created_on,
      })
    }
  )
}

const getServiceByCode = (code_service, response) => {
  db.query(
    'SELECT * FROM service WHERE code_service = ?',
    [code_service],
    (err, results) => {
      if (err) {
        response(err.sqlMessage, null)
        return
      }

      response(null, results[0])
    }
  )
}

const getServiceByIdUser = (id_user, response) => {
  db.query(
    'SELECT * FROM transaction WHERE id_user = ?',
    [id_user],
    (err, results) => {
      if (err) {
        response(err.sqlMessage, null)
        return
      }

      response(null, results)
    }
  )
}

module.exports = {
  updateBalance,
  createTransaction,
  getServiceByCode,
  getServiceByIdUser,
}
