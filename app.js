import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import envs from './src/config/envConfig.js';
import { connectMongoDB } from './src/config/mongoDB.config.js';
import initializePassport from './src/config/passport.config.js';
import { errorHandler } from './src/errors/errorHandler.js';
import router from './src/routes/index.js';
import { logger } from './src/utils/logger.js';

const port = envs.PORT;
const ready = console.log(`Server ready on port ${port}`);
const dbPassword = envs.DB_PASSWORD
const URI = `mongodb+srv://franfelicioni:${dbPassword}@bc-ecommerce.zt5qt94.mongodb.net/e-commerce`

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

app.use(errorHandler);

app.listen(port, ()=> {
    ready,
    logger.info(`Server ready on port ${port}`)
})