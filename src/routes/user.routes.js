import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { uploader } from "../utils/fileUploader.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

router.post('/email/reset-password', userController.sendResetEmail)
router.post('/reset-password', userController.resetPassword)
router.get('/premium/:uid', userController.changeRole)
router.post(
    '/:uid/documents',
    passportCall('jwt'),
    authorization(['user', 'premium']),
    uploader.fields([
        { name: 'profiles', maxCount: 1 },
        { name: 'products', maxCount: 1 },
        { name: 'documents', maxCount: 3 },
    ]),
    userController.addDocuments
);

export default router