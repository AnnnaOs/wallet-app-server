import { logoutUserController } from '../controllers/auth.js';

router.post('/logout', ctrlWrapper(logoutUserController));
