import { generateToken } from "../utils/jwt.js";
import { userResponseDto } from "../dto/user-response.dto.js";

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
        const user = req.user
        const token = generateToken(req.user);

        res.cookie("token", token, { httpOnly: true });
        const userDto = userResponseDto(user);
        return res.status(200).json({ status: 'success', message: 'User logged in', payload: userDto, token })
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

const current = async (req, res) => {
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

export default {
    register,
    login,
    googleLogin,
    current,
    logout
}