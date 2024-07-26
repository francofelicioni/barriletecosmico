import jwt from "jsonwebtoken";
import envs from "../config/envConfig.js";

export const generateToken = (user) => {
    const { _id, email, role, cart } = user;
    const token = jwt.sign({ _id, email, role, cart }, envs.JWT_SECRET, { expiresIn: '5m' });
    return token
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, envs.JWT_SECRET)
    } catch (error) {
        return null
    }
}
