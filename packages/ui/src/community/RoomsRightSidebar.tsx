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
            <div className="bg-card-custom backdrop-blur-md rounded-xl border border-card-border overflow-hidden">
                <div className="p-4 bg-primary-custom/10 border-b border-card-border flex items-center justify-between">
                    <h3 className="font-bold text-sm flex items-center gap-2 text-foreground/90">
                        <Trophy size={16} className="text-yellow-500" />
                        Community Masters
                    </h3>
                </div>
                <div className="p-4 space-y-4">
                    {masters.map((master: any, i: number) => {
                        const displayName = master.name || "Master";
                        return (
                            <div key={master.name || i} className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-lg bg-primary-custom/10 border border-card-border flex items-center justify-center font-bold text-primary-custom text-[10px] shrink-0 overflow-hidden relative">
                                    {displayName.charAt(0)}
                                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent pointer-events-none" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold truncate text-foreground/90">{displayName}</p>
                                    <p className="text-[10px] text-[#10b981] truncate font-medium">{master.subtitle || "Contributor"} • {20 + i} streak</p>
                                </div>
                                <span className="text-[10px] font-bold text-primary-custom bg-primary-custom/5 px-1.5 py-0.5 rounded">
                                    {i === 0 ? "Top" : `#${i + 1}`}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Live Activity */}
            <div className="bg-card-custom/50 backdrop-blur-md rounded-xl border border-card-border p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-sm text-foreground/90 flex items-center gap-2">
                        <Activity size={16} className="text-primary-custom" />
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
                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 shadow-lg ${i % 2 === 0 ? 'bg-[#10b981] shadow-[#10b981]/20' : 'bg-primary-custom shadow-primary-custom/20'}`}></div>
                            <div className="flex-1">
                                <p className="text-xs leading-tight text-foreground/70">
                                    <span className="font-bold text-foreground/80">{activity.user}</span>{" "}
                                    {activity.action === "joined" ? "joined" : activity.action}{" "}
                                    <span className="text-primary-custom font-medium">{activity.room}</span>
                                </p>
                                <p className="text-[10px] text-muted-custom/40 mt-1">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {liveActivity.length > 5 && (
                    <button className="w-full mt-4 py-2 text-[10px] font-bold text-muted-custom hover:text-primary-custom transition-colors border-t border-card-border pt-4">
                        VIEW ALL ACTIVITY
                    </button>
                )}
            </div>

            {/* Decorative element */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-custom/10 to-transparent border border-card-border relative overflow-hidden group">
                <div className="relative z-10">
                    <h4 className="text-sm font-bold text-foreground mb-1">Weekly Challenge</h4>
                    <p className="text-[10px] text-muted-custom/60 mb-3">Solve 5 problems to earn the "Debug Master" badge!</p>
                    <button className="w-full py-2 bg-background/40 hover:bg-primary-custom text-primary-foreground-custom text-[10px] font-bold rounded-lg transition-all border border-card-border hover:border-primary-custom shadow-sm">
                        View Details
                    </button>
                </div>
                <Zap size={40} className="absolute -right-4 -bottom-4 text-foreground/5 group-hover:text-primary-custom/10 transition-colors rotate-12" />
            </div>
        </aside>
    );
}
