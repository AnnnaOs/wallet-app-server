import { Router } from 'express';
import {
  getExpenseSummaryByCategories,
  getIncomeAndExpenseSummaryByPeriod,
  getSummary,
} from '../controllers/summary.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getTransactionCategories } from '../controllers/categories.js';

const router = Router();

// GET /summary?period=YYYY-MM
router.get('/transactions/summary', authenticate, ctrlWrapper(getSummary));
router.get(
  '/transaction-categories',
  authenticate,
  ctrlWrapper(getTransactionCategories),
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
