"use client";

import { useState } from "react";

interface RoomsRightSidebarProps {
    masters: Array<{
        name: string;
        subtitle: string;
        rank: string;
    }>;
    liveActivity: Array<{
        user: string;
        action: string;
        room: string;
        time: string;
    }>;
}

const RANK_STYLES: Record<string, string> = {
    GOLD: "text-yellow-400 bg-yellow-400/10 ring-yellow-400/40",
    SILVER: "text-slate-300 bg-slate-300/10 ring-slate-300/40",
    BRONZE: "text-orange-400 bg-orange-400/10 ring-orange-400/40",
};
const RANK_RING: Record<string, string> = {
    GOLD: "ring-2 ring-yellow-400/50",
    SILVER: "ring-2 ring-slate-300/30",
    BRONZE: "ring-2 ring-orange-400/40",
};

const AVATAR_GRADIENTS = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-violet-500",
    "from-orange-500 to-amber-500",
    "from-green-500 to-emerald-500",
];

const FILTER_TAGS = ["Frontend", "Backend", "AI/ML", "DevOps"];

export function RoomsRightSidebar({ masters, liveActivity }: RoomsRightSidebarProps) {
    const [activeTag, setActiveTag] = useState<string | null>(null);

    return (
        <aside className="hidden xl:block w-80 shrink-0 space-y-6">
            {/* Search & Filter */}
            <div className="bg-[#161618] rounded-2xl border border-[#1337ec]/10 p-5">
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <span className="material-icons-round text-[#1337ec] text-base">search</span>
                    Find a Room
                </h3>
                <div className="space-y-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search topics..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#1337ec]/50 transition-colors pl-9"
                        />
                        <span className="material-icons-round absolute left-2.5 top-1/2 -translate-y-1/2 text-white/20 text-base">search</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                        {FILTER_TAGS.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-200 ${activeTag === tag
                                    ? "bg-[#1337ec] text-white shadow-lg shadow-[#1337ec]/20 scale-105"
                                    : "bg-white/5 hover:bg-[#1337ec]/10 text-white/40 hover:text-[#1337ec]"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Community Masters */}
            <div className="bg-[#161618] rounded-2xl border border-[#1337ec]/10 overflow-hidden">
                <div className="p-4 bg-[#1337ec]/5 border-b border-[#1337ec]/10 flex items-center justify-between">
                    <h3 className="font-bold text-sm">Room Masters</h3>
                    <span className="material-icons-round text-[#1337ec] text-sm">verified</span>
                </div>
                <div className="p-4 space-y-4">
                    {masters.map((master, i) => {
                        const gradient = AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length];
                        const rankStyle = RANK_STYLES[master.rank] || "text-white/60 bg-white/10 ring-white/20";
                        const ringStyle = RANK_RING[master.rank] || "";
                        return (
                            <div key={master.name} className="flex items-center gap-3 group">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} ${ringStyle} flex items-center justify-center font-bold text-white text-sm shrink-0`}>
                                    {master.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold truncate group-hover:text-white/90 transition-colors">{master.name}</p>
                                    <p className="text-[10px] text-white/40 truncate">{master.subtitle}</p>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${rankStyle}`}>
                                    {master.rank}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Live Activity */}
            <div className="p-4 bg-[#161618] rounded-2xl border border-[#1337ec]/10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-white/20 uppercase tracking-[0.2em]">Live Activity</h3>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        LIVE
                    </span>
                </div>
                <div className="space-y-5 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/5">
                    {liveActivity.map((activity, i) => (
                        <div
                            key={i}
                            style={{ animationDelay: `${i * 100}ms` }}
                            className="flex gap-4 relative animate-[fadeSlideUp_0.4s_ease_forwards] opacity-0"
                        >
                            <div className="w-9 h-9 rounded-full bg-[#0F0F11] border border-white/10 flex items-center justify-center shrink-0 z-10">
                                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                            </div>
                            <div className="pt-1">
                                <p className="text-xs leading-relaxed">
                                    <span className="font-bold text-white/80">{activity.user}</span>{" "}
                                    {activity.action}{" "}
                                    <span className="text-[#1337ec] font-medium">#{activity.room}</span>
                                </p>
                                <p className="text-[10px] text-white/20 mt-1">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
