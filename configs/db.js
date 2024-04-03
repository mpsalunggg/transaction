const mysql = require('mysql2')

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_DATABASES || 'transaction',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 8000,
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err)
    return
  }
  console.log('Connected to database')
})

module.exports = db
