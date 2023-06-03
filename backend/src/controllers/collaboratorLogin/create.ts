import CollaboratorLogin from "../../db/models/CollaboratorLogin";
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

export const create = async (req: Request, res: Response) => {
    try {
        const requestData = extractData(req)
        const collaborator = await createCollaboratorLogin(requestData)
        return res.send(collaborator)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

function extractData(request: { body: { username: string, password: string, collaborator_uuid: string, company_uuid: string } }): { username: string, password: string, collaborator_uuid: string, company_uuid: string } {
    try {
        const { username, password, collaborator_uuid, company_uuid } = request.body
        return { username, password, collaborator_uuid, company_uuid }
    } catch (error) {
        throw new Error(`${error}`)
    }
}

async function createCollaboratorLogin(request: { username: string, password: string, collaborator_uuid: string, company_uuid: string }) {
    const newCollaborator = { username: request.username, password: await getHash(request.password), collaborator_uuid: request.collaborator_uuid, company_uuid: request.company_uuid }
    console.log(newCollaborator)
    let collaborator = await CollaboratorLogin.create(newCollaborator)
    collaborator = collaborator.dataValues
    return {
        username: collaborator.username,
        password: collaborator.password,
        collaborator_uuid: collaborator.collaborator_uuid,
        company_uuid: collaborator.company_uuid
    }
}

async function getHash (password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };