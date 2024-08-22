import customErrors from "../errors/customErrors.js"
import userRepository from "../persistence/mongo/repositories/user.repository.js"
import { hashPassword, isValidPassword } from "../utils/passwordHash.js"
import { sendMail } from "../utils/sendEmail.js"

const sendEmailResetPassword = async (email) => {

    const message = "You must reset your password in the following link https://wwww.google.com"
    await sendMail(email, "Reset password", message)

    return "Email successfully sent"
}

const resetPassword = async (email, password) => {
    const user = await userRepository.getByEmail(email);
    if (!user) throw customErrors.notFound("User not found");

    const passwordIsEqual = isValidPassword(user, password);
    if (passwordIsEqual) throw customErrors.badRequest("Password can't be equal to old password");

    return await userRepository.update(user._id, { password: hashPassword(password) });
};

const changeRole = async (uid) => {
    const user = await userRepository.getById(uid);
    if (!user) throw customErrors.notFound("User not found");

    const userRole = user.role === "admin" ? "user" : "admin";

    return await userRepository.update(uid, { role: userRole });
};


export default {
    sendEmailResetPassword,
    resetPassword,
    changeRole
}