import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  addTransactionSchema,
  editTransactionSchema,
} from '../validation/transactions.js';

import {
  getTransactionsController,
  createTransactionController,
  deleteTransactionController,
  patchTransactionController,
} from '../controllers/transactions.js';

const router = Router();

router.get('/', ctrlWrapper(getTransactionsController));

router.post('/', ctrlWrapper(createTransactionController));

router.patch(
  '/:transactionId',
  isValidId,
  validateBody(editTransactionSchema),
  ctrlWrapper(patchTransactionController),
);

router.delete(
  '/:transactionId',
  isValidId,
  validateBody(addTransactionSchema),
  ctrlWrapper(deleteTransactionController),
);

export default router;
