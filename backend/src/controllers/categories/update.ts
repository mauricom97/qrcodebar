import Category from "../../db/models/Category";
import { Request, Response } from 'express';

export const update = async (req: any, res: Response) => {
    try {
        const requestData = extractData(req)
        await analyseData(requestData)
        const category = await updateCategory(requestData.uuid, requestData.name)
        return res.send(category)
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}

function extractData(request: Request) {
    console.log(request.body)
    const { name } = request.body
    const { uuid } = request.query
    return { name, uuid }
}

async function analyseData(request: any) {
    const { name, uuid } = request
    if (!name) throw new Error(`Name is required`)
    if (!uuid) throw new Error(`UUID is required`)
    return request
}

async function updateCategory(uuid: any, name: string) {
    try {
        const category = await Category.update({ name }, { where: { uuid } })
        return category
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}
