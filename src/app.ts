import { Application } from "./deps.ts";
import router from "./routes/apiRoutes.ts";
import { load } from "./deps.ts";

// Load environment variables
const conf = await load({
    envPath: "./.env",
    defaultsPath : "./.env.defaults",
    examplePath: null,
    export: true,
    allowEmptyValues: true,
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

// Get the port from the environment variable, fallback to 5462 if not set
const port = Number(Deno.env.get("PORT") || 5462);

app.listen({ port });
console.log(`Server running on http://localhost:${port}`);

export { app };
