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

export default function ChatRooms({ data }: ChatRoomsProps) {
  return (
    <main className="flex-1 flex flex-col xl:flex-row gap-8 p-4 md:p-8 overflow-y-auto w-full">
      <div className="flex-1 space-y-10">
        {/* Trending Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/40">
                Trending Rooms
              </h2>
              <p className="text-white/40 text-sm">Most active study groups right now</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.trendingRooms.map((room: any) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Browse by Category</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.communityRooms.map((room: any) => (
              <RoomCategoryCard key={room.id} room={room} />
            ))}
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