const userRepository = require('../repositories/user.repository')
const transactionRepository = require('../repositories/transaction.repository')

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

const postTransactionService = (id, { code_service }, response) => {
  userRepository.getUserById(id, (err, existingUser) => {
    if (err) {
      response(400, err, null)
      return
    }

    const BALANCE = existingUser.balance

    transactionRepository.getServiceByCode(code_service, (err, data) => {
      if (err) {
        response(400, err, null)
        return
      }

      if (!data) {
        response(400, 'Service ataus Layanan tidak ditemukan', null)
        return
      }

      if (BALANCE < data.service_tarif) {
        response(400, 'Balance tidak mencukupi', null)
        return
      }

      const NEW_BALANCE = BALANCE - data.service_tarif

      transactionRepository.updateBalance(id, NEW_BALANCE, (err, result) => {
        if (err) {
          response(400, err, null)
          return
        }

        console.log('tesssssss', data)
        const INVOICE_NUMBER = 'INV-' + Math.floor(Math.random(100) * 100000)
        transactionRepository.createTransaction(
          id,
          {
            invoice_number: INVOICE_NUMBER,
            id_service: data.id_service,
            service_code: code_service,
            transaction_type: 'PAYMENT',
            description: data.service_name,
            total_amount: data.service_tarif,
            created_on: new Date().toISOString().slice(0, 19).replace('T', ' '),
          },
          (err, result) => {
            if (err) {
              response(400, err, null)
              return
            }
            response(200, 'Suksessss', result)
          }
        )
      })
    })
  })
}

const getHistoryService = (id, { offset, limit }, response) => {
  transactionRepository.getServiceByIdUser(id, (err, result) => {
    if (err) {
      response(400, err, null)
      return
    }

    const newData = result?.map(
      ({
        invoice_number,
        transaction_type,
        description,
        total_amount,
        created_on,
      }) => ({
        invoice_number,
        transaction_type,
        description,
        total_amount,
        created_on,
      })
    )

    if (offset === undefined || limit === undefined) {
      response(200, 'Get history berhasil', {
        offset,
        limit,
        records: newData,
      })
      return
    }

    response(200, 'Get history berhasil', {
      offset,
      limit,
      records: newData.slice(Number(offset), Number(offset) + Number(limit)),
    })
  })
}

module.exports = {
  getBalanceService,
  postTopupService,
  postTransactionService,
  getHistoryService,
}
