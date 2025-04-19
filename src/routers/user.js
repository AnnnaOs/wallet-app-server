import { Router } from "express";

import { getCurrentUserController } from "../controllers/user.js";
import { isValidId } from "../middlewares/isValidId.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";



const router = Router();

router.get(
    '/currentUser', isValidId, ctrlWrapper(getCurrentUserController)
);

export default router;