interface CommunityRightSidebarProps {
    leaderboard: Array<{
        rank: number;
        name: string;
        streak: string;
        avatar: string;
        badges: Array<{ icon: string; color: string }>;
    }>;
    tags: string[];
    events: Array<{
        id: string;
        month: string;
        day: string;
        title: string;
        time: string;
    }>;
}

export function CommunityRightSidebar({ leaderboard, tags, events }: CommunityRightSidebarProps) {
    return (
        <aside className="hidden xl:block w-80 shrink-0 space-y-6">
            {/* Leaderboard */}
            <div className="bg-[#161618] rounded-xl border border-[#1337ec]/10 overflow-hidden">
                <div className="p-4 bg-[#1337ec]/10 border-b border-[#1337ec]/20 flex items-center justify-between">
                    <h3 className="font-bold text-sm flex items-center gap-2">
                        <span className="material-icons-round text-yellow-500">leaderboard</span> Top Contributors
                    </h3>
                    <span className="text-[10px] font-bold text-[#1337ec] bg-[#1337ec]/20 px-2 py-0.5 rounded uppercase tracking-tighter">
                        This Week
                    </span>
                </div>
                <div className="p-4 space-y-4">
                    {leaderboard.map((user) => (
                        <div key={user.name} className="flex items-center gap-3">
                            <div className="relative">
                                <img alt={user.name} className="w-10 h-10 rounded-lg object-cover" src={user.avatar} />
                                <div
                                    className={`absolute -top-2 -left-2 w-5 h-5 ${user.rank === 1 ? "bg-yellow-500" : "bg-slate-400"
                                        } rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-[#161618] text-black`}
                                >
                                    {user.rank}
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold leading-tight">{user.name}</p>
                                <p className="text-xs text-white/40">{user.streak}</p>
                            </div>
                            <div className="flex gap-1">
                                {user.badges.map((badge, i) => (
                                    <span key={i} className={`material-icons-round ${badge.color} text-sm`}>
                                        {badge.icon}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full py-3 text-xs font-bold text-[#1337ec] hover:bg-[#1337ec]/5 transition-colors border-t border-white/5">
                    View Full Leaderboard
                </button>
            </div>

            {/* Tags */}
            <div className="bg-[#161618]/40 p-4 rounded-xl border border-[#1337ec]/5">
                <h3 className="text-xs font-bold text-[#1337ec] uppercase tracking-widest mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-white/5 hover:bg-[#1337ec]/20 rounded-full text-xs transition-colors cursor-pointer border border-white/5"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-[#161618] rounded-xl border border-[#1337ec]/10 p-4">
                <h3 className="font-bold text-sm mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                    {events.map((event) => (
                        <div key={event.id} className="flex gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#1337ec]/10 flex flex-col items-center justify-center text-[#1337ec]">
                                <span className="text-[10px] font-bold uppercase leading-none">{event.month}</span>
                                <span className="text-sm font-bold leading-none">{event.day}</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold leading-tight">{event.title}</p>
                                <p className="text-xs text-white/40">{event.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
