import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const dbName = "e-commerce";
const dbPassword = process.env.DB_PASSWORD
const urlDb = `mongodb+srv://franfelicioni:${dbPassword}@bc-ecommerce.zt5qt94.mongodb.net/${dbName}`

export const connectMongoDB = async () => {
    try {
        mongoose.connect(urlDb);
        console.log('Mongo DB connected')
    } catch (error) {
        console.log(error)
    }
}