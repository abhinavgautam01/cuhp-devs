import { Router } from "express";
import { logout, me, signin, signup } from "../controller/auth.controller";

const router: Router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/me", me);

export default router;