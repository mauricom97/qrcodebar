import TableCompany from '../../db/models/TableCompany';
import QRCode from '../../db/models/QrCode';
import { Response } from 'express';
import _ from 'lodash';

export const index = async (req: any, res: Response) => {
    try {
        let table_company: any = await TableCompany.findAll({
            raw: true,
            where: {
                company_uuid: req.company.uuid
            }
        })
        table_company = _.orderBy(table_company, ['num'], ['asc'])
        for(let table of table_company){
            let qrcode: any = await QRCode.findOne({
                attributes: ['image'],
                raw: true,
                where: {
                    uuid_company_table: table.uuid,
                    company_uuid: req.company.uuid
                }
            })
            table.qrcode = qrcode.image
        }
        console.log(table_company)
        return res.send(table_company)
    } catch (error) {
        return res.status(500).json({ error });
    }
}
