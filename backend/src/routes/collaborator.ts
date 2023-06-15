import express from 'express';
import { create } from '../controllers/collaborator/create';
import { getUserToken } from '../controllers/collaborator/getUserToken';
import { auth } from '../middlewares/auth';
const router = express.Router();

router.post('/create', create);
router.get('/getUserToken', auth, getUserToken);

export default router;