import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function ConnectDB() {
    try {
        const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/cw";
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Database Connection Error:", error);
    }
}