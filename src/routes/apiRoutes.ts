import { Router } from "../deps.ts";
import { exampleHandler } from "../controllers/exampleController.ts";
import { handleStartConversation } from "../controllers/conversationController.ts";
import { handleStartInterview, handleRespondToInterview, handleAnalyseInterview} from "../controllers/conversationController.ts";

const router: Router = new Router();
router.get("/example", exampleHandler);
router.post("/conversation/start", handleStartConversation);
router.post("/interview/start", handleStartInterview);
router.post("/interview/respond", handleRespondToInterview);
router.post("/interview/analyse", handleAnalyseInterview);

export default router;
