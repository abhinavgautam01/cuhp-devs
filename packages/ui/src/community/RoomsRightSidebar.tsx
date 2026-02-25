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
        <aside className="hidden xl:block w-80 shrink-0 space-y-6">
            {/* Search & Filter */}
            <div className="bg-[#161618] rounded-2xl border border-[#1337ec]/10 p-5">
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <span className="material-icons-round text-[#1337ec]">search</span> Find a Room
                </h3>
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Search topics..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#1337ec]/50 transition-colors"
                    />
                    <div className="flex flex-wrap gap-2 pt-2">
                        {["Frontend", "Backend", "AI/ML", "DevOps"].map((tag) => (
                            <button key={tag} className="px-3 py-1.5 bg-white/5 hover:bg-[#1337ec]/10 rounded-lg text-[10px] font-bold text-white/40 hover:text-[#1337ec] transition-all">
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
                    {masters.map((master) => (
                        <div key={master.name} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-bold text-[#1337ec]">
                                {master.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold truncate">{master.name}</p>
                                <p className="text-[10px] text-white/40 truncate">{master.subtitle}</p>
                            </div>
                            <span className="text-[10px] font-bold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded">
                                {master.rank}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Live Activity */}
            <div className="p-4">
                <h3 className="text-xs font-bold text-white/20 uppercase tracking-[0.2em] mb-4">Live Activity</h3>
                <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/5">
                    {liveActivity.map((activity, i) => (
                        <div key={i} className="flex gap-4 relative">
                            <div className="w-9 h-9 rounded-full bg-[#161618] border border-white/5 flex items-center justify-center shrink-0 z-10">
                                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
                            </div>
                            <div className="pt-1">
                                <p className="text-xs leading-relaxed">
                                    <span className="font-bold text-white/80">{activity.user}</span> {activity.action}{" "}
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
