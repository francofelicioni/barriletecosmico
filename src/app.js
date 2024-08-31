import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import envConfig from './config/envConfig.js';
import { connectMongoDB } from './config/mongoDB.config.js';
import initializePassport from './config/passport.config.js';
import router from './routes/index.js';
import { errorHandler } from './errors/errorHandler.js';
import { logger } from './utils/logger.js';
import swaggerUiExpress from 'swagger-ui-express';
import { specs } from './controllers/swagger.config.js';

const port = envConfig.PORT;
const ready = console.log(`Server ready on port ${port}`);
const dbPassword = envConfig.DB_PASSWORD
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
    secret: envConfig.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 15 * 60 * 1000 },
  }),
  cookieParser( envConfig.SESSION_SECRET ),
  passport.initialize(),
  passport.session()
);

initializePassport();

app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use('/api', router);

app.use(errorHandler);

app.listen(port, ()=> {
    ready,
    logger.info(`Server ready on port ${port}`)
})