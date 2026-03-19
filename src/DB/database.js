import mongoose from "mongoose";

export async function ConnectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Mongo Error:", error.message);
        // ❗ DO NOT EXIT
    }
}
