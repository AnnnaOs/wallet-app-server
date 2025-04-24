import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getCategoriesController } from '../controllers/categories.js';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getCategoriesController));

export default router;
