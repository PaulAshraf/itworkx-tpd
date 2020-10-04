const sequelize = require('../config/db')
const release_requests = require('../models/release_requests')(sequelize)
const release_requests_actions = require('../models/release_requests_actions')(sequelize)

const { DateTime } = require('luxon')

// Returns all Release Requests with the search filters applied (and open status)
// if filters is null, returns all Release request with status open
const getAllReleaseRequests = async (filters) => {
    try {
        const requests = await release_requests.findAll({
            where: {
                ...filters,
                // request_status: 'open'
            },
            order: [
                ['release_date', 'DESC']
            ]
        })
        return requests
    } catch (error) {
        console.error('❌❌ ERROR: ', error)
        throw error
    }
}

//Retrieves a Release request
const getReleaseRequest = async (id) => {
    try {
        const request = await release_requests.findByPk(id)
        if (!request)
            throw { error: 'not found' }
        return request
    } catch (error) {
        console.error('❌❌ ERROR: ', error)
        throw error
    }
}

// Adds a Release request on the TPD system
const addReleaseRequest = async (data) => {
    try {
        const res = await release_requests.create(data)
        return res
    } catch (error) {
        console.error('❌❌ ERROR: ', error)
        throw error
    }
}

// Updates a Release request on the TPD system
const updateReleaseRequest = async (id, data) => {
    console.log(data)
    try {
        const res = await release_requests.update(data,
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

// Deletes a Release request from the TPD system
const deleteReleaseRequest = async (id) => {
    try {
        const res = await release_requests.destroy(
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

//Updates the Release request action 
const updateReleaseRequestAction = async (action) => {
    try {
        const res = await release_requests_actions.create(action)
        return res
    } catch (error) {
        console.error('❌❌ ERROR: ', error)
        throw error
    }
}

// gets all the action updates history of a specific Release request
const getAllReleaseRequestActions = async (id) => {
    try {
        const res = await release_requests_actions.findAll({
            where: {
                release_request_reference_number: id
            }
        })
        return res
    } catch (error) {
        console.error('❌❌ ERROR: ', error)
        throw error
    }
}

module.exports = {
    getAllReleaseRequests,
    getReleaseRequest,
    addReleaseRequest,
    updateReleaseRequest,
    deleteReleaseRequest,
    updateReleaseRequestAction,
    getAllReleaseRequestActions
}