import { ThumbsUp, MessageSquare, Bug, MoreHorizontal, Bookmark } from "../icons";

interface PostCardProps {
    post: {
        id?: string;
        _id?: string;
        author: {
            fullName: string;
            avatar?: string;
        };
        createdAt: string;
        type: string;
        content: string;
        code?: string;
        likes: string[];
        comments: any[];
    };
    onLike?: (postId: string) => Promise<void>;
    onBookmark?: (postId: string) => Promise<void>;
    currentUserId?: string;
    userAvatar?: string;
    isSaved?: boolean;
}

function formatPostDate(createdAt: string): string {
    const date = new Date(createdAt);
    if (Number.isNaN(date.getTime())) return "";

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
    }).format(date);
}

export function PostCard({ post, onLike, onBookmark, currentUserId, userAvatar, isSaved }: PostCardProps) {
    const postId = post.id || post._id || "";
    const likes = Array.isArray(post.likes) ? post.likes : [];
    const isLiked = currentUserId ? likes.some(id => String(id) === String(currentUserId)) : false;
    const author = post.author || { fullName: "Anonymous", avatar: "", _id: "" };
    const createdAtLabel = formatPostDate(post.createdAt);

    return (
        <article className="bg-card-custom backdrop-blur-md rounded-xl overflow-hidden border border-card-border shadow-lg shadow-black/10 transition-all group/card">
            <div className="p-4 flex gap-4">
                <img
                    alt={author.fullName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-custom/5"
                    src={((currentUserId && (author as any)._id === currentUserId) ? userAvatar : author.avatar) || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(author.fullName || 'user')}`}
                />
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm text-foreground">{author.fullName}</h4>
                        {createdAtLabel ? <span className="text-xs text-muted-custom">&bull; {createdAtLabel}</span> : null}
                        <span className={`ml-auto flex items-center gap-1 px-2 py-0.5 ${post.type === "Snippet" ? "bg-blue-500/10 text-blue-400" :
                            post.type === "Win" ? "bg-yellow-500/10 text-yellow-500" :
                                "bg-purple-500/10 text-purple-400"
                            } text-[10px] font-bold uppercase tracking-wider rounded`}>
                            {post.type}
                        </span>
                    </div>
                    <p className="text-sm mb-4 text-foreground/80 leading-relaxed whitespace-pre-wrap">{post.content}</p>

                    {post.code && (
                        <div className="bg-background/40 rounded-lg p-4 mb-4 relative group">
                            <pre className="font-mono text-xs leading-relaxed overflow-x-auto text-muted-custom">
                                {post.code}
                            </pre>
                        </div>
                    )}


                    <div className="flex items-center gap-6 pt-4">
                        <button
                            onClick={() => onLike?.(postId)}
                            className={`flex items-center gap-2 transition-all duration-300 group/btn relative ${isLiked ? "text-primary-custom drop-shadow-[0_0_10px_rgba(var(--primary),0.5)] scale-110" : "text-muted-custom hover:text-primary-custom"}`}
                        >
                            <ThumbsUp className={`${isLiked ? "fill-primary-custom" : ""} group-active/btn:scale-125 transition-all duration-300`} size={18} />
                            <span className="text-xs font-bold">{post.likes.length}</span>
                        </button>
                        <button
                            onClick={() => onBookmark?.(postId)}
                            className={`flex items-center gap-2 transition-all duration-300 group/btn relative ${isSaved ? "text-yellow-500 scale-110" : "text-muted-custom hover:text-yellow-500"}`}
                        >
                            <Bookmark className={`${isSaved ? "fill-yellow-500" : ""} group-active/btn:scale-125 transition-all duration-300`} size={18} />
                            <span className="text-xs font-bold">{isSaved ? "Saved" : "Save"}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-custom hover:text-emerald-500 transition-colors group/btn">
                            <Bug className="group-hover/btn:rotate-12 transition-transform" size={18} />
                            <span className="text-xs font-bold">Debug</span>
                        </button>
                        <div className="ml-auto">
                            <MoreHorizontal className="text-muted-custom cursor-pointer hover:text-foreground transition-colors" size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
