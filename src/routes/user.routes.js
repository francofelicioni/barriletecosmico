import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.post('/email/reset-password', userController.sendResetEmail)
router.post('/reset-password', userController.resetPassword)

export default router