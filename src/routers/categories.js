import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getTransactionCategories } from '../controllers/categories.js';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getTransactionCategories));

export default router;
