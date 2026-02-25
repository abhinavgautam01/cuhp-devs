import { Router } from "express";
import { updateProfile, getProfile, getDashboardData } from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router: Router = Router();

router.put("/profile", protect, updateProfile);
router.get("/profile", protect, getProfile);
router.get("/dashboard", protect, getDashboardData);

export default router;
