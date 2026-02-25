import { Share2, ThumbsUp, MessageSquare, Bug, MoreHorizontal } from "lucide-react";

interface PostCardProps {
    post: {
        id: string;
        author: {
            name: string;
            avatar: string;
        };
        time: string;
        type: string;
        content: string;
        code?: string;
        image?: string;
        likes: number;
        comments: number;
    };
}

export function PostCard({ post }: PostCardProps) {
    return (
        <article className="bg-[#161618] rounded-xl border border-[#1337ec]/10 overflow-hidden">
            <div className="p-4 flex gap-4">
                <img
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                    src={post.author.avatar}
                />
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm">{post.author.name}</h4>
                        <span className="text-xs text-white/40">• {post.time}</span>
                        <span className={`ml-auto flex items-center gap-1 px-2 py-0.5 ${post.type === "Snippet" ? "bg-blue-500/10 text-blue-400" :
                                post.type === "Win" ? "bg-yellow-500/10 text-yellow-500" :
                                    "bg-purple-500/10 text-purple-400"
                            } text-[10px] font-bold uppercase tracking-wider rounded`}>
                            {post.type}
                        </span>
                    </div>
                    <p className="text-sm mb-4">{post.content}</p>

                    {post.code && (
                        <div className="bg-black/40 rounded-lg p-4 mb-4 border border-white/5 relative group">
                            <pre className="font-mono text-xs leading-relaxed overflow-x-auto text-slate-300">
                                {post.code}
                            </pre>
                        </div>
                    )}

                    {post.image && (
                        <div className="rounded-lg overflow-hidden border border-white/5 mb-4">
                            <img
                                alt="Post content"
                                className="w-full aspect-video object-cover"
                                src={post.image}
                            />
                        </div>
                    )}

                    <div className="flex items-center gap-6 border-t border-white/5 pt-4">
                        <button className="flex items-center gap-2 text-white/60 hover:text-[#1337ec] transition-colors group">
                            <span className="material-icons-round text-[20px] group-active:scale-125 transition-transform">
                                thumb_up
                            </span>
                            <span className="text-xs font-bold">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-white/60 hover:text-[#8b5cf6] transition-colors">
                            <span className="material-icons-round text-[20px]">chat_bubble_outline</span>
                            <span className="text-xs font-bold">{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-white/60 hover:text-[#10b981] transition-colors group">
                            <span className="material-icons-round text-[20px] group-hover:rotate-12 transition-transform">
                                bug_report
                            </span>
                            <span className="text-xs font-bold">Debug</span>
                        </button>
                        <div className="ml-auto">
                            <span className="material-icons-round text-white/30 cursor-pointer hover:text-white">
                                more_horiz
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
