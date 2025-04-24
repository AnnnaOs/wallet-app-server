import { Router } from 'express';

import authRouter from './auth.js';
import userRouter from './user.js';
import transactionsRouter from './transactions.js';
import categoriesRouter from './categories.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/transactions', transactionsRouter);
router.use('/categories', categoriesRouter);

export default router;
