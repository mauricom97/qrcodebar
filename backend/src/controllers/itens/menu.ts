import Item from '../../db/models/Item';
import Category from '../../db/models/Category';
import Bills from '../../db/models/Bills';
import { Request, Response } from 'express';
import { sequelize } from "../../db/config/database"
import jwt from 'jsonwebtoken'



export const menu = async (req: Request, res: Response) => {
    try {
        const { schemaName, dataTable } = extractData(req)
        const menu = await getMenu(schemaName)
        const bills = await getBills(schemaName, dataTable)
        return res.send({menu, bills})
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

function extractData(request: any) {
    const token = request.query.token
    const dataTable = jwt.verify(token, process.env.JWTKEY as string)
    const schemaName = request.company.schemaName
    return { schemaName, dataTable }
}

async function getMenu(dbName: string) {
    try {
        let menu: any
        await sequelize.query(`
        SELECT "Item"."uuid", "Item"."name", "Item"."price", "Item"."description",
          "Item"."menu", "Item"."category", "Category"."uuid" AS "Category.uuid",
          "Category"."name" AS "Category.name"
        FROM "${dbName}"."itens" AS "Item"
        LEFT OUTER JOIN "categories" AS "Category"
        ON "Item"."category"::uuid = "Category"."uuid"
        WHERE "Item"."menu" = true;
      `).then((data: any) => {
        menu = data[0]
      })
      return menu
    } catch (error) {
        throw new Error(`${error}`)
    }
}

async function getBills(dbName: string, dataTable: any) {
    try {
        const bills = await Bills.schema(dbName).findAll({
            where: {
                uuid_table: dataTable.table_uuid,
            }
        })
        return bills
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}