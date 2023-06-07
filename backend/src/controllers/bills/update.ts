import { Request, Response } from 'express';
import Bill from '../../db/models/Bills';
import _ from 'lodash';
import { io } from "../../server";

export const update = async (req: any, res: Response) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        const bill = await updateBill(requestData)
        io.emit('changeBills', { message: 'Dados atualizados' });

        return res.send(bill)
    } catch (error) {
        console.log(error)
    }
}

function extractData(request: Request) {
    const { uuid } = request.query
    const { code, uuid_item, quantity, status, uuid_table, descriptionBill } = request.body
    return { uuid, code, uuid_item, quantity, status, uuid_table, descriptionBill }
}

async function analyseData(request: any) {
    const { uuid } = request
    if (!uuid) throw new Error(`uuid is required`)
    return request
}

async function updateBill(request: any) {
    try {
        request = _.omitBy(request, _.isUndefined);
        const bill = await Bill.update(request, { where: { uuid: request.uuid } })
        return bill
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}