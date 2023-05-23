import express from 'express';
import tableCompanyRoutes from './tableCompany'
import item from './item'
import company from './company'
import collaborator from './collaborator'
import collaboratorLogin from './collaboratorLogin'
import category from './category'
import bills from './bill'

const router = express.Router()

router.use('/tableCompany', tableCompanyRoutes)
router.use('/item', item)
router.use('/company', company)
router.use('/collaborator', collaborator)
router.use('/collaboratorLogin', collaboratorLogin)
router.use('/categories', category)
router.use('/bills', bills)

export default router