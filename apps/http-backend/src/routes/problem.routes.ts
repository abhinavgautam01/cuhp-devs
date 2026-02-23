import { Router } from "express";
import {
  getProblems,
  getProblemBySlug,
} from "../controller/problem.controller";

const router: Router = Router();

router.get("/", getProblems);
router.get("/:slug", getProblemBySlug);

export default router;