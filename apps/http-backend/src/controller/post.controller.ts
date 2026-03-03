import { Response } from "express";
import { Post } from "@repo/db/models/post.model.js";
import { PostType, User } from "@repo/db";
import { AuthRequest } from "../middleware/auth.middleware";

export const createPost = async (req: AuthRequest, res: Response) => {
    try {
        const { content, type, code } = req.body;
        const authorId = req.user?.id;

        if (!authorId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!content) {
            return res.status(400).json({ message: "Post must have content" });
        }

        const post = await Post.create({
            author: authorId,
            content: content || "",
            type: type || PostType.SNIPPET,
            code: code || ""
        });

        const populatedPost = await Post.findById(post._id).populate("author", "fullName email studentId");

        return res.status(201).json({
            message: "Post created successfully",
            post: populatedPost
        });

    } catch (error) {
        console.error("Create post error:", error);
        return res.status(500).json({ message: error instanceof Error ? error.message : "Internal server error" });
    }
};

export const getFeed = async (req: AuthRequest, res: Response) => {
    try {
        const posts = await Post.find()
            .populate("author", "fullName email studentId")
            .sort({ createdAt: -1 })
            .limit(50);

        return res.status(200).json(posts);
    } catch (error) {
        console.error("Get feed error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const likePost = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const likeIndex = post.likes.indexOf(userId);
        if (likeIndex > -1) {
            post.likes.splice(likeIndex, 1);
        } else {
            post.likes.push(userId);
        }

        await post.save();
        return res.status(200).json({
            message: likeIndex > -1 ? "Post unliked" : "Post liked",
            likesCount: post.likes.length,
            isLiked: likeIndex === -1
        });
    } catch (error) {
        console.error("Like post error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const toggleBookmark = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const bookmarkIndex = (user as any).savedPosts.indexOf(id);
        if (bookmarkIndex > -1) {
            (user as any).savedPosts.splice(bookmarkIndex, 1);
        } else {
            (user as any).savedPosts.push(id);
        }

        await user.save();
        return res.status(200).json({
            message: bookmarkIndex > -1 ? "Removed from bookmarks" : "Post bookmarked",
            isBookmarked: bookmarkIndex === -1
        });
    } catch (error) {
        console.error("Toggle bookmark error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
