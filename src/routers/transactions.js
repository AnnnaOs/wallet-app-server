import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  addTransactionsSchema,
  editTransactionsSchema,
} from '../validation/transactions.js';
import {
  createTransactionController,
  deleteTransactionController,
  getAllTransactionsController,
  updateTransactionController,
} from '../controllers/transactions.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', authenticate, ctrlWrapper(getAllTransactionsController));

router.post(
  '/',
  authenticate,
  validateBody(addTransactionsSchema),
  ctrlWrapper(createTransactionController),
);

router.patch(
  '/:id',
  authenticate,
  isValidId,
  validateBody(editTransactionsSchema),
  ctrlWrapper(updateTransactionController),
);

router.delete(
  '/:id',
  authenticate,
  isValidId,
  ctrlWrapper(deleteTransactionController),
);

export default router;
