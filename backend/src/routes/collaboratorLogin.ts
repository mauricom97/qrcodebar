import express from 'express';
import { create } from '../controllers/collaboratorLogin/create';
import { login } from '../controllers/collaboratorLogin/login';
import { checkLogin } from '../controllers/collaboratorLogin/checkLogin'
const router = express.Router();

router.post('/create', create);
router.post('/login', login);
router.post('/checkLogin', checkLogin)

export default router;