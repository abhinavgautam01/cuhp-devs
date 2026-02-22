import { Router } from "express";
import { runCode } from "../controller/runCode.controller";

const router: Router = Router();

router.post("/", runCode);

export default router;