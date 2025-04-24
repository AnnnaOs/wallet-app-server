import { Router } from 'express';
import { getCurrentUserController, updateAvatarController, updateUserController } from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/current', authenticate, ctrlWrapper(getCurrentUserController));

router.patch('/current', authenticate, ctrlWrapper(updateUserController));


// 🔽 Додаємо аватар
router.patch('/avatar', authenticate, upload.single('avatar'), ctrlWrapper(updateAvatarController));

export default router;
