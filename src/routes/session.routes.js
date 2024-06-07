import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";

const router = Router();

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)

async function register(req, res) {
    try {
        const userData = req.body
        
        const userExists = await userDao.getUserByEmail(userData.email)
        if (userExists) return res.status(400).json({ status: 'Error', message: 'User already exists' })

        const newUser = await userDao.createUser(userData)
        if (!newUser) return res.status(400).json({ status: 'Error', message: 'User cannot be created' })

        return res.status(201).json({ status: 'success', payload: newUser })
    } catch (error) {
        return res.status(500).json({ status:'Error', message: 'Internal Server Error' })
    }
}
async function login(req, res) {
    try {
        const {email, password} = req.body
        
        if (email === 'admiCoder@coder.com' && password === 'adminCod3r123') {
            req.session.user = {
                email,
                role: 'admin',
            }

            return res.status(200).json({ status: 'success', message: 'Admin logged in', payload: req.session.user })
        }

        const user = await userDao.getUserByEmail(email)

        if (!user || user.password !== password) return res.status(400).json({ status: 'Error', message: 'Email or password not valid' })

        req.session.user = {
            email,
            role: 'user',
        }

        return res.status(200).json({ status: 'success', message: 'User logged in', payload: req.session.user })

    } catch (error) {
        return res.status(500).json({ status:'Error', message: 'Internal Server Error' })
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