const router = require('express').Router()
const { DateTime } = require('luxon')

const ReleaseRequestsService = require('../services/ReleaseRequestService')
const generateExcel = require('../services/ExcelService')

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

router.post('/excel', async (req, res) => {
    const name = 'ReleaseRequests'
    const data = req.body.data

    try {
        const workbook = generateExcel(name, data)

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + name + ".xlsx"
        )

        return workbook.xlsx.write(res).then(() => {
            res.status(200).end()
        })
    } catch (error) {
        console.error(error)
        return res.status(400).json({ error })
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
            console.log(action)
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