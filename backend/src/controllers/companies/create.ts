import Company from "../../db/models/Company";
import { Request, Response } from 'express';


export const create = async (req: Request, res: Response) => {
    try {
        const requestData: {
            cnpj: string,
            stateRegistration: string,
            razaoSocial: string,
            nomeFantasia: string,
            phone: string,
            email: string,
            state: string,
            city: string,
            neighborhood: string,
            address: string,
            schemaName: string
        } = extractData(req)
        let company = await createCompany(requestData)
        return res.send(company)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

function extractData(req: { body: { cnpj: string, stateRegistration: string, razaoSocial: string, nomeFantasia: string, phone: string, email: string, state: string, city: string, neighborhood: string, address: string, schemaName: string } }) {
    try {
        const { cnpj, stateRegistration, razaoSocial, nomeFantasia, phone, email, state, city, neighborhood, address, schemaName } = req.body
        return { cnpj, stateRegistration, razaoSocial, nomeFantasia, phone, email, state, city, neighborhood, address, schemaName }
    } catch (error) {
        throw new Error(`${error}`)
    }
}

async function createCompany(request: { cnpj: string, stateRegistration: string, razaoSocial: string, nomeFantasia: string, phone: string, email: string, state: string, city: string, neighborhood: string, address: string, schemaName: string }) {
    const newCompany = { cnpj: request.cnpj, stateRegistration: request.stateRegistration, razaoSocial: request.razaoSocial, nomeFantasia: request.nomeFantasia, phone: request.phone, email: request.email, state: request.state, city: request.city, neighborhood: request.neighborhood, address: request.address, schemaName: request.schemaName }
    let company = await Company.schema('qrcodebaradmin').create(newCompany)
    company = company.dataValues
    return {
        cnpj: company.cnpj,
        stateRegistration: company.stateRegistration,
        razaoSocial: company.razaoSocial,
        nomeFantasia: company.nomeFantasia,
        phone: company.phone,
        email: company.email,
        state: company.state,
        city: company.city,
        neighborhood: company.neighborhood,
        address: company.address
    }
}