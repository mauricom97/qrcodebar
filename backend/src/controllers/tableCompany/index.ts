import UserModel from '../../db/models/TableCompany';
import { Request, Response } from 'express';

export const index = async (req: Request, res: Response) => {
    try {
        const table_company = await UserModel.findAll()
        return res.send(table_company)
    } catch (error) {
        return res.status(500).json({ error });
    }
}