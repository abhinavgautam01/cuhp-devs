"use client";

import { useState } from "react";

export function FeedTabs() {
    const [activeTab, setActiveTab] = useState<"relevant" | "recent" | "debugging">("relevant");

    return (
        <div className="flex gap-4 border-b border-white/5 pb-1 mb-2">
            {(["relevant", "recent", "debugging"] as const).map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-medium text-sm transition-all capitalize relative ${activeTab === tab
                        ? "text-[#1337ec] font-bold"
                        : "text-white/40 hover:text-white"
                        }`}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && (
                        <div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-[#1337ec] shadow-[0_0_8px_rgba(19,55,236,0.5)]" />
                    )}
                </button>
            ))}
        </div>
    );
}
