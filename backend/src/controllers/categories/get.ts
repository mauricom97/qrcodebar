import Category from "../../db/models/Category";
import Item from "../../db/models/Item";
import { Request, Response } from 'express';

export const get = async (req: any, res: Response) => {
    try {

        const filters = extractData(req)
        const categories = await getCategories(filters.menu)
        
        return res.send(categories)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}


function extractData(req: any) {
    const { menu } = req.query
    return { menu }
}

async function getCategories(menu: boolean) {
    try {
        const categories = await Category.findAll({
            include: [{ model: Item, as: 'itens'}]
        })
        return categories
        
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}