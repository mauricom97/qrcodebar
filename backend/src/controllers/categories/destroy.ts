import Category from "../../db/models/Category";
import { Request, Response } from 'express';

export const destroy = async (req: any, res: Response) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        const category = await destroyCategory(req.company.schemaName, requestData.uuid)
        res.send(`quantity: ${category}`)
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
    if (!uuid) throw new Error(`UUID is required`)
    return request
}

async function destroyCategory(dbName: string, uuid: any) {
    try {
        const category = await Category.schema(dbName).destroy({ where: { uuid } })
        return category
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}