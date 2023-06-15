import Company from "../../db/models/Company";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'

export const getCompanyToken = async (req: Request, res: Response) => {
    try {
        const requestData = extractData(req)
        const company = await getCompany(requestData)
        return res.send(company)
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}

function extractData(request: any) {
    const { token } = request.headers
    return { token }
}

async function getCompany(request: { token: string }) {
    try {
        const companyInfo: any = jwt.verify(request.token, process.env.JWTKEY as string)

        const company = await Company.findOne({
            raw: true,
            where: {
                uuid: companyInfo.company_uuid
            }
        })
        return company
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}