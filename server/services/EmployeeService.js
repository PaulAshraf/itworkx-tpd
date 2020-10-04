const sequelize = require('../config/db')
const employees_profiles = require('../models/employees_profiles')(sequelize)
const managers = require('../models/managers')(sequelize)


// adds an employee on the system
const addEmployee = async (data) => {
    return
}

// updates an employee on the system
const updateEmployee = async (id, data) => {
    return
}

//deactivates an employee from the system
const deactivateEmployee = async (id) => {
    return
}

//returns an emplyee with this id
const getEmployee = async (id) => {
    return
}

//returns all employees
const getAllEmployees = async () => {
    try {
        const employees = await employees_profiles.findAll()
        return employees
    } catch (error) {
        console.error('❌❌ ERROR: ', error)
        throw error
    }
}

//returns all managers
const getAllManagers = async () => {
    try {
        const managersData = await managers.findAll()
        return managersData
    } catch (error) {
        console.error('❌❌ ERROR: ', error)
        throw error
    }
}


//returns all the skills of the employee
const getEmployeeSkills = async (id) => {
    return
}

// returns all the certificates of the emplyee
const getEmployeeCertificates = async (id) => {
    return
}

//returns all the history of skills updates of the employee
const getEmployeeSkillsHistory = async (id) => {
    return
}

//returns all the training of the employee
//fetches from an external API "mock api in our case"
const getEmployeeTraining = async (id) => {
    return
}

module.exports = {
    getAllEmployees,
    getAllManagers
}
