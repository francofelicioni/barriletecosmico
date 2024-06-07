import express from 'express';
import router from './src/routes/index.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connectMongoDB } from './src/config/mongoDB.config.js';
const port = 8080;
const ready = console.log(`Server ready on port ${port}`);
const dbPassword = process.env.DB_PASSWORD
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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 15 * 60 * 1000 },
  })
);

app.use('/api', router);
app.listen(port, ready);