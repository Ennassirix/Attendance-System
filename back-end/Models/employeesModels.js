const pool = require('../config/connect')
const bcrypt = require('bcrypt')

// add employee
async function addEmployee(data) {
    try {
        const { FirstName, LastName, Email, RoleID, password } = data
        const hashPassword = await bcrypt.hash(password, 10)
        const [rows] = await pool.query('INSERT INTO employees(FirstName, LastName, Email, RoleID, password) VALUES(?,?,?,?,?)',
            [FirstName, LastName, Email, RoleID, hashPassword])
        return rows
    } catch (error) {
        console.log('Error to add employee', error)
    }
}
// update employee
async function updateEmployee(data, id) {
    try {
        const { FirstName, LastName, Email, RoleID, password } = data
        const hashUpdatedPassword = await bcrypt.hash(password, 10)
        const [rows] = await pool.query('UPDATE employees SET FirstName= ?,LastName= ?,Email= ?,RoleID= ?,password= ? WHERE EmployeeID = ?',
            [FirstName, LastName, Email, RoleID, hashUpdatedPassword, id])
        return rows;
    } catch (error) {
        console.log('Error to update employee', error)
    }
}
// delete employee
async function deleteEmployee(id) {
    try {
        const [rows] = await pool.query('DELETE FROM employees WHERE EmployeeID = ?', [id])
        return rows
    } catch (error) {
        console.log('Error to detele an employee', error)
    }
}
// get all employee
async function getAllEmployee() {
    try {
        const [rows] = await pool.query('SELECT FirstName, LastName, Email, RoleID FROM employees')
        return rows
    } catch (error) {
        console.log('Error to get all employee', error)
    }
}
// get employee byID
async function getEmployeeById(id) {
    try {
        const [rows] = await pool.query('SELECT EmployeeID,FirstName, LastName, Email, RoleID FROM employees WHERE EmployeeID = ? ', [id])
        return rows
    } catch (error) {
        console.log('Error to get an employee by id', error)
    }
}
// get employee byEMAIL
async function getEmployeeByEmail(email) {
    try {
        const [rows] = await pool.query('SELECT * FROM employees WHERE Email = ? ', [email])
        return rows
    } catch (error) {
        console.log('Error to get an employee by email', error)
    }
}

module.exports = {
    getAllEmployee,
    getEmployeeByEmail,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
}