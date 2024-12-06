// src/config.ts
import { load } from "./deps.ts";

interface Config {
    API_KEY: string;
    MODEL_NAME: string;
    PORT: number;
    // Add other env variables here
}

async function loadConfig(): Promise<Config> {
    await load({
        envPath: "./.env",
        defaultsPath: "./.env.defaults",
        examplePath: null,
        export: true,
        allowEmptyValues: true,
    });

    const API_KEY = Deno.env.get("API_KEY");
    if (!API_KEY) {
        throw new Error("API_KEY is not set in the environment variables.");
    }

    return {
        API_KEY,
        MODEL_NAME: Deno.env.get("MODEL_NAME") || "gemini-1.5-pro",
        PORT: Number(Deno.env.get("PORT") || 5462),
        // Add other env variables here
    };
}

// Export a singleton instance
export const config = await loadConfig();
