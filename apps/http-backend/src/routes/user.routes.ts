import { Router } from "express";
import { updateProfile, getProfile, getDashboardData, getCommunityFeed, getCommunityRooms, getCommunitySnippets, getChatMessages, getChatRoomMembers } from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router: Router = Router();

router.put("/profile", protect, updateProfile);
router.get("/profile", protect, getProfile);
router.get("/dashboard", protect, getDashboardData);
router.get("/community/feed", protect, getCommunityFeed);
router.get("/community/rooms", protect, getCommunityRooms);
router.get("/community/snippets", protect, getCommunitySnippets);
router.get("/community/rooms/:roomName/messages", protect, getChatMessages);
router.get("/community/rooms/:roomName/members", protect, getChatRoomMembers);

export default router;
