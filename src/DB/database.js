import mongoose from "mongoose";

import Department from "../Models/departmentModel.js";

export async function ConnectDB() {
    if (!process.env.MONGO_URI) {
        console.warn("WARNING: MONGO_URI is not defined in environment variables. Database connection will fail.");
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/college");
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Seed default departments if empty
        const count = await Department.countDocuments();
        if (count === 0) {
            console.log("Seeding default departments...");
            const defaults = [
                { name: "Science" },
                { name: "Arts" },
                { name: "Commerce" },
                { name: "Computer Science" },
                { name: "Management" }
            ];
            await Department.insertMany(defaults);
            console.log("Default departments seeded successfully.");
        }
    } catch (error) {
        console.log("Mongo Error:", error.message);
    }
}
