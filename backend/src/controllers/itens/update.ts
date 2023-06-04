import Item from '../../db/models/Item';
import { Request, Response } from 'express';

export const update = async (req: any, res: Response) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        const item = await updateItem(requestData)
        return res.send(item)
    } catch (error) {
        console.log(error)
    }
}

function extractData(request: Request) {
    const { uuid } = request.query
    const { name, price, description, menu, category } = request.body
    return { uuid, name, price, description, menu, category }
}

async function analyseData(request: any) {
    const { uuid } = request
    if (!uuid) throw new Error(`uuid is required`)
    return request
}

async function updateItem(request: any) {
    try {
        const item = await Item.update(request, { where: { uuid: request.uuid } })
        return item
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}