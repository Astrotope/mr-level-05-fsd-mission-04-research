// src/config.ts
// src/config.ts
import { load } from "./deps.ts";

// Load environment variables once, paths relative to project root
await load({
    envPath: "./.env",
    defaultsPath: "./.env.defaults",
    examplePath: null,
    export: true,
    allowEmptyValues: true,
});
