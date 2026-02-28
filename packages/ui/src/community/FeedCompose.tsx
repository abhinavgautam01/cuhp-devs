"use client";

import { useState } from "react";
import { Code, HelpCircle, Trophy } from "lucide-react";

export function FeedCompose() {
    const [postText, setPostText] = useState("");

    return (
        <div className="bg-[#1a1c2a] rounded-xl border border-[#1337ec]/10 overflow-hidden shadow-xl shadow-black/20">
            <div className="p-4">
                <div className="flex gap-4">
                    <img
                        alt="User avatar"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white/5"
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                    />
                    <textarea
                        value={postText}
                        onChange={(e) => setPostText(e.target.value)}
                        className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder:text-white/20 resize-none h-20 font-sans outline-none text-white"
                        placeholder="Share a snippet, ask a question, or celebrate a win..."
                    />
                </div>
            </div>
            <div className="px-4 py-3 bg-white/2 flex items-center justify-between border-t border-white/5">
                <div className="flex gap-2">
                    {[
                        { icon: Code, color: "text-blue-400", label: "Snippet" },
                        { icon: HelpCircle, color: "text-[#8b5cf6]", label: "Question" },
                        { icon: Trophy, color: "text-yellow-500", label: "Win" },
                    ].map(({ icon: Icon, color, label }) => (
                        <button
                            key={label}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 text-sm font-medium transition-all text-white/60 hover:text-white"
                        >
                            <Icon className={`${color}`} size={18} />
                            {label}
                        </button>
                    ))}
                </div>
                <button className="bg-[#1337ec] hover:bg-[#1337ec]/90 text-white px-6 py-1.5 rounded-lg font-bold text-sm shadow-lg shadow-[#1337ec]/20 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                    disabled={!postText.trim()}>
                    Post
                </button>
            </div>
        </div>
    );
}
