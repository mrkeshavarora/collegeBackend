import { GoogleGenerativeAI } from "@google/generative-ai";
import Course from "../Models/courseModel.js";
import Faculty from "../Models/facultyModel.js";
import Notice from "../Models/noticeModel.js";
import Event from "../Models/eventModel.js";
import College from "../Models/collegeModel.js";
import dotenv from "dotenv";
dotenv.config();

export const getChatResponse = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ reply: "Please say something!" });

        // 1. Fetch Data
        const [courses, faculties, colleges, notices, events] = await Promise.all([
            Course.find({}).lean(),
            Faculty.find({}).lean(),
            College.find({}).lean(),
            Notice.find({}).sort({ createdAt: -1 }).limit(5).lean(),
            Event.find({}).sort({ date: -1 }).limit(5).lean()
        ]);

        const apiKey = (process.env.GEMINI_API_KEY || "").trim();

        if (!apiKey || apiKey === 'YOUR_KEY_HERE') {
            return res.status(200).json({ reply: "Please set your GEMINI_API_KEY." });
        }

        // 2. Prepare Context
        const context = `You are "College Mate" assistant. 
        Data: Courses:${JSON.stringify(courses)}, Faculty:${JSON.stringify(faculties)}, Colleges:${JSON.stringify(colleges)}, Notices:${JSON.stringify(notices)}, Events:${JSON.stringify(events)}.
        Answer nicely. If not about college, use general knowledge.`;

        // 3. Try AI with fallback models
        // const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
        const modelsToTry = ["gemini-2.5-flash-lite", "gemini-2.0-flash-lite", "gemini-2.0-flash-lite-001"];
        // const modelsToTry = ["gemini-2.0-flash-lite"];
        let lastError = null;

        for (const modelName of modelsToTry) { 
            try {
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent(context + "\n\nUser: " + message);
                const text = result.response.text();
                if (text) return res.status(200).json({ reply: text });
            } catch (e) {
                console.error(`Model ${modelName} failed:`, e.message);
                lastError = e.message;
            }
        }

        // --- FINAL FALLBACK ---
        return res.status(200).json({
            reply: `All AI models failed (Error: ${lastError}). Try asking about 'courses' or check your API key permissions.`
        });

    } catch (error) {
        console.error("Global Error:", error);
        res.status(500).json({ reply: "Error: " + error.message });
    }
};
