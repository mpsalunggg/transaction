const mysql = require('mysql2')

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err)
    return
  }
  console.log('Connected to database')
})

module.exports = db
