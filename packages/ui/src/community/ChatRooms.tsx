import { RoomCard } from "./RoomCard";
import { RoomCategoryCard } from "./RoomCategoryCard";
import { RoomsRightSidebar } from "./RoomsRightSidebar";

interface ChatRoomsProps {
  data: {
    trendingRooms: any[];
    communityRooms: any[];
    masters: any[];
    liveActivity: any[];
  };
}

function EmptyRoomsPlaceholder({ message }: { message: string }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
        <span className="material-icons-round text-3xl text-white/20">forum</span>
      </div>
      <p className="text-white/20 text-sm font-medium">{message}</p>
      <p className="text-white/10 text-xs mt-1">Check back soon or create one!</p>
    </div>
  );
}

export default function ChatRooms({ data }: ChatRoomsProps) {
  return (
    <main className="flex-1 flex flex-col xl:flex-row gap-8 p-4 md:p-8 overflow-y-auto w-full">
      <div className="flex-1 space-y-12">

        {/* Trending Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="relative">
              {/* Glow behind title */}
              <div className="absolute -left-8 -top-8 w-32 h-32 bg-[#1337ec]/10 rounded-full blur-[60px] pointer-events-none opacity-50" />
              <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/20 tracking-tight relative z-10">
                Trending Rooms
              </h2>
              <p className="text-white/40 text-sm font-medium mt-1">Most active study groups right now</p>
            </div>
            <a
              href="/community/chat-rooms/create"
              className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-[#1337ec]/10 hover:border-[#1337ec]/30 transition-all duration-300 shadow-xl"
            >
              <span className="material-icons-round text-sm">add</span>
              Create Room
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.trendingRooms.length > 0 ? (
              data.trendingRooms.map((room: any, i: number) => (
                <div
                  key={room.id}
                  style={{ animationDelay: `${i * 80}ms` }}
                  className="animate-[fadeSlideUp_0.4s_ease_forwards] opacity-0"
                >
                  <RoomCard room={room} />
                </div>
              ))
            ) : (
              <EmptyRoomsPlaceholder message="No trending rooms yet." />
            )}
          </div>
        </section>

        {/* Section divider */}
        <div className="flex items-center gap-4 py-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-white/5" />
          <span className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] px-4 py-1.5 bg-white/5 rounded-full border border-white/5 backdrop-blur-sm">
            Browse by Category
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-white/5 via-[#1337ec]/20 to-transparent" />
        </div>

        {/* Categories Section */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.communityRooms.length > 0 ? (
              data.communityRooms.map((room: any, i: number) => (
                <div
                  key={room.id}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className="animate-[fadeSlideUp_0.4s_ease_forwards] opacity-0"
                >
                  <RoomCategoryCard room={room} />
                </div>
              ))
            ) : (
              <EmptyRoomsPlaceholder message="No community rooms yet." />
            )}
          </div>
        </section>

      </div>

      <RoomsRightSidebar
        masters={data.masters}
        liveActivity={data.liveActivity}
      />
    </main>
  );
}