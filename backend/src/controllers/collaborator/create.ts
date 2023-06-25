import Collaborator from "../../db/models/Collaborator";
import { Request, Response } from 'express';
import moment from 'moment';

export const create = async (req: Request, res: Response) => {
    try {
        const requestData = extractData(req)
        const collaborator = await createCollaborator(requestData)
        return res.send(collaborator)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

function extractData(request: { body: { firstName: string, lastName: string, email: string, phone: string, birthday: Date, type: number } }): { firstName: string, lastName: string, email: string, phone: string, birthday: Date, type: number } {
    try {
        const { firstName, lastName, email, phone, birthday, type } = request.body
        return { firstName, lastName, email, phone, birthday, type }
    } catch (error) {
        throw new Error(`${error}`)
    }
}

async function createCollaborator(request: { firstName: string, lastName: string, email: string, phone: string, birthday: Date, type: number }): Promise<{ firstName: string, lastName: string, email: string, phone: string, birthday: Date, type: number }> {
    const newCollaborator = { firstName: request.firstName, lastName: request.lastName, email: request.email, phone: request.phone, birthday: moment(request.birthday, 'YYYY-MM-DD').format('YYYY-MM-DD'), type: request.type }
    console.log(newCollaborator)
    let collaborator = await Collaborator.create(newCollaborator)
    collaborator = collaborator.dataValues
    return collaborator
}