const express = require('express')
require('dotenv').config()
const db = require('./configs/db')
const app = express()
const port = process.env.SERVER_PORT || 3030

app.get('/', (_, res) => {
  db.query('SELECT * FROM user', function (err, results) {
    console.log(results)
  })
  res.json({ code: 'Response Success' })
})

app.listen(port, () => {
  console.log('Server running on port  ' + port)
})
