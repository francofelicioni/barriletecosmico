import passport from "passport";
import local from "passport-local";
import google from 'passport-google-oauth2';
import jwt from "passport-jwt";
import userDao from "../dao/mongoDao/user.dao.js";
import { hashPassword, isValidPassword } from "../utils/passwordHash.js";

const LocalStrategy = local.Strategy;
const GoogleStrategy = google.Strategy;
const JTWStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) token = req.cookies.token;
    return token
}

const initializePassport = () => {

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await userDao.getUserById(id);
        done(null, user);
    });

    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: "email" },
        async (req, userName, password, done) => {
            try {
                const { first_name, last_name, email, age } = req.body;

                const user = await userDao.getUserByEmail(userName);
                if (user) {
                    return done(null, false, { message: 'User already exists' });
                }

                const newUser = {
                    first_name,
                    last_name,
                    age,
                    email,
                    password: await hashPassword(password)
                };

                const createdUser = await userDao.createUser(newUser);
                return done(null, createdUser);

            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('login', new LocalStrategy({ usernameField: "email" }, async (userName, password, done) => {
            try {
                const user = await userDao.getUserByEmail(userName);

                if (!user || !isValidPassword(user, password)) return done(null, false, { message: "Wrong email or password" });

                return done(null, user);

            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('google', new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                const { name, emails } = profile;
                console.log(profile);
                const user = {
                    first_name: name.givenName,
                    last_name: name.familyName,
                    email: emails[0].value,
                };

                const existUser = await userDao.getUserByEmail( emails[0].value);
                if (existUser) {
                    return cb(null, existUser);
                }

                const createdUser = await userDao.createUser(user);
                return cb(null, createdUser);
            } catch (error) {
                return done(error);
            }
        }
        
    ));

    passport.use('jwt', new JTWStrategy (
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: process.env.JWT_SECRET
        },
        async (jwtPayload, done) => {
            try {
                // const user = await userDao.getUserById(jwtPayload._id);
                // return done(null, user);
                return done(null,jwtPayload);
            } catch (error) {
                return done(error);
            }
        }
    ))
}

export default initializePassport;