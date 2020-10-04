const sequelize = require('../config/db')
const resource_requests = require('../models/resource_requests')(sequelize)
const resource_requests_actions = require('../models/resource_request_actions')(sequelize)
const resource_request_skills = require('../models/resource_request_skills')(sequelize)

const { DateTime } = require('luxon')

// Returns all Resource Requests with the search filters applied (and open status)
// if filters is null, returns all Resource request with status open
const getAllResourceRequests = async (filters) => {
    try {
        const requests = await resource_requests.findAll({
            where: {
                ...filters,
                // request_status: 'open'
            },
            order: [
                ['created_at', 'DESC']
            ]
        })
        return requests
    } catch (error) {
        console.error('❌❌ ERROR: ', error)
        throw error
    }
}

//Retrieves a Resource request
const getResourceRequest = async (id) => {
    try {
        const request = await resource_requests.findByPk(id)
        if (!request)
            throw { error: 'not found' }
        const skills = await resource_request_skills.findAll({
            where: {
                request_reference_number: id
            }
        })
        return { request, skills }
    } catch (error) {
        console.error('❌❌ ERROR: ', error)
        throw error
    }
}

// Adds a Resource request on the TPD system
const addResourceRequest = async (data) => {
    const num = data.requests_count
    try {
        let resArr = []
        let skillArr = []
        for (let i = 0; i < num; i++) {
            const res = await resource_requests.create(data)
            resArr.push(res)
            data.skills.forEach(async (skill) => {
                skill.request_reference_number = resArr[i].reference_number
                console.log(data.skills)
                const res = await resource_request_skills.create(skill)
                skillArr.push(res)
            })
        }
        return {
            resArr,
            skillArr
        }
    } catch (error) {
        console.error('❌❌ ERROR: ', error)
        throw error
    }
}

// Updates a Resource request on the TPD system
const updateResourceRequest = async (id, data) => {
    try {
        const res = await resource_requests.update(data,
            {
                where:
                    { reference_number: id }
            })
        return res
    } catch (error) {
        console.error('❌❌ ERROR: ', error)
        throw error
    }
}

// Deletes a Resource request from the TPD system
const deleteResourceRequest = async (id) => {
    try {
        const res = await resource_requests.destroy(
            {
                where:
                    { reference_number: id }
            })
        return res
    } catch (error) {
        console.error('❌❌ ERROR: ', error)
        throw error
    }
}

//Updates the Resource request action 
const updateResourceRequestAction = async (action) => {
    try {
        const res = await resource_requests_actions.create(action)
        return res
    } catch (error) {
        console.error('❌❌ ERROR: ', error)
        throw error
    }
}

// gets all the action updates history of a specific Resource request
const getAllResourceRequestActions = async (id) => {
    try {
        const res = await resource_requests_actions.findAll({
            where: {
                resource_request_reference_number: id
            }
        })
        return res
    } catch (error) {
        console.error('❌❌ ERROR: ', error)
        throw error
    }
}

module.exports = {
    getAllResourceRequests,
    getResourceRequest,
    addResourceRequest,
    updateResourceRequest,
    deleteResourceRequest,
    updateResourceRequestAction,
    getAllResourceRequestActions
}