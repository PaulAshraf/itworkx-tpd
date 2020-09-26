const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('hackathon', 'hackathonuser', 'P@$$w0rd', {
    host: '138.68.100.214',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})

const modelDefiners = [
    require('../models/assignment'),
    require('../models/certification_providers'),
    require('../models/certifications'),
    require('../models/employee_certifications'),
    require('../models/employee_skills'),
    require('../models/employee_skills_history'),
    require('../models/employee_training'),
    require('../models/employees_profiles'),
    require('../models/managers'),
    require('../models/release_requests'),
    require('../models/release_requests_actions'),
    require('../models/resource_request_actions'),
    require('../models/resource_request_skills'),
    require('../models/resource_requests'),
    require('../models/role'),
    require('../models/skills'),
    require('../models/user_role'),
    require('../models/users'),
]

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize)
}

module.exports = sequelize