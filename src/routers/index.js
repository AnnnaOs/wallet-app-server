import { Router } from 'express';

import authRouter from './auth.js';
import usersRouter from './users.js';
import transactionsRouter from './transactions.js';
import categoriesRouter from './categories.js';
import summaryRouter from './summary.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/transactions', transactionsRouter);
router.use('/categories', categoriesRouter);
router.use('/summary', summaryRouter);

export default router;
