const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host : "localhost",
    user : "Root",
    password : '123456',
    database: 'attendance_system',
    connectionLimit : 10
})

module.exports = pool