import { load, GoogleGenerativeAI, GenerateContentResult, GenerativeModel } from "../deps.ts";

// Load environment variables
const conf = await load({
    envPath: "./.env",
    defaultsPath : "./.env.defaults",
    examplePath: null,
    export: true,
    allowEmptyValues: true,
  });

const apiKey = Deno.env.get("API_KEY");
if (!apiKey) {
    throw new Error("API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface ConversationState {
    text: string;
    // Add other state properties as needed
}

let conversationState: ConversationState | null = null;

export const startConversation = async (prompt: string): Promise<string> => {
    try {
        const result: GenerateContentResult = await model.generateContent(prompt);
        const response = result.response.text();
        conversationState = { text: response };
        return response;
    } catch (error) {
        console.error('Error generating content:', error);
        throw new Error('Failed to generate conversation response');
    }
};

export const getConversationHistory = (): ConversationState | null => {
    return conversationState;
};