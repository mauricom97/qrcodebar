import express from 'express'
import { index } from '../controllers/tableCompany/index'
import { create } from '../controllers/tableCompany/create'
import { auth } from '../middlewares/auth'
const router = express.Router()

router.get('/', auth, index)
router.post('/create', auth, create)

export default router