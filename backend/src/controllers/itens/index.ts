import Item from '../../db/models/Item';
import { Request, Response } from 'express';
import _ from 'lodash'
import { Op } from 'sequelize'

export const index = async (req: any, res: Response) => {
    try {
        let { name , category, menu } = req.query
        let where: any = { name , category, menu }
        where.company_uuid = req.company.uuid
        where = _.omitBy(where, _.isUndefined)

        if(where.name) {
            where.name = { [Op.iLike]: `%${where.name}%` }
        }

        const items = await Item.findAll({
            where
        })
        return res.send(items)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}