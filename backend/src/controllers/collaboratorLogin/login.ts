import CollaboratorLogin from "../../db/models/CollaboratorLogin"
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const login = async (req: Request, res: Response) => {
    try {
        const requestData: { username: string, password: string } = extractData(req)
        const collaborator = await getCollaboratorLogin(requestData)
        const token = generateToken(collaborator)
        return res.send({ token })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

function extractData(request: {body: { username: string, password: string }}): { username: string, password: string } {
    try {
        const { username, password } = request.body
        return { username, password }
    } catch (error) {
        throw new Error(`${error}`)
    }
}

async function getCollaboratorLogin(request: { username: string, password: string }) {
    try {
        const collaboratorLogin = await CollaboratorLogin.findOne({ 
            raw: true,
            where: { 
            username: request.username 
        }})

        if (collaboratorLogin) {
            const isMatch = await bcrypt.compare(request.password, collaboratorLogin.password)
            if (isMatch) {
                return {
                    username: collaboratorLogin.username,
                    collaborator_uuid: collaboratorLogin.collaborator_uuid,
                    company_uuid: collaboratorLogin.company_uuid
                }
            } else {
                throw new Error('Password incorrect')
            }
        } else {
            throw new Error('Collaborator not found')
        }
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}

function generateToken(payload: any): string {
    const secret = process.env.JWTKEY as string // coloque sua chave secreta aqui
    const options = { expiresIn: '24h' } // defina a expiração do token (opcional)
    const token = jwt.sign(payload, secret, options)
    return token
  }