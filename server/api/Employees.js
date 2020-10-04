const router = require('express').Router()

const EmployeeService = require('../services/EmployeeService')

router.get('/', async (req, res) => {

    try {
        const employees = await EmployeeService.getAllEmployees()
        res.status(200).json(employees)
    }
    catch (error) {
        res.status(400).json({ error })
    }
})

router.get('/managers', async (req, res) => {

    try {
        const employees = await EmployeeService.getAllManagers()
        res.status(200).json(employees)
    }
    catch (error) {
        res.status(400).json({ error })
    }
})



module.exports = router