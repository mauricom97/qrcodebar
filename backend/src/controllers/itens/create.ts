import Item from '../../db/models/Item';
import { Request, Response } from 'express';

export const create = async (req: Request, res: Response) => {
    try {
        const requestData = extractData(req)
        const item = await createItem(req, requestData)
        return res.send(item)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

function extractData(request: { body: { name: string, price: string, menu: boolean, description: string, category: string } }): { name: string, price: string, menu: boolean, description: string, category: string } {
    try {
        const { name, price, menu, description, category } = request.body
        return { name, price, menu, description, category }
    } catch (error) {
        throw new Error(`${error}`)
    }
}

async function createItem(req: any, request: { name: string, price: string, menu: boolean, description: string, category: string }): Promise<{ name: string, price: number, menu: boolean, category: string }> {
    const newItem = { name: request.name, price: request.price, menu: request.menu, description: request.description, category: request.category }
    let item = await Item.schema(req.company.schemaName).create(newItem)
    item = item.dataValues
    return {
        name: item.name,
        price: item.price,
        menu: item.menu,
        category: item.category
    }
} 