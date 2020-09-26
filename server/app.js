const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./config/db')
const cors = require('cors')

const ReleaseRequestsController = require('./api/ReleaseRequests')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(cors())

app.use('/releases', ReleaseRequestsController)

sequelize.authenticate()
    .then(() => console.log('✔️ Connected to MySQL Database!'))
    .catch((error) => console.error('❌ Unable to connect to the database:', error))

const port = 8080
app.listen(port, () => {
    console.log(`✔️ listening on port ${port}`)
})
