import express from 'express';
import { get } from '../controllers/categories/get';
import { create } from '../controllers/categories/create';
import { update } from '../controllers/categories/update';
import { destroy } from '../controllers/categories/destroy';
import { auth } from '../middlewares/auth';
const router = express.Router();

router.get('/', auth, get);
router.post('/', auth, create);
router.put('/', auth, update);
router.delete('/', auth, destroy)

export default router;