import passport from "passport";
import { request, response } from 'express';
import customErrors from "../errors/customErrors.js";

export const passportCall = (strategy) => {

    return async (req = request, res = response, next) => {
        passport.authenticate(strategy, (error, user, info) => {
            if (error) return next(error);
            if (!user) res.status(401).json({ status: "error", msg: info.message ? info.message : info.toString() });
            
            req.user = user;
            next();
        })(req, res, next);
    }
}

export const authorization = (roles) => {
    return async (req = request, _res = response, next) => {
        try {
            if (!req.user) throw customErrors.unAuthorized('User not logged in!');
            const roleAuthorized = roles.includes(req.user.role);
            if (!roleAuthorized) throw customErrors.unAuthorized('User not authorized!');

            next();
        } catch (error) {
            return next(error);
        }
    }
}