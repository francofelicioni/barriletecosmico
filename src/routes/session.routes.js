import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";
import { hashPassword } from "../utils/passwordHash.js";

const router = Router();

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

async function register(req, res) {
    try {
        const { first_name, last_name, age, email, password } = req.body;

        const existingUser = await userDao.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ status: 'Error', message: 'User already exists' });
        }

        if (!email || !password) {
            return res.status(400).json({ status: 'Error', message: 'Email and password are required' });
        }

        const newUser = {
            first_name,
            last_name,
            age,
            email,
            password: await hashPassword(password)
        };

        const createdUser = await userDao.createUser(newUser);

        return res.status(201).json({ status: 'success', payload: createdUser });
    } catch (error) {
        return res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body

        if (email === 'admiCoder@coder.com' && password === 'adminCod3r123') {
            req.session.user = {
                email,
                role: 'admin',
            }

            return res.status(200).json({ status: 'success', message: 'Admin logged in', payload: req.session.user })
        }

        const user = await userDao.getUserByEmail(email)

        if (!user || user.password !== comparePassword(user, password)) return res.status(400).json({ status: 'Error', message: 'Email or password not valid' })

        req.session.user = {
            email,
            role: 'user',
        }

        return res.status(200).json({ status: 'success', message: 'User logged in', payload: req.session.user })

    } catch (error) {
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