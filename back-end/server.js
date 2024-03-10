const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const rolesRouter = require('./Routers/rolesRouters')
const employeeRouter = require('./Routers/employeesRouters')
const port = 3001
app.use(cors({
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.get('/', (req, res) => {
    res.send({ "message": "server working" })
})


app.use('/roles', rolesRouter)
app.use('/employees', employeeRouter)
app.listen(port)