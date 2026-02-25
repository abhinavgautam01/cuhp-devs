import { PostCard } from "./PostCard";
import { FeedCompose } from "./FeedCompose";
import { FeedTabs } from "./FeedTabs";
import { CommunityRightSidebar } from "./CommunityRightSidebar";

interface FeedProps {
  data: {
    trendingTags: string[];
    posts: any[];
    leaderboard: any[];
    events: any[];
  };
}

export default function Feed({ data }: FeedProps) {
  return (
    <main className="flex-1 flex flex-col md:flex-row gap-8 p-4 md:p-8 overflow-y-auto w-full">
      {/* Feed Area */}
      <section className="flex-1 space-y-6 max-w-3xl">
        <FeedCompose />
        <FeedTabs />

        {/* Posts */}
        <div className="space-y-6">
          {data.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Right Sidebar */}
      <CommunityRightSidebar
        leaderboard={data.leaderboard}
        tags={data.trendingTags}
        events={data.events}
      />
    </main>
  );
}
