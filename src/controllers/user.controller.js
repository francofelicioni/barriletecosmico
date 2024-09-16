import customErrors from "../errors/customErrors.js";
import userServices from "../services/user.services.js";

const sendResetEmail = async (req, res, next) => {

    try {
        const { email } = req.body;

        res.cookie('resetPassword', email, { httpOnly: true, maxAge: 1000000 })

        const response = await userServices.sendEmailResetPassword(email)

        return res.status(200).json({ status: "ok", response })

    } catch (error) {
        error.path = "[POST] /api/user/email/reset-password"
        next(error)
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const emailCookie = req.cookies.resetPassword;
        if(!emailCookie) throw customErrors.badRequestError("Email link expired");
        
        await userServices.resetPassword(email, password);

        res.status(200).json({ status: "ok", message: "Password updated" });
    } catch (error) {
        error.path = "[POST] /api/user/reset-password";
        next(error);
    }
};

const changeRole = async (req, res, next) => {
    try {
        const { uid } = req.params;

        const response = await userServices.changeRole(uid);

        if (!response) throw customErrors.notFound(`User with id ${uid} not found`);
        
        res.status(200).json({ status: "ok", message: "Role updated" });
    } catch (error) {
        error.path = "[GET] /api/user/premium/:uid";
        next(error);
    }
};

const addDocuments = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const files = req.files;

        const response = await userServices.addDocuments(uid, files);
        res.status(200).json({ status: "ok", payload: response });
    } catch (error) {
        error.path = "[POST] /api/user/:uid/documents";
        next(error);
    }
}


export default {
    sendResetEmail,
    resetPassword,
    changeRole,
    addDocuments
}