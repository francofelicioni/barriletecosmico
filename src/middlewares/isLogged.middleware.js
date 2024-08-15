import { request, response } from "express";
import customErrors from "../errors/customErrors.js";

export const isLogged = async (req = request, _res = response, next) => {
   if (req.session.user) {
      next();
   } else {
      throw customErrors.unAuthorized('User not logged in!');
   }
}