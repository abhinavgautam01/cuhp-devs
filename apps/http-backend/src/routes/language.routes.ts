import { Router } from "express";
import { getLanguages } from "../controller/language.controller";

const router: Router = Router();

router.get("/", getLanguages);

export default router;