import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = Deno.env.get("API_KEY");
if (!apiKey) {
    throw new Error("API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateContent = async (prompt: string) => {
    return await model.generateContent([prompt]);
};
