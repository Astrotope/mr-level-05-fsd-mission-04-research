import { Application } from "./deps.ts";
import router from "./routes/apiRoutes.ts";

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on http://localhost:5468");
await app.listen({ port: 5468 });
