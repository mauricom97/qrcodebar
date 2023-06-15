import express from 'express';
import { create } from '../controllers/companies/create';
import { getCompanyToken } from '../controllers/companies/getCompanyToken';
import { auth } from '../middlewares/auth';
const router = express.Router();

router.post('/create', create);
router.get('/getCompanyToken', auth, getCompanyToken);

export default router;