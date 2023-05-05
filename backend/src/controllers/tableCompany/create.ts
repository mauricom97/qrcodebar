import TableCompany from '../../db/models/TableCompany'
import QrCode from '../../db/models/QrCode'
import { Request, Response } from 'express'
import * as qr from 'qrcode'
import jwt from 'jsonwebtoken'


export const create = async (req: Request, res: Response) => {
    try {
        const requestData: { num: number, description: string } = extractData(req)
        const tableCompany = await createTableCompany(req, requestData)
        const qrcode = await createQrCode(req, tableCompany)
        return res.send({ num: tableCompany.num, description: tableCompany.description, qrcode: qrcode })
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

function extractData(request: { body: { num: number, description: string } }): { num: number, description: string } {
    try {
        return {
            num: request.body.num,
            description: request.body.description
        }
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}

async function createTableCompany(req: any, request: { num: number, description: string }): Promise<{ uuid: string, num: number, description: string }> {
    try {
        let table = await TableCompany.schema(req.company.schemaName).create(request)
        table = table.dataValues
        return table
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}

async function createQrCode(req: any, tableCompany: { uuid: string }): Promise<string> {
    try {
        const token = generateToken({dbname: req.company.schemaName, company_uuid: req.company.uuid, table_uuid: tableCompany.uuid })
        const url = `${process.env.FRONTEND_URL}/#/?token=${token}`
        const qrCodeUrl = await qr.toDataURL(url)
        await QrCode.schema(req.company.schemaName).create({ uuid_company_table: tableCompany.uuid, image: qrCodeUrl })
        return qrCodeUrl   
    } catch (error) {
        throw new Error(`${error}`)
    }
}

function generateToken(payload: any): string {
    const options = { expiresIn: '1y' }
    const secret = process.env.JWTKEY as string // coloque sua chave secreta aqui
    const token = jwt.sign(payload, secret, options)
    return token
  }