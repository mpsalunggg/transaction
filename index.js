const express = require('express')
require('dotenv').config()
const db = require('./configs/db')
const app = express()
const port = process.env.SERVER_PORT || 3030

app.use(express.json())

app.get('/api', (_, res) => {
  db.query('SELECT * FROM user', function (err, results) {
    res.json({ code: 'Response Success', results })
  })
})

app.listen(port, () => {
  console.log('Server running on port  ' + port)
})
