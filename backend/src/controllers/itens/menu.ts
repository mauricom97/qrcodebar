import Item from '../../db/models/Item';
import { Request, Response } from 'express';

export const menu = async (req: Request, res: Response) => {
    try {
        const schemaName = extractData(req)
        const menu = await getMenu(schemaName)
        return res.send(menu)      
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

function extractData(request: any) {
    return request.company.schemaName
}

async function getMenu(dbName: string) {
    const menu = await Item.schema(dbName).findAll({ where: { menu: true } })
    return menu
}