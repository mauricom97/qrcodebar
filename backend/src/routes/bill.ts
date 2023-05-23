import express from 'express';
import { create } from '../controllers/bills/create';
import { auth } from '../middlewares/auth';
const router = express.Router();

router.post('/', auth, create);

export default router;