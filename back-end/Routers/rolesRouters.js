const express = require('express')
const router = express.Router()
const rolesModel = require('../Models/rolesModels')


// api/createRole
router.post('/api/createRole', async (req, res) => {
    try {
        const data = {
            RoleName: req.body.RoleName
        }
        const roles = await rolesModel.addRole(data)
        res.status(201).json(roles)
    } catch (error) {
        console.log('failed to add', error)
    }
})
// api/allRoles
router.get('/api/allRoles', async (req, res) => {
    try {
        const roles = await rolesModel.getAllRoles()
        res.status(201).json(roles)
    } catch (error) {
        console.log('failed to gett al roles', error)

    }
})
// api/roleById
router.get('/api/roleById/:id', async (req, res) => {
    try {
        const id = req.params.id
        const roles = await rolesModel.getRoleById(id)
        res.status(201).json(roles)

    } catch (error) {
        console.log('failed to get a role by id', error)

    }
})

// api/updateRole/:id
router.put('/api/updateRole/:id', async (req, res) => {
    try {
        const data = {
            RoleName: req.body.RoleName
        }
        const id = req.params.id
        const roles = await rolesModel.updateRole(data, id)
        res.status(201).json(roles)
    } catch (error) {
        console.log('failed to add', error)
    }
})
// api/deleteRole/:id
router.delete('/api/deleteRole/:id', async (req, res) => {
    try {
        const id = req.params.id
        const roles = await rolesModel.deleteRole(id)
        res.status(201).json(roles)
    } catch (error) {
        console.log('failed to add', error)
    }
})


module.exports = router