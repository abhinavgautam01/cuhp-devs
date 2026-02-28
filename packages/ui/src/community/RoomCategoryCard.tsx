"use client";

import Link from "next/link";
import { User, Users, ChevronRight, Cpu, Layers, Code, Shield, Globe, Terminal } from "lucide-react";

interface RoomCategoryCardProps {
    room: {
        id: number;
        title: string;
        members: string;
        icon: string;
        contributor: string;
    };
}

const ICON_MAP: Record<string, any> = {
    'smart_toy': Cpu,
    'hub': Layers,
    'memory': Terminal,
    'javascript': Code,
    'shield_lock': Shield,
    'language': Globe,
};

const ICON_GRADIENTS = [
    "from-blue-500/20 to-cyan-500/20 text-blue-400",
    "from-purple-500/20 to-violet-500/20 text-purple-400",
    "from-orange-500/20 to-amber-500/20 text-orange-400",
    "from-green-500/20 to-emerald-500/20 text-green-400",
    "from-pink-500/20 to-rose-500/20 text-pink-400",
    "from-[#1337ec]/20 to-blue-500/20 text-[#1337ec]",
];

export function RoomCategoryCard({ room }: RoomCategoryCardProps) {
    const gradient = ICON_GRADIENTS[room.id % ICON_GRADIENTS.length] ?? ICON_GRADIENTS[0];
    const IconComponent = ICON_MAP[room.icon] || Code;

    return (
        <div className="bg-white/[0.02] backdrop-blur-md rounded-2xl border border-white/5 p-5 flex flex-col hover:border-[#1337ec]/30 transition-all group hover:shadow-[0_10px_30px_rgba(19,55,236,0.1)] h-full overflow-hidden relative">
            <div className="flex items-start justify-between mb-6 relative z-10">
                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${gradient?.split(' ').pop() || ''} group-hover:scale-110 transition-transform duration-500`}>
                    <IconComponent size={24} />
                </div>

                {/* Contributor Info */}
                <div className="text-right">
                    <p className="text-[10px] text-white/30 uppercase tracking-tighter mb-1 font-bold">Top Contributor</p>
                    <div className="flex items-center gap-2 justify-end">
                        <span className="text-xs font-bold text-white/70">{room.contributor || "@dev_sync"}</span>
                        <div className="w-6 h-6 rounded-full bg-[#1337ec]/20 border border-white/10 flex items-center justify-center overflow-hidden">
                            <User size={12} className="text-[#1337ec]" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10">
                <h4 className="font-bold text-lg mb-1 group-hover:text-[#1337ec] transition-colors">{room.title}</h4>
                <p className="text-xs text-white/40 line-clamp-2 mb-6 leading-relaxed">Exploring {room.title.toLowerCase()} essentials and advanced architecture patterns.</p>
            </div>

            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                <span className="text-xs font-bold text-[#1337ec] flex items-center gap-1.5">
                    <Users size={12} /> {room.members}
                </span>

                <Link
                    href={`/community/chat-rooms/${encodeURIComponent(room.title)}`}
                    className="px-4 py-1.5 rounded-lg border border-[#1337ec]/30 hover:bg-[#1337ec] hover:border-[#1337ec] text-white text-xs font-bold transition-all flex items-center gap-2 group/btn"
                >
                    Join Room
                    <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-0.5" />
                </Link>
            </div>

            {/* Subtle background glow */}
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#1337ec]/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#1337ec]/10 transition-all" />
        </div>
    );
}
