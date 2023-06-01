import * as redis from 'redis';
const redisClient = process.env.REDIS_HOST ? redis.createClient({ url: process.env.REDIS_HOST }) : redis.createClient()
redisClient.on('connect', () => console.log('::> Redis Client Connected'))
redisClient.on('error', (err) => console.log('<:: Redis Client Error', err))
redisClient.connect()

export const auth = async (req: any, res: any, next: any) => {
    try {
        req.redisClient = redisClient
        next()
    } catch (error) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    }
}