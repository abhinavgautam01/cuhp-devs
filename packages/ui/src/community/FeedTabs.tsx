"use client";

import { useState } from "react";

export function FeedTabs() {
    const [activeTab, setActiveTab] = useState<"relevant" | "recent" | "debugging">("relevant");

    return (
        <div className="flex gap-4 border-b border-[#1337ec]/10 pb-1">
            {(["relevant", "recent", "debugging"] as const).map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-medium text-sm transition-colors capitalize ${activeTab === tab
                            ? "text-[#1337ec] border-b-2 border-[#1337ec] font-bold"
                            : "text-white/50 hover:text-white"
                        }`}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>
    );
}
