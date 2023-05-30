import Bill from "../../db/models/Bills";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'

export const get = async (req: any, res: Response) => {
    try {
        const requestData = extractData(req)
        const bills = await getBills(req, requestData)
        return res.send(bills)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

function extractData(request: any) {
    try {
        const token = request.headers.token
        const dataTable: any = jwt.verify(token, process.env.JWTKEY as string)
        return dataTable
    } catch (error) {
        throw new Error(`${error}`)
    }
}

async function getBills(req: any, request: any) {
    try {
        const bills = await Bill.schema(req.company.schemaName).findAll({
            where: {
                uuid_table: request.table_uuid,
            }
        })
        return bills
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}