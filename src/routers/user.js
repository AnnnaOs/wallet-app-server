import { Router } from 'express';
import {
  getCurrentUserController,
  patchUserController,
} from '../controllers/user.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/currentUser', isValidId, ctrlWrapper(getCurrentUserController));

router.patch('/currentUser', authenticate, ctrlWrapper(patchUserController));

export default router;