import { Router } from "../deps.ts";
import { exampleHandler } from "../controllers/exampleController.ts";

const router = new Router();
router.get("/example", exampleHandler);

export default router;
