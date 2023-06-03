import Category from "../../db/models/Category";
import { Request, Response } from 'express';

export const create = async (req: any, res: Response) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        const category = await createCategory(req, requestData.name)
        return res.send(category)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

function extractData(request: Request) {
    const { name } = request.body
    return { name }
}

async function analyseData(request: any) {
    const { name } = request
    if (!name) throw new Error(`Name is required`)
    return request
}

async function createCategory(req: any, name: string) {
    try {
        const category = await Category.create({ name, company_uuid: req.company.uuid })
        return category
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}