import Bill from "../../db/models/Bills";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
export const create = async (req: any, res: Response) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        let bill = requestData.infoToken.bill
        await setBillInCache(req, requestData, bill)
        bill = await createBill(req, requestData)
        return res.send(bill)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

function extractData(request: any) {
    try {
        console.log(request.company)
        let itens = request.body.itens
        const token = request.headers.token
        const dataTable: any = jwt.verify(token, process.env.JWTKEY as string)
        const bill = request.query.bill
        const company_uuid = dataTable.company_uuid
        const table_uuid = dataTable.table_uuid
        const infoToken = { bill, company_uuid, table_uuid }
        itens = itens.map((item: any) => {
            item.code = parseInt(bill)
            item.uuid_table = dataTable.table_uuid
            item.company_uuid = dataTable.company_uuid
            return item
        })
        return { itens, infoToken }
    } catch (error) {
        throw new Error(`${error}`)
    }
}

async function analyseData(request: any) {
    if(!request.itens.length){
        throw new Error('Nenhum item foi enviado')
    }
    return
}


async function setBillInCache(req: any, request: any, bill: any) {
    try {
        let existBillInCache = await getCacheBills(req, request)
        if(existBillInCache && !existBillInCache.bills.includes(bill)) {
            existBillInCache.bills.push(bill)
        } else if(!existBillInCache || existBillInCache.bills.length === 0) {
            existBillInCache = {bills: [bill]}
        }
        await req.redisClient.set(`${request.infoToken.company_uuid}${request.infoToken.table_uuid}`, JSON.stringify(existBillInCache), (error: any, reply: any) => {
            if (error) {
                console.error(error);
            }
        })
        return existBillInCache
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}

async function getCacheBills(req: any,request: any) {
    try {
        let bills =  await req.redisClient.get(`${request.infoToken.company_uuid}${request.infoToken.table_uuid}`, (error: any, reply: any) => {
            if (error) {
                console.error(error);
            }
        })
        bills = JSON.parse(bills)

        return bills
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}

async function createBill(req: any, request: {itens: Array<any>, infoToken: any}) {
    try {
        let bill = await Bill.bulkCreate(request.itens)
        return bill
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}
