import { Router } from "express";
import {
  getProblems,
  getProblemBySlug,
  getProblemSolution,
} from "../controller/problem.controller";

const router: Router = Router();

router.get("/", getProblems);
router.get("/:slug", getProblemBySlug);
router.get("/:slug/solution", getProblemSolution);

export default router;