const models = require('../../models')
module.exports = async (req, res) => {
    try {
        const projects = await models.Project.findAll()
        return res.send(projects)
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
}