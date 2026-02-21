import { Router } from "express";
import { createSubmission, getUserSubmissionsForProblem } from "../controller/submission.controller";

const router: Router = Router();

router.post("/", createSubmission);
router.get("/problem/:slug", getUserSubmissionsForProblem);

export default router;