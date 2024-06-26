import jwt from "jsonwebtoken";


export const generateToken = (user) => {
    const { _id, email } = user;
    const token = jwt.sign({ _id, email, role }, process.env.JWT_SECRET, { expiresIn: '1m' });
    return token
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return null
    }
}
