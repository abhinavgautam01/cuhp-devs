import { Router } from "express";
import { createPost, getFeed, likePost, toggleBookmark } from "../controller/post.controller";
import { protect } from "../middleware/auth.middleware";

const router: Router = Router();

router.post("/", protect, createPost);
router.get("/", protect, getFeed);
router.post("/:id/like", protect, likePost);
router.post("/:id/bookmark", protect, toggleBookmark);

export default router;
