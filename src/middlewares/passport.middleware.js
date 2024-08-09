import passport from "passport";
import { request, response } from 'express';
import customErrors from "../errors/customErrors.js";

export const passportCall = (strategy) => {

    return async (req = request, res = response, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
               throw customErrors.unAuthorized(info.message);
            }
            req.user = user;
            return next();
        })(req, res, next);
    }
}


export const authorization = (role) => {
    return async (req = request, res = response, next) => {
        if (!req.user) {
            throw customErrors.unAuthorized('User not logged in!');
        }

        if (req.user.role !== role) {
            throw customErrors.unAuthorized('User not authorized!');
        }
        next();
    }
}