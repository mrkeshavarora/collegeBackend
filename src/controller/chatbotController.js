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

        // 2. Direct Backend Lookup check (skip AI if they just want college info)
        const lowerMessage = message.toLowerCase();
        
        let localReply = "";
        if (lowerMessage.includes("course") || lowerMessage.includes("study") || lowerMessage.includes("program")) {
            localReply = "Here is a list of courses we offer:\n" + courses.map(c => `• ${c.name || c.title}`).join("\n");
        } else if (lowerMessage.includes("faculty") || lowerMessage.includes("teacher") || lowerMessage.includes("prof")) {
            localReply = "Our estimated faculty members include:\n" + faculties.map(f => `• ${f.name} (${f.designation || 'Faculty'})`).join("\n");
        } else if (lowerMessage.includes("notice") || lowerMessage.includes("news") || lowerMessage.includes("alert")) {
            if (notices.length === 0) localReply = "There are no new notices at this time.";
            else localReply = "Here are the latest notices:\n" + notices.map(n => `• ${n.title}`).join("\n");
        } else if (lowerMessage.includes("event") || lowerMessage.includes("function") || lowerMessage.includes("activity")) {
            if (events.length === 0) localReply = "We don't have any upcoming events right now.";
            else localReply = "Here are some upcoming events:\n" + events.map(e => `• ${e.title || e.name}`).join("\n");
        } else if (lowerMessage.includes("who made you") || lowerMessage.includes("who created you") || lowerMessage.includes("creator")) {
            localReply = "I was created by Keshav Arora, a final-year BCA student at DAV College, Amritsar.";
        }

        if (localReply) {
            // Return nicely structured human-readable text directly from DB
            return res.status(200).json({ reply: localReply });
        }

        // 3. General query -> proceed to use Gemini API
        const apiKey = (process.env.GEMINI_API_KEY || "").trim();
        if (!apiKey || apiKey === 'YOUR_KEY_HERE') {
            return res.status(200).json({ reply: "Please set your GEMINI_API_KEY to answer outside knowledge questions." });
        }

        const collegeName = colleges.length > 0 ? colleges[0].name : "our college";
        const context = `You are "College Mate", the official assistant for ${collegeName}. 
        Data: Courses:${JSON.stringify(courses)}, Faculty:${JSON.stringify(faculties)}, Colleges:${JSON.stringify(colleges)}, Notices:${JSON.stringify(notices)}, Events:${JSON.stringify(events)}.
        Answer nicely and feel free to mention the college name (${collegeName}) in your response. 
        IMPORTANT: You must ONLY answer questions related to the college, courses, faculty, notices, events, admissions, or student life. If the user asks a question that is entirely unrelated to the college or education, politely refuse to answer and remind them that you are only here to help with college-related queries. Do NOT provide answers to irrelevant or general knowledge questions outside the scope of the college.`;

        const modelsToTry = ["gemini-3-flash-preview", "gemini-3-pro-preview"];
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

        if (lastError && (lastError.toLowerCase().includes("expired") || lastError.toLowerCase().includes("api_key_invalid"))) {
            return res.status(200).json({
                reply: `🔔 Your Gemini API key is missing or expired! Please get a new one from Google AI Studio and update your .env file.`
            });
        }

        // Catch-all for API issues (404s, suspended keys, network errors)
        return res.status(200).json({
            reply: `⚠️ I cannot process general questions right now because the API key is either expired or missing model permissions. Please update your GEMINI_API_KEY in the backend .env file.`
        });

    } catch (error) {
        console.error("Global Error:", error);
        res.status(500).json({ reply: "Error: " + error.message });
    }
};
