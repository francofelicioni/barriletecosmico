import { generateToken } from "../utils/jwt.js";
import { userResponseDto } from "../dto/user-response.dto.js";
import { logger } from "../utils/logger.js";

const register = async (_req, res, next) => {
    try {
        return res.status(201).json({ status: 'success', message: 'User created' });
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const user = req.user
        const token = generateToken(req.user);

        res.cookie("token", token, { httpOnly: true });
        const userDto = userResponseDto(user);
        return res.status(200).json({ status: 'success', message: 'User logged in', payload: userDto, token })
    } catch (error) {
        logger.error(error)
        next(error);
    }
}
const googleLogin = async (req, res, next) => {
    try {
        return res.status(200).json({ status: 'success', message: 'User logged in', payload: req.user })
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

const current = async (req, res, next) => {
    try {
        const user = userResponseDto(req.user);
        return res.status(200).json({ status: 'success', message: 'User logged in', payload: user })
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

const logout = async (req, res, next) => {
    try {
        req.session.destroy();
        return res.status(200).json({ status: 'success', message: 'User logged out' });
    } catch (error) {
        logger.error(error)
        next(error);
    }
}

export default {
    register,
    login,
    googleLogin,
    current,
    logout
}