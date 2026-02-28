import { ThumbsUp, MessageSquare, Bug, MoreHorizontal, Bookmark } from "lucide-react";

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
    isSaved?: boolean;
}

function formatPostDate(createdAt: string): string {
    const date = new Date(createdAt);
    if (Number.isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        timeZone: "UTC",
    }).format(date);
}

export function PostCard({ post, onLike, onBookmark, currentUserId, isSaved }: PostCardProps) {
    const postId = post.id || post._id || "";
    const isLiked = currentUserId ? post.likes.includes(currentUserId) : false;
    const createdAtLabel = formatPostDate(post.createdAt);

    return (
        <article className="bg-[#1a1c2a] rounded-xl border border-[#1337ec]/10 overflow-hidden shadow-lg shadow-black/10 hover:border-[#1337ec]/30 transition-all group/card">
            <div className="p-4 flex gap-4">
                <img
                    alt={post.author.fullName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white/5"
                    src={post.author.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.fullName}`}
                />
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm text-white">{post.author.fullName}</h4>
                        {createdAtLabel ? <span className="text-xs text-white/40">&bull; {createdAtLabel}</span> : null}
                        <span className={`ml-auto flex items-center gap-1 px-2 py-0.5 ${post.type === "Snippet" ? "bg-blue-500/10 text-blue-400" :
                            post.type === "Win" ? "bg-yellow-500/10 text-yellow-500" :
                                "bg-purple-500/10 text-purple-400"
                            } text-[10px] font-bold uppercase tracking-wider rounded`}>
                            {post.type}
                        </span>
                    </div>
                    <p className="text-sm mb-4 text-slate-300 leading-relaxed whitespace-pre-wrap">{post.content}</p>

                    {post.code && (
                        <div className="bg-black/40 rounded-lg p-4 mb-4 border border-white/5 relative group">
                            <pre className="font-mono text-xs leading-relaxed overflow-x-auto text-slate-300">
                                {post.code}
                            </pre>
                        </div>
                    )}


                    <div className="flex items-center gap-6 border-t border-white/5 pt-4">
                        <button
                            onClick={() => onLike?.(postId)}
                            className={`flex items-center gap-2 transition-colors group/btn ${isLiked ? "text-[#1337ec]" : "text-white/60 hover:text-[#1337ec]"}`}
                        >
                            <ThumbsUp className={`${isLiked ? "fill-[#1337ec]" : ""} group-active/btn:scale-125 transition-transform`} size={18} />
                            <span className="text-xs font-bold">{post.likes.length}</span>
                        </button>
                        <button className="flex items-center gap-2 text-white/60 hover:text-[#8b5cf6] transition-colors">
                            <MessageSquare size={18} />
                            <span className="text-xs font-bold">{post.comments.length}</span>
                        </button>
                        <button
                            onClick={() => onBookmark?.(postId)}
                            className={`flex items-center gap-2 transition-colors ${isSaved ? "text-yellow-500" : "text-white/60 hover:text-yellow-500"}`}
                        >
                            <Bookmark className={`${isSaved ? "fill-yellow-500" : ""}`} size={18} />
                            <span className="text-xs font-bold">{isSaved ? "Saved" : "Save"}</span>
                        </button>
                        <button className="flex items-center gap-2 text-white/60 hover:text-[#10b981] transition-colors group/btn">
                            <Bug className="group-hover/btn:rotate-12 transition-transform" size={18} />
                            <span className="text-xs font-bold">Debug</span>
                        </button>
                        <div className="ml-auto">
                            <MoreHorizontal className="text-white/30 cursor-pointer hover:text-white transition-colors" size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
