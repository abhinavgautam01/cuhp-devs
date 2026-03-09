"use client";

import { useState } from "react";
import { Code, HelpCircle, Trophy } from "../icons";

interface FeedComposeProps {
    onPost?: (data: { content: string; type: string }) => Promise<void>;
    userAvatar?: string;
}

export function FeedCompose({ onPost, userAvatar }: FeedComposeProps) {
    const [postText, setPostText] = useState("");
    const [selectedType, setSelectedType] = useState<string>("Snippet");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!postText.trim()) return;

        setIsSubmitting(true);
        try {
            if (onPost) {
                await onPost({
                    content: postText,
                    type: selectedType
                });
                setPostText("");
            }
        } catch (error) {
            console.error("Post submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-card-custom backdrop-blur-md rounded-xl overflow-hidden border border-card-border shadow-xl shadow-black/20">
            <div className="p-4">
                <div className="flex gap-4">
                    <img
                        alt="User avatar"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white/5"
                        src={userAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"}
                    />
                    <div className="flex-1 space-y-4">
                        <textarea
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                            className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder:text-muted-custom/60 resize-none h-20 font-sans outline-none text-foreground transition-all duration-300 focus:placeholder:text-muted-custom/80"
                            placeholder="Share a snippet, ask a question, or celebrate a win..."
                        />
                        <div className="flex justify-end pr-2">
                            <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${postText.length > 450 ? 'text-rose-500' : 'text-muted-custom'}`}>
                                {postText.length} / 500
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 py-3 bg-background/40 backdrop-blur-sm flex items-center justify-between">
                <div className="flex gap-2">
                    {[
                        { icon: Code, color: "text-blue-400", label: "Snippet" },
                        { icon: HelpCircle, color: "text-[#8b5cf6]", label: "Question" },
                        { icon: Trophy, color: "text-yellow-500", label: "Win" },
                    ].map(({ icon: Icon, color, label }) => (
                        <button
                            key={label}
                            onClick={() => setSelectedType(label)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm font-medium ${selectedType === label
                                ? "bg-primary-custom/20 text-primary-custom"
                                : "text-muted-custom hover:text-foreground hover:bg-foreground/[0.03]"
                                }`}
                        >
                            <Icon className={`${selectedType === label ? color : 'text-gray-500'}`} size={18} />
                            {label}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-primary-custom hover:brightness-110 text-primary-foreground-custom px-6 py-1.5 rounded-lg font-bold text-sm shadow-lg shadow-primary-custom/20 transition-all active:scale-95 disabled:opacity-30 disabled:active:scale-100 min-w-[80px]"
                    disabled={!postText.trim() || isSubmitting}
                >
                    {isSubmitting ? "..." : "Post"}
                </button>
            </div>
        </div>
    );
}
