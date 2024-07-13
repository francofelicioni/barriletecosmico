import { Router } from "express";
import passport from 'passport';
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import sessionController from "../controllers/session.controller.js";

const router = Router();

router.post('/register', passport.authenticate('register', { session: false }), sessionController.register);
router.post('/login', passport.authenticate('login'), sessionController.login);
router.get('/current', passportCall('jwt'), authorization("user"), sessionController.current);
router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
    session: false,
}), sessionController.googleLogin);
router.get('/logout', sessionController.logout);
router.post('/jwt', sessionController.jwtLogin);



export default router