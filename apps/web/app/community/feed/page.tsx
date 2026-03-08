import FeedClient from "../../../components/FeedClient";
import { serverApiFetch } from "../../../lib/server-api";

export default async function CommunityFeedPage() {
    let initialData = {
        trendingTags: ["react", "nodejs", "webdev"],
        posts: [],
        leaderboard: [],
        events: [],
    };

    try {
        // Fetch real posts from our new endpoint
        const posts = await serverApiFetch("/posts");
        initialData.posts = posts || [];
    } catch (error) {
        console.error("Failed to fetch community feed:", error);
    }

    return <FeedClient initialData={initialData} />;
}
