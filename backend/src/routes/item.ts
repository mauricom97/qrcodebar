import express from 'express';
import { create } from '../controllers/itens/create';
import { menu } from '../controllers/itens/menu';
import { auth } from '../middlewares/auth'
const router = express.Router();

router.post('/create', auth, create);
router.get('/menu', auth, menu)

export default router;