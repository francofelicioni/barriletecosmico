import passport from "passport";
import local from "passport-local";
import { hashPassword, isValidPassword } from "../utils/passwordHash.js";
import userDao from "../dao/mongoDao/user.dao.js";


const LocalStrategy = local.Strategy;

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

}

export default initializePassport;