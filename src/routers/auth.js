const express = require('express');
const router = express.Router();

import { logoutUserController } from '../controllers/auth.js';

const router = Router();

router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
