const userRepository = require('../repositories/user.repository')
const transactionRepository = require('../repositories/transaction.repository')

const utils = require('../utils/format.util')

const getBalanceService = (id, response) => {
  userRepository.getUserById(id, (err, existingUser) => {
    if (err) {
      response(400, err, null)
      return
    }
    response(200, 'Sukses', { balance: existingUser.balance })
  })
}

const postTopupService = (id, { top_up_amount, description }, response) => {
  userRepository.getUserById(id, (err, existingUser) => {
    if (err) {
      response(400, err, null)
      return
    }
    const newBalance = existingUser.balance + Number(top_up_amount)

    if (typeof top_up_amount !== 'number' || top_up_amount <= 0) {
      response(
        400,
        'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0',
        null
      )
      return
    }

    transactionRepository.updateBalance(id, newBalance, (err) => {
      if (err) {
        response(400, err, null)
        return
      }

      const INVOICE_NUMBER = 'INV-' + Math.floor(Math.random(100) * 100000)

      console.log('ini desc', description)
      transactionRepository.createTransaction(
        id,
        {
          invoice_number: INVOICE_NUMBER,
          transaction_type: 'TOPUP',
          description: description,
          total_amount: top_up_amount,
          created_on: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        (err) => {
          if (err) {
            response(400, err, null)
            return
          }
        }
      )

      userRepository.getUserById(id, (err, existingUser) => {
        if (err) {
          response(400, err, null)
          return
        }
        response(200, 'Top Up Balance berhasil', {
          balance: existingUser.balance,
        })
      })
    })
  })
}

module.exports = { getBalanceService, postTopupService }
