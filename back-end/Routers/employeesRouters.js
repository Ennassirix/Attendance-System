const express = require('express')
const router = express.Router()
const employeesModel = require('../Models/employeesModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// api/login
router.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const employees = await employeesModel.getEmployeeByEmail(email);
        if (employees.length === 0) {
            return res.status(401).json({ message: 'Email incorrect' });
        }
        const storedPassword = employees[0].password;
        if (!storedPassword) {
            return res.status(500).json({ message: 'Stored password is missing or undefined' });
        }
        const matchPassword = await bcrypt.compare(password, storedPassword);
        if (!matchPassword) {
            return res.status(401).json({ message: 'Password incorrect' });
        }
        const token = jwt.sign({ employeeID: employees[0].EmployeeID }, 'secret', { expiresIn: '24h' });
        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true, sameSite: 'Strict' })
        res.send('success')
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// api/authentifatacion
router.get('/api/authentifatacion', async (req, res) => {
    try {
        const cookie = req.cookies['jwt'];
        if(!cookie){
            return res.status(401).json({ error: 'Unauthenticated' });
        }
        const decodedJWT = jwt.verify(cookie,'secret')
        if(!decodedJWT){
            return res.status(401).json({ error: 'Unauthenticated' });
        }
        const employee = await employeesModel.getEmployeeById(decodedJWT.employeeID)
        if(!employee){
            return res.status(401).json({ error: 'employee not fond' });
        }
        res.json(employee)
    } catch (error) {

    }
})
// api/logout
router.post('/api/logout', async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.send({ message: 'success' });
    } catch (error) {
        throw error;
    }
})







// api/create
router.post('/api/create', async (req, res) => {
    try {
        const data = {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            RoleID: req.body.RoleID,
            password: req.body.password
        }
        const employees = await employeesModel.addEmployee(data)
        res.status(201).json(employees)
    } catch (error) {
        res.status(500).json({ error: 'failed too add an employee' });
    }
})
// api/update/:id
router.put('/api/update/:id', async (req, res) => {
    try {
        const data = {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            RoleID: req.body.RoleID,
            password: req.body.password
        }
        const id = req.params.id
        const employees = await employeesModel.updateEmployee(data, id)
        res.status(201).json(employees)
    } catch (error) {
        res.status(500).json({ error: 'failed too update an employee' });
    }
})
// api/delete/:id
router.delete('/api/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const employees = await employeesModel.deleteEmployee(id)
        res.status(201).json(employees)
    } catch (error) {
        res.status(500).json({ error: 'failed too delete an employee' });
    }
})
// api/employees
router.get('/api/allemployees', async (req, res) => {
    try {
        const employees = await employeesModel.getAllEmployee()
        res.status(201).json(employees)
    } catch (error) {
        res.status(500).json({ error: 'failed too get all employees' });
    }
})
// api/employeeID/:id
router.get('/api/employeeID/:id', async (req, res) => {
    try {
        const id = req.params.id
        const employees = await employeesModel.getEmployeeById(id)
        res.status(201).json(employees)
    } catch (error) {
        res.status(500).json({ error: 'failed to get an employee by id' });
    }
})




module.exports = router