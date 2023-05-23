import Item from '../../db/models/Item';
import Category from '../../db/models/Category';
import { Request, Response } from 'express';
import { sequelize } from "../../db/config/database"


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
        console.log(data)
        menu = data[0]
      })
      return menu
    } catch (error) {
        throw new Error(`${error}`)
    }
}