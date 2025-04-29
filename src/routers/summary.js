import { Router } from 'express';
import { getSummary } from '../controllers/summary.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

// GET /summary?period=YYYY-MM
router.get('/', authenticate, ctrlWrapper(getSummary));

export default router;

