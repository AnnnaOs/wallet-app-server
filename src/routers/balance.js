import { Router } from 'express';
import { getBalance } from '../controllers/balanceController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getBalance));

export default router;
