import Feed from "@repo/ui/community/Feed";
import { serverApiFetch } from "../../../lib/server-api";

export default async function CommunityFeedPage() {
    let feedData = {
        trendingTags: [],
        posts: [],
        leaderboard: [],
        events: [],
    };

    try {
        feedData = await serverApiFetch("/user/community/feed");
    } catch (error) {
        console.error("Failed to fetch community feed:", error);
        // Fallback to empty data or show error - in a real app would use error.tsx
    }

    return <Feed data={feedData} />;
}
