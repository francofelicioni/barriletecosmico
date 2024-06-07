import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";
import userDao from "../dao/mongoDao/user.dao.js";

const router = Router();

router.post('/register', register)


async function register(req, res) {
    try {
        const userData = req.body
        const newUser = await userDao.createUser(userData)
        return res.status(201).json({ status: 'success', payload: newUser })
    } catch (error) {
        return res.status(500).json({ status:'Error', message: 'Internal Server Error' })
    }
}

export default router