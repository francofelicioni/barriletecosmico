import userDao from "../dao/mongoDao/user.dao.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { isValidPassword } from "../utils/passwordHash.js";

const register = async (req, res) => {
    try {
        return res.status(201).json({ status: 'success', message: 'User created' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
    }
}
const login = async (req, res) => {
    try {
        return res.status(200).json({ status: 'success', message: 'User logged in', payload: req.user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'Error', message: 'Internal Server Error' })
    }
}
const jwtLogin = async (req, res) => {
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
const googleLogin = async (req, res) => {
    try {
        return res.status(200).json({ status: 'success', message: 'User logged in', payload: req.user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'Error', message: 'Internal Server Error' })
    }
}
const logout = async (req, res) => {
    try {
        req.session.destroy();
        return res.status(200).json({ status: 'success', message: 'User logged out' });
    } catch (error) {
        return res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
    }
}

const current = async (req, res) => {
    try {
        return res.status(200).json({ status: 'success', message: 'User logged in', payload: req.user })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 'Error', message: 'Internal Server Error' })
    }
}

export default {
    register,
    login,
    jwtLogin,
    googleLogin,
    logout,
    current
}