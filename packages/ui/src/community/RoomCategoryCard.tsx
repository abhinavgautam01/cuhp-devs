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

export function RoomCategoryCard({ room }: RoomCategoryCardProps) {
    return (
        <Link
            href={`/community/chat-rooms/${encodeURIComponent(room.title)}`}
            className="bg-[#161618] p-5 rounded-xl border border-white/5 hover:border-[#1337ec]/30 transition-all cursor-pointer group"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-white/60 group-hover:text-[#1337ec] group-hover:bg-[#1337ec]/10 transition-all">
                    <span className="material-icons-round text-2xl">{room.icon}</span>
                </div>
                <div>
                    <h4 className="font-bold text-sm mb-0.5">{room.title}</h4>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/30">{room.members} members</span>
                        <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                        <span className="text-[10px] text-[#1337ec] font-medium">{room.contributor}</span>
                    </div>
                </div>
                <span className="material-icons-round ml-auto text-white/10 group-hover:text-[#1337ec] group-hover:translate-x-1 transition-all">
                    chevron_right
                </span>
            </div>
        </Link>
    );
}
