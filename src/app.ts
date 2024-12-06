import { Application, oakCors } from "./deps.ts";
import router from "./routes/apiRoutes.ts";
import { config } from "./config.ts";

const app = new Application();

app.use(oakCors({ origin: "*" }));

app.use(router.routes());
app.use(router.allowedMethods());

// Get the port from the environment variable, fallback to 5462 if not set
const port = Number(Deno.env.get("PORT") || 5462);

app.listen({ port });
console.log(`Server running on http://localhost:${port}`);

export { app };
