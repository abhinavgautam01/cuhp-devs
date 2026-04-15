import { Router } from "express";
import { getSocketToken, logout, me, signin, signup } from "../controller/auth.controller";

const router: Router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.get("/me", me);
router.get("/socket-token", getSocketToken);

export default router;
