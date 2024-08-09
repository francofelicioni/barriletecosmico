import mongoose from "mongoose";
import { logger } from "../utils/logger.js";
import envs from "./envConfig.js";

const dbPassword = envs.DB_PASSWORD
const urlDb = `mongodb+srv://franfelicioni:${dbPassword}@bc-ecommerce.zt5qt94.mongodb.net/e-commerce`

export const connectMongoDB = async () => {
    try {
        mongoose.connect(urlDb);
        logger.info('Mongo DB connected')
    } catch (error) {
        logger.error(error);
    }
}