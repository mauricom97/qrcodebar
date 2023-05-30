import express from 'express';
import { get } from '../controllers/bills/get';
import { auth } from '../middlewares/auth';
 

const router = express.Router();

router.get('/', auth, get)

export default router;