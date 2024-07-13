import jwt from "jsonwebtoken";
import envs from "../config/envConfig.js";

export const generateToken = (user) => {
    const { _id, email, role } = user;
    const token = jwt.sign({ _id, email, role }, envs.JWT_SECRET, { expiresIn: '1m' });
    return token
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, envs.JWT_SECRET)
    } catch (error) {
        return null
    }
}
