"use client";

import { useState } from "react";

export function FeedCompose() {
    const [postText, setPostText] = useState("");

    return (
        <div className="bg-[#161618] rounded-xl border border-[#1337ec]/10 overflow-hidden">
            <div className="p-4">
                <div className="flex gap-4">
                    <img
                        alt="User avatar"
                        className="w-10 h-10 rounded-full object-cover"
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                    />
                    <textarea
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                        className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder:text-white/30 resize-none h-20 font-sans outline-none"
                        placeholder="Share a snippet, ask a question, or celebrate a win..."
                    />
                </div>
            </div>
            <div className="px-4 py-3 bg-white/5 flex items-center justify-between">
                <div className="flex gap-2">
                    {[
                        { icon: "code", color: "text-blue-400", label: "Snippet" },
                        { icon: "help_outline", color: "text-[#8b5cf6]", label: "Question" },
                        { icon: "emoji_events", color: "text-yellow-500", label: "Win" },
                    ].map(({ icon, color, label }) => (
                        <button
                            key={label}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-white/5 text-sm font-medium transition-colors"
                        >
                            <span className={`material-icons-round ${color} text-[18px]`}>{icon}</span>
                            {label}
                        </button>
                    ))}
                </div>
                <button className="bg-[#1337ec] hover:bg-[#1337ec]/90 text-white px-6 py-1.5 rounded-lg font-bold text-sm shadow-lg shadow-[#1337ec]/20 transition-transform active:scale-95">
                    Post
                </button>
            </div>
        </div>
    );
}
