import { GoogleGenerativeAI } from "@google/generative-ai";

async function testModels() {
    const key = "AIzaSyCM0hpWVeDwchvaE8Fy4o30AaBBGICLgVg"; // The user's key
    const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-pro"];
    
    for (const m of models) {
        try {
            console.log(`Testing model: ${m}...`);
            const genAI = new GoogleGenerativeAI(key);
            const model = genAI.getGenerativeModel({ model: m });
            const result = await model.generateContent("Respond with simply the word 'Working'.");
            console.log(`[SUCCESS] ${m}: ${result.response.text().trim()}`);
            return; // Stop if we find a working one
        } catch (e) {
            console.error(`[FAILED] ${m}: ${e.message}`);
        }
    }
}
testModels();
