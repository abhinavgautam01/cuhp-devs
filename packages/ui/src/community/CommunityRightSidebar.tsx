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
            <div className="bg-card-custom backdrop-blur-md rounded-xl overflow-hidden border border-card-border shadow-lg shadow-black/10">
                <div className="p-4 bg-primary-custom/10 flex items-center justify-between">
                    <h3 className="font-bold text-sm flex items-center gap-2 text-foreground">
                        <BarChart2 className="text-yellow-500" size={18} /> Top Contributors
                    </h3>
                    <span className="text-[10px] font-bold text-primary-custom bg-primary-custom/20 px-2 py-0.5 rounded uppercase tracking-tighter">
                        This Week
                    </span>
                </div>
                <div className="p-4 space-y-4">
                    {leaderboard.map((user) => (
                        <div key={user.name} className="flex items-center gap-3 group/item p-2 rounded-xl hover:bg-foreground/[0.03] transition-all cursor-pointer">
                            <div className="relative">
                                <img alt={user.name} className="w-10 h-10 rounded-lg object-cover ring-2 ring-white/5 group-hover/item:ring-primary-custom/30 transition-all" src={user.avatar} />
                                <div
                                    className={`absolute -top-2 -left-2 w-5 h-5 shadow-lg ${user.rank === 1 ? "bg-yellow-500" : "bg-slate-400"
                                        } rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-background text-black`}
                                >
                                    {user.rank}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold leading-tight text-foreground truncate">{user.name}</p>
                                <p className="text-xs text-muted-custom truncate">{user.streak}</p>
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
                <button className="w-full py-3 text-xs font-bold text-primary-custom hover:bg-primary-custom/5 transition-colors flex items-center justify-center gap-1">
                    View Full Leaderboard <ChevronRight size={14} />
                </button>
            </div>

            {/* Tags */}
            <div className="bg-foreground/[0.03] dark:bg-background/40 p-4 rounded-xl backdrop-blur-sm shadow-inner">
                <h3 className="text-xs font-bold text-primary-custom uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap size={14} /> Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-background/60 dark:bg-background/60 hover:bg-primary-custom/20 rounded-full text-xs transition-all cursor-pointer text-muted-custom hover:text-foreground hover:scale-105 active:scale-95 border border-primary-custom/5"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-card-custom backdrop-blur-md rounded-xl p-4 border border-card-border shadow-lg shadow-black/10">
                <h3 className="font-bold text-sm mb-4 flex items-center gap-2 text-foreground">
                    <Calendar size={18} className="text-primary-custom" /> Upcoming Events
                </h3>
                <div className="space-y-4">
                    {events.map((event) => (
                        <div key={event.id} className="flex gap-3 group/event cursor-pointer p-2 rounded-xl hover:bg-foreground/[0.02] transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-primary-custom/10 flex flex-col items-center justify-center text-primary-custom border border-primary-custom/20 transition-colors group-hover/event:bg-primary-custom/20">
                                <span className="text-[10px] font-bold uppercase leading-none">{event.month}</span>
                                <span className="text-sm font-bold leading-none">{event.day}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold leading-tight text-foreground group-hover:text-primary-custom transition-colors truncate">{event.title}</p>
                                <p className="text-xs text-muted-custom truncate">{event.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 py-2 text-xs font-bold text-muted-custom hover:text-foreground transition-all rounded-lg hover:bg-foreground/[0.03]">
                    Explore Schedule
                </button>
            </div>
        </aside>
    );
}
