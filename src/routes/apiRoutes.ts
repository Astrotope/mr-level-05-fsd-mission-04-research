import { Router } from "../deps.ts";
import { exampleHandler } from "../controllers/exampleController.ts";
import { handleStartConversation } from "../controllers/conversationController.ts";

const router = new Router();
router.get("/example", exampleHandler);
router.post("/conversation/start", handleStartConversation);

export default router;
