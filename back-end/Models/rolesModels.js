const pool = require('../config/connect')

// add role
async function addRole(data) {
    try {
        const { RoleName } = data
        const [rows] = await pool.query('INSERT INTO roles(RoleName) values(?)', [RoleName])
        return rows
    } catch (error) {
        console.log('Error to add a role', error)
    }
}
// update role
async function updateRole(data, id) {
    try {
        const { RoleName } = data
        const [rows] = await pool.query('UPDATE roles SET RoleName = ? WHERE RoleID = ? ', [RoleName, id])
        return rows
    } catch (error) {
        console.log('Error to add a role', error)

    }
}
// delete role
async function deleteRole(id) {
    try {
        const [rows] = await pool.query('DELETE FROM roles WHERE RoleID = ?', [id])
        return rows
    } catch (error) {
        console.log('Error to add a role', error)

    }
}
// get all roles
async function getAllRoles() {
    try {
        const [rows] = await pool.query('SELECT * FROM roles')
        return rows
    } catch (error) {
        console.log('Error to add a role', error)

    }
}
// get a single role
async function getRoleById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM roles WHERE RoleID = ?', [id])
        return rows
    } catch (error) {
        console.log('Error to add a role', error)

    }
}

module.exports = {
    addRole,
    updateRole,
    deleteRole,
    getAllRoles,
    getRoleById
}