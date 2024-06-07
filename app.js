import express from 'express';
import router from './src/routes/index.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connectMongoDB } from './src/config/mongoDB.config.js';
const dbPassword = process.env.DB_PASSWORD
const port = 8080;
const ready = console.log(`Server ready on port ${port}`);
const URI = `mongodb+srv://franfelicioni:${dbPassword}@bc-ecommerce.zt5qt94.mongodb.net/e-commerce`

connectMongoDB();

const app = express();
const sessionStore = MongoStore.create({
    mongoUrl: URI,
    ttl: 15 * 60, // 15 minutes
});

app.use(
    express.json(),
    express.urlencoded({ extended: true }),
    session({
        store: sessionStore,
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    }),
);

app.listen(port, ready);
app.use('/api', router);
