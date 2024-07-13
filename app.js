import express from 'express';
import router from './src/routes/index.js';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import { connectMongoDB } from './src/config/mongoDB.config.js';
import initializePassport from './src/config/passport.config.js';
import envs from './src/config/envConfig.js';

const ready = console.log(`Server ready on port ${envs.PORT}`);
const URI = `mongodb+srv://franfelicioni:${envs.DB_PASSWORD}@bc-ecommerce.zt5qt94.mongodb.net/e-commerce`

connectMongoDB();

const app = express();
const sessionStore = MongoStore.create({
    mongoUrl: URI,
    ttl: 15 * 60, // 15 minutes
});

app.use(
  express.json(),
  express.urlencoded({ extended: false }),
  session({
    store: sessionStore,
    secret: envs.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 15 * 60 * 1000 },
  }),
  cookieParser( envs.SESSION_SECRET ),
  passport.initialize(),
  passport.session()
);

initializePassport();

app.use('/api', router);
app.listen(ready);