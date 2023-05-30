export const auth = async (req: any, res: any, next: any) => {
    try {
        next()
    } catch (error) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    }
}