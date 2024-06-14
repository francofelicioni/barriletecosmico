import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";
import { isValidPassword } from "../utils/passwordHash.js";
import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register'), register)
router.post('/login', passport.authenticate('login'), login)
router.get('/logout', logout)

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
async function logout(req, res) {
    try {
        req.session.destroy();
        return res.status(200).json({ status: 'success', message: 'User logged out' });
    } catch (error) {
        return res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
    }
}

export default router