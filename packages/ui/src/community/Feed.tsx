import { PostCard } from "./PostCard";
import { FeedCompose } from "./FeedCompose";
import { FeedTabs, FeedTab } from "./FeedTabs";
import { CommunityRightSidebar } from "./CommunityRightSidebar";

interface FeedProps {
  data: {
    trendingTags: string[];
    posts: any[];
    leaderboard: any[];
    events: any[];
  };
  onPost?: (data: { content: string; type: string }) => Promise<void>;
  onLike?: (postId: string) => Promise<void>;
  onBookmark?: (postId: string) => Promise<void>;
  userAvatar?: string;
  currentUserId?: string;
  savedPosts?: string[];
  activeTab: FeedTab;
  onTabChange: (tab: FeedTab) => void;
}

export default function Feed({
  data,
  onPost,
  onLike,
  onBookmark,
  userAvatar,
  currentUserId,
  savedPosts,
  activeTab,
  onTabChange
}: FeedProps) {
  // Filter posts based on tab
  // Note: "Snippet" tab maps to "Snippet" type, "Questions" tab maps to "Question" type
  const filteredPosts = data.posts.filter(post => {
    if (activeTab === "debugging") return true; // Show all for debugging or handle specifically
    const targetType = activeTab === "Questions" ? "Question" : "Snippet";
    return post.type === targetType;
  });

  return (
    <main className="flex-1 flex flex-col md:flex-row gap-8 p-4 md:p-8 overflow-y-auto w-full">
      {/* Feed Area */}
      <section className="flex-1 space-y-6 max-w-3xl">
        <FeedCompose onPost={onPost} userAvatar={userAvatar} />
        <FeedTabs activeTab={activeTab} onTabChange={onTabChange} />

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id || post._id}
                post={post}
                onLike={onLike}
                onBookmark={onBookmark}
                currentUserId={currentUserId}
                isSaved={savedPosts?.includes(post.id || post._id)}
              />
            ))
          ) : (
            <div className="text-center py-10 text-white/40 bg-white/2 rounded-xl border border-dashed border-white/10">
              No {activeTab.toLowerCase()} found in the community.
            </div>
          )}
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
