import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { config } from "../config.ts";

// Types
interface Message {
    role: "user" | "model";
    parts: Array<{ text: string }>;
}

interface InterviewState {
    jobTitle: string;
    question: string;
    history: Message[];
}

interface InterviewInput {
    jobTitle: string;
}

interface ResponseInput {
    jobTitle: string;
    response: string;
    history: Message[];
}

interface AnalysisInput {
    jobTitle: string;
    history: Message[];
}

interface AnalysisOutput {
    analysis: string;
}

// Initialize AI
const apiKey = Deno.env.get("API_KEY");
if (!apiKey) {
    throw new Error("API_KEY is not set in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const modelName = Deno.env.get("MODEL_NAME") || "gemini-1.5-pro";

export function startInterview(input: InterviewInput): InterviewState {
    const { jobTitle } = input;

    if (!jobTitle) {
        throw new Error('Job title is required');
    }

    const question = "Tell me about yourself.";

    return {
        jobTitle,
        question,
        history: [
            {
                role: "user",
                parts: [{ text: `I am applying for the ${jobTitle} position. Please start the interview with your first question.` }]
            },
            {
                role: "model",
                parts: [{ text: question }]
            }
        ]
    };
}

export async function processResponse(input: ResponseInput): Promise<InterviewState> {
    const { jobTitle, response, history } = input;

    if (!jobTitle || !response || !history) {
        throw new Error('Job title, response, and history are required');
    }

    const systemInstruction = `You are an interviewer for a ${jobTitle} position. 
    Your role is to:
    1. Ask relevant follow-up questions based on the candidate's responses
    2. Focus on technical skills, problem-solving abilities, and experience
    3. Maintain a professional interviewer tone
    4. Always respond with a single, clear question
    5. Do not provide feedback or advice
    
    Important: Your response should ONLY be a follow-up question. Do not include any commentary, feedback, or suggestions.`;

    const model: GenerativeModel = genAI.getGenerativeModel({ 
        model: modelName,
    });
    
    let formattedHistory = history.length === 0 ? [{
        role: "user" as const,
        parts: [{ text: `I am applying for the ${jobTitle} position. Please start the interview with your first question.` }]
    }] : [...history];
    
    formattedHistory = [...formattedHistory, {
        role: "user",
        parts: [{ text: response }]
    }];

    const chat = model.startChat({
        history: formattedHistory,
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
        }
    });

    const result = await chat.sendMessage(response);
    const aiResponse = result.response.text();

    return {
        jobTitle,
        question: aiResponse,
        history: [...history, 
            { role: "user", parts: [{ text: response }] },
            { role: "model", parts: [{ text: aiResponse }] }
        ]
    };
}

export async function analyzeInterview(input: AnalysisInput): Promise<InterviewState> {
    const { jobTitle, history } = input;

    if (!jobTitle || !history) {
        throw new Error('Job title and history are required');
    }

    const systemInstruction = `You are an expert interview coach analyzing an interview for a ${jobTitle} position. 
    Review the conversation and provide constructive feedback on:
    1. Technical Skills: Evaluate depth of knowledge and experience
    2. Problem-Solving: Assess approach to challenges and technical problems
    3. Communication: Analyze clarity, structure, and professionalism
    4. Experience & Examples: Evaluate the relevance and impact of shared experiences
    5. Overall Assessment: Provide a clear recommendation
    
    Be specific, reference actual responses, and provide actionable feedback.`;

    const model = genAI.getGenerativeModel({ 
        model: modelName,
    });

    // const formattedHistory = history.map(msg => ({
    //     role: msg.role === "assistant" ? "model" : msg.role,
    //     parts: Array.isArray(msg.parts) ? msg.parts : [{ text: msg.parts }]
    // }));

    const chat = model.startChat({
        history: history, //formattedHistory,
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000,
        }
    });

    const result = await chat.sendMessage(
        "Please provide your analysis of this interview conversation."
    );

    const aiResponse = result.response.text();
    
    return {
        jobTitle,
        question: "",
        history: [...history, 
            { role: "user", parts: [{ text: "Please provide your analysis of this interview conversation." }] },
            { role: "model", parts: [{ text: aiResponse }] }
        ]
    };
}