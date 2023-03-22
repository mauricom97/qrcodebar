const models = require('../../models')
module.exports = async (req, res) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        const project = await createProject(requestData)
        return res.send(project)
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
}

function extractData(req) {
    const { name, description, dateStart, dateEnd, valueHour } = req.body
    return {
        name,
        description,
        dateStart,
        dateEnd,
        valueHour
    }
}

async function analyseData(request) {
    const { name } = request
    if (!name) {
        throw new Error('Name is required')
    }
}

async function createProject(request) {
    const project = await models.Project.create(request)
    return project
}