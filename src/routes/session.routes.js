import { Router } from "express";
import passport from 'passport';
import userDao from "../dao/mongoDao/user.dao.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { isValidPassword } from "../utils/passwordHash.js";

const router = Router();

router.post('/register', passport.authenticate('register', { session: false }), register);
router.post('/login', passport.authenticate('login'), login);
router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
    session: false,
}), googleLogin);
router.post('/jwt', jwtLogin);
router.get('/logout', logout);

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    try {
        return res.status(200).json({ status: 'success', message: 'User logged in', payload: req.user })
    } catch (error) {
        console.log(error)
    }
})

async function register(req, res) {
    try {
        return res.status(201).json({ status: 'success', message: 'User created' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
    }
}
async function login(req, res) {
    try {
        return res.status(200).json({ status: 'success', message: 'User logged in', payload: req.user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'Error', message: 'Internal Server Error' })
    }
}
async function jwtLogin(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userDao.getUserByEmail(email);

        if (!user || !isValidPassword(user, password)) return res.status(404).json({ status: 'Error', message: 'Email or password incorrect' });

        const token = generateToken(user);

        res.cookie("token", token, { httpOnly: true });

        return res.status(200).json({ status: 'success', message: 'User logged in', payload: user, token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'Error', message: 'Internal Server Error' })
    }
}
async function googleLogin(req, res) {
    try {
        return res.status(200).json({ status: 'success', message: 'User logged in', payload: req.user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'Error', message: 'Internal Server Error' })
    }
}
async function logout(req, res) {
    try {
        req.session.destroy();
        return res.status(200).json({ status: 'success', message: 'User logged out' });
    } catch (error) {
        return res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
    }
}

export default router