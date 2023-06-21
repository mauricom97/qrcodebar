import Category from "../../db/models/Category";
import { Response } from 'express';

export const index = async (req: any, res: Response) => {
    try {
        const categories = await Category.findAll()
        return res.send(categories)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}
