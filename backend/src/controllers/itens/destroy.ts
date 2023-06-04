import Item from '../../db/models/Item';
import { Request, Response } from 'express';

export const destroy = async (req: any, res: Response) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        const item = await destroyItem(requestData)
        return res.send({rows: item})
    } catch (error) {
        console.log(error)
    }
}

function extractData(request: Request) {
    const { uuid } = request.query
    return { uuid }
}

async function analyseData(request: any) {
    const { uuid } = request
    if (!uuid) throw new Error(`uuid is required`)
    return request
}

async function destroyItem(request: any) {
    try {
        const item = await Item.destroy({ where: { uuid: request.uuid } })
        return item
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}
