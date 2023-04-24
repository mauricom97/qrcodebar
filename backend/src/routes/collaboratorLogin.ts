import express from 'express';
import { create } from '../controllers/collaboratorLogin/create';
import { login } from '../controllers/collaboratorLogin/login';
const router = express.Router();

router.post('/create', create);
router.post('/login', login);

export default router;