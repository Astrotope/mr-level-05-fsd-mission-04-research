import { Context } from "../deps.ts";
import { startConversation } from "../services/conversationService.ts";
import { startInterview, processResponse, analyzeInterview } from "../services/interviewService.ts"; 

export const handleStartConversation = async (ctx: Context) => {
    const { prompt } = await ctx.request.body({ type: "json" }).value;
    const response = await startConversation(prompt);
    ctx.response.body = response;
};

export const handleStartInterview = async (ctx: Context) => {
    try {
        const { jobTitle } = await ctx.request.body({ type: "json" }).value;
        
        if (!jobTitle) {
            ctx.response.status = 400;
            ctx.response.body = { error: "Job title is required" };
            return;
        }

        const response = await startInterview({ jobTitle });
        ctx.response.body = response;
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = { error: error.message };
    }
};

export const handleRespondToInterview = async (ctx: Context) => {
    try {
        const { jobTitle, response, history } = await ctx.request.body({ type: "json" }).value;
        
        if (!jobTitle || !response || !history) {
            ctx.response.status = 400;
            ctx.response.body = { error: "Job title, response, and history are required" };
            return;
        }

        const ai_response = await processResponse({ jobTitle, response, history });
        ctx.response.body = ai_response;
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = { error: error.message };
    }
};  

export const handleAnalyseInterview = async (ctx: Context) => {
    try {
        const { jobTitle, history } = await ctx.request.body({ type: "json" }).value;
        
        if (!jobTitle || !history) {
            ctx.response.status = 400;
            ctx.response.body = { error: "Job title and history are required" };
            return;
        }

        const response = await analyzeInterview({ jobTitle, history });
        ctx.response.body = response;
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = { error: error.message };
    }
};
