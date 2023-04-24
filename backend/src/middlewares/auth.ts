import jwt from 'jsonwebtoken'
import Company from '../db/models/Company'

export const auth = async (req: any, res: any, next: any) => {
    try {
        const token = req.headers.token ? req.headers.token : req.query.token
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' })
        
        const collaboratorConfig = extractDataToken(token)
        let company = await Company.findOne({ where: { uuid: collaboratorConfig.company_uuid } })
        company = company ? company.dataValues : null
        req.collaborator = collaboratorConfig
        req.company = company
        next()
    } catch (error) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    }
}

function extractDataToken(token: string): any {
    try {
        const decoded = jwt.verify(token, process.env.JWTKEY as string)
        return decoded
    } catch (error) {
        throw new Error(`${error}`)
    }
  }