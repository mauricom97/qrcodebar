import { Request, Response } from 'express';
import * as redis from 'redis';
const client: any = redis.createClient();
import jwt from 'jsonwebtoken'


export const get =  async (req: any, res: Response) => {
    try {
        await client.connect()
        const requestData = extractData(req)
        const bills = await getBills(requestData)
        // client.quit();
        client.disconnect()
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

async function getBills(request: any) {
    try {
        let bill = await client.get(`${request.company_uuid}${request.table_uuid}`, (error: any, reply: any) => {
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