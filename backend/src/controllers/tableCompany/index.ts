import TableCompany from '../../db/models/TableCompany';
import { Response } from 'express';

export const index = async (req: any, res: Response) => {
    try {
        const table_company = await TableCompany.schema(req.company.schemaName).findAll()
        return res.send(table_company)
    } catch (error) {
        return res.status(500).json({ error });
    }
}
