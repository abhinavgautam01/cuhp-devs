import { BarChart2, Zap, Calendar, Star, ChevronRight } from "../icons";

interface CommunityRightSidebarProps {
    leaderboard: Array<{
        rank: number;
        name: string;
        streak: string;
        avatar: string;
        badges: Array<{ icon: any; color: string }>;
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
            <div className="bg-[#1a1c2a] rounded-xl border border-[#1337ec]/10 overflow-hidden shadow-lg shadow-black/10">
                <div className="p-4 bg-[#1337ec]/10 border-b border-[#1337ec]/20 flex items-center justify-between">
                    <h3 className="font-bold text-sm flex items-center gap-2 text-white">
                        <BarChart2 className="text-yellow-500" size={18} /> Top Contributors
                    </h3>
                    <span className="text-[10px] font-bold text-[#1337ec] bg-[#1337ec]/20 px-2 py-0.5 rounded uppercase tracking-tighter">
                        This Week
                    </span>
                </div>
                <div className="p-4 space-y-4">
                    {leaderboard.map((user) => (
                        <div key={user.name} className="flex items-center gap-3 group">
                            <div className="relative">
                                <img alt={user.name} className="w-10 h-10 rounded-lg object-cover ring-2 ring-white/5" src={user.avatar} />
                                <div
                                    className={`absolute -top-2 -left-2 w-5 h-5 ${user.rank === 1 ? "bg-yellow-500" : "bg-slate-400"
                                        } rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-[#1a1c2a] text-black`}
                                >
                                    {user.rank}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold leading-tight text-white truncate">{user.name}</p>
                                <p className="text-xs text-white/40 truncate">{user.streak}</p>
                            </div>
                            <div className="flex gap-1">
                                {user.badges.map((badge, i) => (
                                    <span key={i} className={`${badge.color} transition-transform group-hover:scale-110`}>
                                        {/* Assuming badge.icon is now a Lucide component or similar passed in */}
                                        <Star size={12} fill="currentColor" />
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full py-3 text-xs font-bold text-[#1337ec] hover:bg-[#1337ec]/5 transition-colors border-t border-white/5 flex items-center justify-center gap-1">
                    View Full Leaderboard <ChevronRight size={14} />
                </button>
            </div>

            {/* Tags */}
            <div className="bg-[#1a1c2a]/60 p-4 rounded-xl border border-[#1337ec]/5 backdrop-blur-sm shadow-inner">
                <h3 className="text-xs font-bold text-[#1337ec] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap size={14} /> Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-white/5 hover:bg-[#1337ec]/20 rounded-full text-xs transition-all cursor-pointer border border-white/5 text-slate-300 hover:text-white hover:scale-105 active:scale-95"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-[#1a1c2a] rounded-xl border border-[#1337ec]/10 p-4 shadow-lg shadow-black/10">
                <h3 className="font-bold text-sm mb-4 flex items-center gap-2 text-white">
                    <Calendar size={18} className="text-[#1337ec]" /> Upcoming Events
                </h3>
                <div className="space-y-4">
                    {events.map((event) => (
                        <div key={event.id} className="flex gap-3 group cursor-pointer">
                            <div className="w-10 h-10 rounded-lg bg-[#1337ec]/10 flex flex-col items-center justify-center text-[#1337ec] border border-[#1337ec]/20 transition-colors group-hover:bg-[#1337ec]/20">
                                <span className="text-[10px] font-bold uppercase leading-none">{event.month}</span>
                                <span className="text-sm font-bold leading-none">{event.day}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold leading-tight text-white group-hover:text-[#1337ec] transition-colors truncate">{event.title}</p>
                                <p className="text-xs text-white/40 truncate">{event.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors border border-white/5 rounded-lg hover:border-white/10">
                    Explore Schedule
                </button>
            </div>
        </aside>
    );
}
