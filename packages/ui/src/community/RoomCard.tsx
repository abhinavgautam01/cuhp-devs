"use client";

import Link from "next/link";

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
    const badgeClass = BADGE_STYLES[room.badge] ?? "from-[#1337ec]/20 to-blue-500/20 text-[#1337ec] border-[#1337ec]/30";
    const accentClass = BADGE_ACCENT[room.badge] ?? "from-[#1337ec] via-blue-500 to-transparent";

    return (
        <div className="bg-white/[0.03] backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden relative group transition-all duration-500 hover:-translate-y-2 hover:border-[#1337ec]/50 hover:shadow-[0_20px_50px_rgba(19,55,236,0.15)]">
            {/* Top shimmer strip */}
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accentClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            {/* Inner highlights for depth */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#1337ec]/10 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:bg-[#1337ec]/20 transition-all duration-500 pointer-events-none" />

            <div className="p-6 relative z-10">
                {/* Header row */}
                <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 bg-[#1337ec]/10 rounded-xl flex items-center justify-center text-[#1337ec] group-hover:bg-[#1337ec]/20 transition-colors">
                        <span className="material-icons-round text-2xl">{room.icon}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Live pulse */}
                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-400">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                            LIVE
                        </span>
                        <span className={`px-3 py-1 bg-gradient-to-r ${badgeClass} text-[10px] font-bold uppercase tracking-widest rounded-full border`}>
                            {room.badge}
                        </span>
                    </div>
                </div>

                {/* Text */}
                <h3 className="text-lg font-bold mb-2 group-hover:text-[#1337ec] transition-colors">{room.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-2">{room.description}</p>

                {/* Tag row */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {["#study", `#${room.title.toLowerCase().replace(/\s+/g, "-")}`].map((tag) => (
                        <span key={tag} className="text-[10px] text-[#1337ec]/60 bg-[#1337ec]/5 px-2 py-0.5 rounded-md font-medium">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                    {/* Avatar stack */}
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {room.avatars.slice(0, 3).map((avatar, i) => (
                                <img
                                    key={i}
                                    alt="Member"
                                    className="w-7 h-7 rounded-full border-2 border-white/10 object-cover ring-2 ring-transparent group-hover:ring-[#1337ec]/30 transition-all duration-500"
                                    src={avatar}
                                />
                            ))}
                            {Number(room.members) > 3 && (
                                <div className="w-7 h-7 rounded-full border-2 border-white/10 bg-[#1337ec]/20 flex items-center justify-center text-[10px] font-bold text-[#1337ec]">
                                    +{room.members}
                                </div>
                            )}
                        </div>
                        <span className="text-[10px] text-white/30 font-medium">{room.members} members</span>
                    </div>

                    {/* Join button */}
                    <Link
                        href={`/community/chat-rooms/${encodeURIComponent(room.title)}`}
                        className="flex items-center gap-1.5 px-6 py-2.5 bg-[#1337ec] text-white text-xs font-bold rounded-xl shadow-[0_8px_20px_rgba(19,55,236,0.3)] hover:shadow-[0_12px_25px_rgba(19,55,236,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group/btn relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        <span className="relative z-10">Join Room</span>
                        <span className="relative z-10 inline-block transition-transform duration-300 group-hover/btn:translate-x-1 text-sm">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
