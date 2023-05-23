import Bill from "../../db/models/Bills";
import { Request, Response } from 'express';

export const create = async (req: any, res: Response) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        const bill = await createBill(req, requestData)
        return res.send(bill)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

function extractData(req: any) {
    try {
        let itens = req.body.itens
        const bill = req.query.bill
        itens = itens.map((item: any) => {
            item.code = parseInt(bill)
            return item
        })
        return itens
    } catch (error) {
        throw new Error(`${error}`)
    }
}

async function analyseData(request: Array<any>) {
    if(!request.length){
        throw new Error('Nenhum item foi enviado')
    }
    return
}

async function createBill(req: any, request: Array<any>) {
    try {
        let bill = await Bill.schema(req.company.schemaName).bulkCreate(request)
        return bill
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}