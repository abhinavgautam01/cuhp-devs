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

export function RoomCard({ room }: RoomCardProps) {
    return (
        <div className="bg-[#161618] rounded-2xl border border-[#1337ec]/10 p-6 hover:border-[#1337ec]/40 transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1337ec]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#1337ec]/10 transition-colors"></div>

            <div className="flex justify-between items-start mb-6 relative">
                <div className="w-12 h-12 bg-[#1337ec]/10 rounded-xl flex items-center justify-center text-[#1337ec]">
                    <span className="material-icons-round text-2xl">{room.icon}</span>
                </div>
                <span className="px-3 py-1 bg-[#1337ec]/10 text-[#1337ec] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#1337ec]/20">
                    {room.badge}
                </span>
            </div>

            <div className="relative">
                <h3 className="text-lg font-bold mb-2 group-hover:text-[#1337ec] transition-colors">{room.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-6 line-clamp-2">
                    {room.description}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                        {room.avatars.map((avatar, i) => (
                            <img
                                key={i}
                                alt="Member"
                                className="w-7 h-7 rounded-full border-2 border-[#161618] object-cover"
                                src={avatar}
                            />
                        ))}
                        <div className="w-7 h-7 rounded-full border-2 border-[#161618] bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/40">
                            +{room.members}
                        </div>
                    </div>
                    <Link
                        href={`/community/chat-rooms/${encodeURIComponent(room.title)}`}
                        className="px-4 py-2 bg-[#1337ec] text-white text-xs font-bold rounded-lg shadow-lg shadow-[#1337ec]/20 hover:scale-105 transition-transform active:scale-95"
                    >
                        Join Room
                    </Link>
                </div>
            </div>
        </div>
    );
}
