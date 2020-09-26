const router = require('express').Router()
const { DateTime } = require('luxon')

const ReleaseRequestsService = require('../services/ReleaseRequestService')

router.post('/search', async (req, res) => {
    const filters = req.body.filters
    try {
        const requests = await ReleaseRequestsService.getAllReleaseRequests(filters)
        res.status(200).json(requests)
    }
    catch (error) {
        res.status(400).json({ error })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const request = await ReleaseRequestsService.getReleaseRequest(id)
        res.status(200).json(request)
    }
    catch (error) {
        res.status(400).json({ error })
    }
})

router.get('/actions_history/:id', async (req, res) => {
    const id = req.params.id
    try {
        const request = await ReleaseRequestsService.getAllReleaseRequestActions(id)
        res.status(200).json(request)
    }
    catch (error) {
        res.status(400).json({ error })
    }
})

router.post('/new', async (req, res) => {
    const data = req.body

    try {
        const request = await ReleaseRequestsService.addReleaseRequest(data)
        res.status(200).json(request)
    }
    catch (error) {
        res.status(400).json({ error })
    }
})

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    try {
        const request = await ReleaseRequestsService.deleteReleaseRequest(id)
        res.status(200).json(request)
    }
    catch (error) {
        res.status(400).json({ error })
    }
})

router.put('/edit/:id', async (req, res) => {
    const id = req.params.id
    const data = req.body.data
    const action = req.body.action


    try {
        const request = await ReleaseRequestsService.updateReleaseRequest(id, data)
        if (action) {

            action.release_request_reference_number = id
            action.action_date = DateTime.local().toFormat('yyyy-MM-dd')
            action.action_owner = "Paul Ashraf" // get from auth middle ware

            const actionResponse = await ReleaseRequestsService.updateReleaseRequestAction(action)
            res.status(200).json({
                request,
                actionResponse
            })
        }
        else {
            res.status(200).json(request)
        }
    }
    catch (error) {
        res.status(400).json({ error })
    }
})

module.exports = router