import passport from "passport";
import local from "passport-local";
import { hashPassword } from "../utils/passwordHash.js";
import userDao from "../dao/mongoDao/user.dao.js";


const LocalStrategy = local.Strategy; 

const initializePassport = () => {
    // passport.use('login', new LocalStrategy({usernameField: 'email', passwordField: 'password'}, async (email, password, done) => {
    //     const user = await userModel.findOne({email: email});
    //     if (!user) {    
    //         return done(null, false, {message: 'User not found'});
    //     }   
    //     if (!isValidPassword(user, password)) {
    //         return done(null, false, {message: 'Invalid password'});
    //     }
    //     return done(null, user);    
    // }));
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await userDao.getUserById(id);
        done(null, user);
    });

    passport.use('register', new LocalStrategy({passReqToCallback: true, usernameField: "email" },
         async (req, userName, password, done) => {
            try {
                const { first_name, last_name, email, age } = req.body;

                const user = await userDao.getUserByEmail(userName);
                if (user) {
                    return done(null, false, {message: 'User already exists'});
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
                console.log(error)
                res.status(500).json({status: "Error", message: "Internal Server Error"})
            }
        }
    ));

}

export default initializePassport;