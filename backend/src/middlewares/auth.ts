import jwt from 'jsonwebtoken'
import Company from '../db/models/Company'
import * as redis from 'redis';
const redisClient = process.env.REDIS_HOST ? redis.createClient({ url: process.env.REDIS_HOST }) : redis.createClient()
redisClient.on('connect', () => console.log('::> Redis Client Connected'))
redisClient.on('error', (err) => console.log('<:: Redis Client Error', err))
redisClient.connect()

export const auth = async (req: any, res: any, next: any) => {
    try {
        const token = req.headers.token ? req.headers.token : req.query.token
        if (!token) {
            return res.status(401).send({ auth: false, message: 'No token provided.' })
        }
        const collaboratorConfig = extractDataToken(token)
        let company = await Company.findOne({ where: { uuid: collaboratorConfig.company_uuid } })
        company = company ? company.dataValues : null
        req.collaborator = collaboratorConfig
        req.company = company
        req.redisClient = redisClient
        next()
    } catch (error: any) {
        console.log(error)
        return res.status(401).send({ auth: false, message: `${error.message}` })
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