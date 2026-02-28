"use client";

import Link from "next/link";
import { Users, Zap, Star, Activity, ArrowRight } from "lucide-react";

interface RoomCardProps {
    room: {
        id: number;
        title: string;
        description: string;
        badge: string;
        members: string;
        icon: string;
        avatars: string[];
    };
}

const BADGE_STYLES: Record<string, string> = {
    HOT: "from-orange-500/20 to-red-500/20 text-orange-400 border-orange-500/30",
    NEW: "from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30",
    LIVE: "from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30",
    TOP: "from-purple-500/20 to-violet-500/20 text-purple-400 border-purple-500/30",
};

const BADGE_ACCENT: Record<string, string> = {
    HOT: "from-orange-500 via-red-500 to-transparent",
    NEW: "from-green-500 via-emerald-500 to-transparent",
    LIVE: "from-blue-500 via-cyan-500 to-transparent",
    TOP: "from-purple-500 via-violet-500 to-transparent",
};

export function RoomCard({ room }: RoomCardProps) {
    const badgeClass = BADGE_STYLES[room.badge] ?? "from-[#1337ec]/30 to-blue-500/30 text-white border-white/10";
    const accentClass = BADGE_ACCENT[room.badge] ?? "from-[#1337ec] via-blue-500 to-transparent";

    // Mapping some common icon names to Lucide icons
    const IconComponent = room.badge === "HOT" ? Zap : room.badge === "TOP" ? Star : room.badge === "LIVE" ? Activity : Users;

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-6 transition-all hover:border-[#1337ec]/40 hover:shadow-[0_20px_50px_rgba(19,55,236,0.15)] flex flex-col h-full">
            {/* Top right badge */}
            <div className="absolute top-0 right-0 p-4">
                <span className={`flex items-center gap-1 px-2 py-1 bg-gradient-to-r ${badgeClass} rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10`}>
                    <IconComponent size={10} className="shrink-0" />
                    {room.badge === "HOT" ? "Hot Room" : room.badge}
                </span>
            </div>

            <div className="flex gap-5 items-start mb-6">
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-xl bg-[#1337ec]/10 border border-[#1337ec]/20 flex items-center justify-center text-[#1337ec] shadow-inner shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <Users size={28} />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold mb-1 truncate group-hover:text-[#1337ec] transition-colors">{room.title}</h3>
                    <p className="text-sm text-white/40 line-clamp-2 leading-relaxed">{room.description}</p>
                </div>
            </div>

            {/* Members & Tags Footer Area */}
            <div className="mt-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                            {room.avatars.slice(0, 3).map((avatar, i) => (
                                <img
                                    key={i}
                                    alt="Member"
                                    className="w-6 h-6 rounded-full border-2 border-[#161618] object-cover"
                                    src={avatar}
                                />
                            ))}
                            {Number(room.members.replace(/[^0-9]/g, '')) > 3 && (
                                <div className="w-6 h-6 rounded-full bg-[#1337ec]/40 border-2 border-[#161618] flex items-center justify-center text-[8px] font-bold text-white">
                                    +{room.members}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Users size={12} className="text-white/30" />
                            <span className="text-xs font-medium text-white/40">{room.members} Members</span>
                        </div>
                    </div>

                    {/* Tag (Optional simple display) */}
                    <div className="hidden md:flex gap-1.5">
                        <span className="text-[10px] text-[#1337ec]/60 bg-[#1337ec]/5 px-2 py-0.5 rounded-md font-medium">
                            #study
                        </span>
                    </div>
                </div>

                {/* Enter Room Button */}
                <Link
                    href={`/community/chat-rooms/${encodeURIComponent(room.title)}`}
                    className="w-full py-2.5 bg-[#1337ec] rounded-lg font-bold text-sm text-center text-white shadow-lg shadow-[#1337ec]/20 transition-all hover:shadow-[#1337ec]/40 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 group/btn"
                >
                    Enter Room
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                </Link>
            </div>

            {/* Background decorative glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1337ec]/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#1337ec]/10 transition-all" />
        </div>
    );
}
