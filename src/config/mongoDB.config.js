import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const dbPassword = process.env.DB_PASSWORD
const urlDb = `mongodb+srv://franfelicioni:${dbPassword}@bc-ecommerce.zt5qt94.mongodb.net/e-commerce`

export const connectMongoDB = async () => {
    try {
        mongoose.connect(urlDb);
        console.log('Mongo DB connected')
    } catch (error) {
        console.log(error)
    }
}