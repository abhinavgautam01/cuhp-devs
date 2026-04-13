import FeedClient from "../../../components/FeedClient";

export default async function CommunityFeedPage() {
    const initialData = {
        trendingTags: ["react", "nodejs", "webdev"],
        posts: [],
        leaderboard: [],
        events: [],
    };

    return <FeedClient initialData={initialData} />;
}
