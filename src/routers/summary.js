import { Router } from 'express';
import {
  getExpenseSummaryByCategories,
  getIncomeAndExpenseSummaryByPeriod,
  getSummary,
  getSummaryCategories,
} from '../controllers/summary.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

// GET /summary?period=YYYY-MM
router.get('/transactions/summary', authenticate, ctrlWrapper(getSummary));
router.get(
  '/transaction-categories',
  authenticate,
  ctrlWrapper(getSummaryCategories),
);
router.get(
  '/transactions-summary/categories',
  authenticate,
  ctrlWrapper(getExpenseSummaryByCategories),
);
router.get(
  '/transactions-summary-by-period',
  authenticate,
  ctrlWrapper(getIncomeAndExpenseSummaryByPeriod),
);

export default router;
