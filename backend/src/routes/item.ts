import express from 'express';
import { index } from '../controllers/itens/index';
import { create } from '../controllers/itens/create';
import { menu } from '../controllers/itens/menu';
import { update } from '../controllers/itens/update';
import { destroy } from '../controllers/itens/destroy';
import { auth } from '../middlewares/auth'
const router = express.Router();

router.get('/', auth, index)
router.post('/create', auth, create);
router.put('/update', auth, update);
router.delete('/destroy', auth, destroy)
router.get('/menu', auth, menu)

export default router;