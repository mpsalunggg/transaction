const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.SERVER_PORT || 3030

const authRoutes = require('./routes/auth.route')
const userRoutes = require('./routes/user.route')
const informationRoutes = require('./routes/information.route')
const transactionController = require('./routes/transaction.route')

app.use(express.json())
app.use(authRoutes)
app.use(userRoutes)
app.use(informationRoutes)
app.use(transactionController)

app.listen(port, () => {
  console.log('Server running on port  ' + port)
})
