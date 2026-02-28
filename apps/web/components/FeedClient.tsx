"use client";

import { useState } from "react";
import Feed from "@repo/ui/community/Feed";
import { FeedTab } from "@repo/ui/community/FeedTabs";
import { apiFetch } from "../lib/api";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "../store/useToastStore";

interface FeedClientProps {
    initialData: {
        trendingTags: string[];
        posts: any[];
        leaderboard: any[];
        events: any[];
    };
}

export default function FeedClient({ initialData }: FeedClientProps) {
    const [posts, setPosts] = useState(initialData.posts);
    const [activeTab, setActiveTab] = useState<FeedTab>("Questions");
    const { user } = useAuthStore();

    const handlePost = async (formData: FormData) => {
        try {
            const response = await apiFetch("/posts", {
                method: "POST",
                body: formData,
                // Do not set Content-Type, let the browser set it for FormData
            });

            if (response.post) {
                setPosts([response.post, ...posts]);
                toast.success("Post shared successfully!");
            }
        } catch (error) {
            console.error("Failed to create post:", error);
            toast.error("Failed to share post.");
            throw error;
        }
    };

    const handleLike = async (postId: string) => {
        try {
            const response = await apiFetch(`/posts/${postId}/like`, {
                method: "POST"
            });

            if (response) {
                setPosts(posts.map(post => {
                    const id = post.id || post._id;
                    if (id === postId) {
                        // Toggle like in local state
                        const userId = user?.id;
                        if (!userId) return post;

                        const newLikes = response.isLiked
                            ? [...post.likes, userId]
                            : post.likes.filter((uid: string) => uid !== userId);

                        return { ...post, likes: newLikes };
                    }
                    return post;
                }));
            }
        } catch (error) {
            console.error("Failed to like post:", error);
        }
    };

    const handleBookmark = async (postId: string) => {
        try {
            const response = await apiFetch(`/posts/${postId}/bookmark`, {
                method: "POST"
            });

            if (response) {
                // Update local user state in store
                const currentSaved = user?.savedPosts || [];
                const newSaved = response.isBookmarked
                    ? [...currentSaved, postId]
                    : currentSaved.filter(id => id !== postId);

                if (user) {
                    useAuthStore.getState().setUser({ ...user, savedPosts: newSaved });
                }

                if (response.isBookmarked) {
                    toast.success("Snippet has been saved!");
                } else {
                    toast.info("Removed from saved snippets");
                }
            }
        } catch (error) {
            console.error("Failed to bookmark post:", error);
            toast.error("Failed to save snippet");
        }
    };

    return (
        <Feed
            data={{ ...initialData, posts }}
            onPost={handlePost}
            onLike={handleLike}
            onBookmark={handleBookmark}
            userAvatar={user?.avatar}
            currentUserId={user?.id}
            savedPosts={user?.savedPosts}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        />
    );
}
