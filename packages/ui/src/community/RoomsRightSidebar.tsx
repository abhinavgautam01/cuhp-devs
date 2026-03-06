"use client";

import { Trophy, Activity, Zap, Users } from "../icons";

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

export function RoomsRightSidebar({ masters, liveActivity }: RoomsRightSidebarProps) {
    return (
        <aside className="hidden xl:block w-80 shrink-0 space-y-6 py-8">
            {/* Community Masters */}
            <div className="bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/5 overflow-hidden">
                <div className="p-4 bg-[#1337ec]/10 border-b border-white/5 flex items-center justify-between">
                    <h3 className="font-bold text-sm flex items-center gap-2 text-white/90">
                        <Trophy size={16} className="text-yellow-500" />
                        Community Masters
                    </h3>
                </div>
                <div className="p-4 space-y-4">
                    {masters.map((master: any, i: number) => (
                        <div key={master.name} className="flex items-center gap-3 group">
                            <div className="w-8 h-8 rounded-lg bg-[#1337ec]/10 border border-white/10 flex items-center justify-center font-bold text-[#1337ec] text-[10px] shrink-0 overflow-hidden relative">
                                {master.name.charAt(0)}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold truncate text-white/90">{master.name}</p>
                                <p className="text-[10px] text-[#10b981] truncate font-medium">{master.subtitle} • {20 + i} streak</p>
                            </div>
                            <span className="text-[10px] font-bold text-[#1337ec] bg-[#1337ec]/5 px-1.5 py-0.5 rounded">
                                {i === 0 ? "Top" : `#${i + 1}`}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Live Activity */}
            <div className="bg-white/[0.03] backdrop-blur-md rounded-xl border border-white/5 p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-sm text-white/90 flex items-center gap-2">
                        <Activity size={16} className="text-[#1337ec]" />
                        Live Activity
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        LIVE
                    </div>
                </div>
                <div className="space-y-4 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
                    {liveActivity.map((activity: any, i: number) => (
                        <div key={i} className="flex gap-3 items-start group">
                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 shadow-lg ${i % 2 === 0 ? 'bg-[#10b981] shadow-[#10b981]/20' : 'bg-[#1337ec] shadow-[#1337ec]/20'}`}></div>
                            <div className="flex-1">
                                <p className="text-xs leading-tight text-white/70">
                                    <span className="font-bold text-white/80">{activity.user}</span>{" "}
                                    {activity.action === "joined" ? "joined" : activity.action}{" "}
                                    <span className="text-[#1337ec] font-medium">{activity.room}</span>
                                </p>
                                <p className="text-[10px] text-white/20 mt-1">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {liveActivity.length > 5 && (
                    <button className="w-full mt-4 py-2 text-[10px] font-bold text-white/40 hover:text-[#1337ec] transition-colors border-t border-white/5 pt-4">
                        VIEW ALL ACTIVITY
                    </button>
                )}
            </div>

            {/* Decorative element */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1337ec]/10 to-transparent border border-white/5 relative overflow-hidden group">
                <div className="relative z-10">
                    <h4 className="text-sm font-bold text-white mb-1">Weekly Challenge</h4>
                    <p className="text-[10px] text-white/40 mb-3">Solve 5 problems to earn the "Debug Master" badge!</p>
                    <button className="w-full py-2 bg-white/5 hover:bg-[#1337ec] text-white text-[10px] font-bold rounded-lg transition-all border border-white/10 hover:border-[#1337ec]">
                        View Details
                    </button>
                </div>
                <Zap size={40} className="absolute -right-4 -bottom-4 text-white/5 group-hover:text-[#1337ec]/10 transition-colors rotate-12" />
            </div>
        </aside>
    );
}
