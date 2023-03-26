const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: true })
const projects = require('./projects')
const cors = require('cors')

module.exports = async (app) => {
  app.use(cors())
  app.use('/projects', jsonParser, urlencodedParser, projects)
}
