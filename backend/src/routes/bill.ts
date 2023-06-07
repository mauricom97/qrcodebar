import express from 'express';
import { create } from '../controllers/bills/create';
import { update } from '../controllers/bills/update';
import { get } from '../controllers/bills/get';
import { auth } from '../middlewares/auth';
const router = express.Router();

router.get('/table', auth, get)
router.put('/update', auth, update);
router.post('/', auth, create);

export default router;