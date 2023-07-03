import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'


export const checkLogin = async (req: Request, res: Response) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        await validityToken(requestData)
        return res.status(200).send({ auth: true, message: 'Token is valid.' })
    } catch (error:any) {
        return res.status(401).send({ auth: false, message: `${error.message}` })
    }
}

function extractData(req: any) {
    const { token } = req.headers
    return { token }
}

async function analyseData(request: any) {
    if(!request.token) throw new Error('Token required')
}

async function validityToken(request: any) {
    try {
        jwt.verify(request.token, process.env.JWTKEY as string)
    } catch (error: any) {
        console.log(error)
        throw new Error(`${error.message}`)
    }
}