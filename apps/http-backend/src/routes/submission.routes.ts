import { Router } from "express";
import { createSubmission, getSubmissionById, getUserSubmissionsForProblem } from "../controller/submission.controller";

const router: Router = Router();

router.post("/", createSubmission);
router.get("/problem/:slug", getUserSubmissionsForProblem);
router.get("/:id", getSubmissionById);

export default router;