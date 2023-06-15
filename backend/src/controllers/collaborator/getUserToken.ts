import Collaborator from "../../db/models/Collaborator";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'

export const getUserToken = async (req: Request, res: Response) => {
    try {
        const requestData = extractData(req)
        const collaborator = await getCollaborator(requestData)
        return res.send(collaborator)
    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}

function extractData(request: any) {
    const { token } = request.headers
    return { token }
}

async function getCollaborator(request: { token: string }) {
    try {
        const collaboratorInfo: any = jwt.verify(request.token, process.env.JWTKEY as string)

        const collaborator = await Collaborator.findOne({
            raw: true,
            where: {
                uuid: collaboratorInfo.collaborator_uuid
            }
        })
        return collaborator
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}