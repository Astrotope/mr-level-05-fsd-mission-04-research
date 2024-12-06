import { Context } from "../deps.ts";
import { startConversation } from "../services/conversationService.ts";

export const handleStartConversation = async (ctx: Context) => {
    const { prompt } = await ctx.request.body({ type: "json" }).value;
    const response = await startConversation(prompt);
    ctx.response.body = response;
};

