import { Response } from 'express';
import jwt from 'jsonwebtoken'


export const get =  async (req: any, res: Response) => {
    try {
        const requestData = extractData(req)
        const bills = await getBills(req, requestData)
        return res.send(bills)
    } catch (error) {
        console.log(error)
    }
}

function extractData(request: any) {
    const token = request.headers.token
    const dataTable: any = jwt.verify(token, process.env.JWTKEY as string)
    const { company_uuid, table_uuid } = dataTable
    return { company_uuid, table_uuid }
}

async function getBills(req: any, request: any) {
    try {
        let bill = await req.redisClient.get(`${request.company_uuid}${request.table_uuid}`, (error: any, reply: any) => {
            if (error) {
              console.error(error);
            }
          })
          bill = JSON.parse(bill)
        return bill
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}