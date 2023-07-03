import { Request, Response } from 'express';

import Bill from "../../db/models/Bills";
import jwt from "jsonwebtoken";


export const getBillsByTable = async (req: Request, res: Response) => {
    try {
        const requestData = extractData(req);
        const bills = await getBills(requestData);
        return res.send(bills);
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
}

function extractData(request: any) {
    try {
        const token = request.headers.token;
        const { company_uuid, table_uuid } = jwt.verify(token, process.env.JWTKEY as string) as any;
        return { company_uuid, table_uuid };
    } catch (error) {
        throw new Error(`${error}`);
    }
}

async function getBills(request: any) {
    try {
        return await Bill.findAll({
            attributes: ['code'],
            where: {
                company_uuid: request.company_uuid,
                uuid_table: request.table_uuid
            },
            group: ['code']
        })
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`);
    }
}