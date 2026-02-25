"use client";

import Link from "next/link";

interface RoomCategoryCardProps {
    room: {
        id: number;
        title: string;
        members: string;
        icon: string;
        contributor: string;
    };
}

const ICON_GRADIENTS = [
    "from-blue-500/20 to-cyan-500/20 text-blue-400",
    "from-purple-500/20 to-violet-500/20 text-purple-400",
    "from-orange-500/20 to-amber-500/20 text-orange-400",
    "from-green-500/20 to-emerald-500/20 text-green-400",
    "from-pink-500/20 to-rose-500/20 text-pink-400",
    "from-[#1337ec]/20 to-blue-500/20 text-[#1337ec]",
];

export function RoomCategoryCard({ room }: RoomCategoryCardProps) {
    const gradient = ICON_GRADIENTS[room.id % ICON_GRADIENTS.length];
    // Fake online count derived from members string for display purposes
    const onlineCount = Math.floor((parseInt(room.members) || 10) * 0.2) + 1;

    return (
        <Link
            href={`/community/chat-rooms/${encodeURIComponent(room.title)}`}
            className="relative bg-white/[0.03] backdrop-blur-xl p-5 rounded-2xl border border-white/5 hover:border-[#1337ec]/40 transition-all duration-300 cursor-pointer group overflow-hidden flex items-center gap-4 hover:shadow-[0_10px_30px_rgba(19,55,236,0.1)] hover:-translate-y-1"
        >
            {/* Left accent bar */}
            <div className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-[#1337ec] to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon */}
            <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shrink-0`}>
                <span className="material-icons-round text-2xl">{room.icon}</span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm mb-1 group-hover:text-[#1337ec] transition-colors truncate">{room.title}</h4>
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] text-white/30">{room.members} members</span>
                    <span className="w-1 h-1 bg-white/10 rounded-full" />
                    {/* Online indicator */}
                    <span className="flex items-center gap-1 text-[10px] text-green-400 font-medium">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        {onlineCount} online
                    </span>
                    <span className="w-1 h-1 bg-white/10 rounded-full" />
                    <span className="text-[10px] text-[#1337ec] font-medium truncate">{room.contributor}</span>
                </div>
            </div>

            {/* Chevron */}
            <span className="material-icons-round text-white/10 group-hover:text-[#1337ec] group-hover:translate-x-1.5 transition-all duration-200 shrink-0">
                chevron_right
            </span>
        </Link>
    );
}
