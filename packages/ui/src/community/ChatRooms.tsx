"use client";

import { useEffect, useState } from "react";
import { TrendingUp, LayoutGrid, List, Plus, MessageSquare } from "lucide-react";
import { RoomCard } from "./RoomCard";
import { RoomCategoryCard } from "./RoomCategoryCard";
import { RoomsRightSidebar } from "./RoomsRightSidebar";
import { useSocket } from "../../../../apps/web/hooks/useSocket";

interface ChatRoomsProps {
  data: {
    trendingRooms: any[];
    communityRooms: any[];
    masters: any[];
    liveActivity: any[];
  };
  token: string | null;
}

function EmptyRoomsPlaceholder({ message }: { message: string }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
      <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
        <MessageSquare size={40} className="text-white/20" />
      </div>
      <p className="text-white/60 text-lg font-bold">{message}</p>
      <p className="text-white/20 text-sm mt-2 max-w-[200px]">Check back soon or be the first to start a conversation!</p>
    </div>
  );
}

function CreateRoomCard() {
  return (
    <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-dashed border-white/10 p-5 flex flex-col items-center justify-center text-center hover:bg-white/[0.05] hover:border-[#1337ec]/50 transition-all cursor-pointer group h-full min-h-[220px] relative overflow-hidden">
      <div className="w-14 h-14 rounded-full border border-dashed border-white/20 flex items-center justify-center text-white/30 mb-4 group-hover:scale-110 group-hover:bg-[#1337ec] group-hover:text-white group-hover:border-[#1337ec] transition-all duration-500 shadow-xl group-hover:shadow-[#1337ec]/40">
        <Plus size={28} />
      </div>
      <h4 className="font-bold text-white/80 group-hover:text-white transition-colors text-lg">Start a New Room</h4>
      <p className="text-xs text-white/30 max-w-[160px] mt-2 leading-relaxed">Can't find a topic? Create your own study group and invite friends.</p>

      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1337ec]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

export default function ChatRooms({ data: initialData, token }: ChatRoomsProps) {
  const [data, setData] = useState(initialData);
  const { socket, isConnected } = useSocket(token);

  useEffect(() => {
    if (!socket || !isConnected) return;

    // Request initial global stats
    socket.emit("get-global-stats");

    const handleGlobalStats = ({ stats, activityLog }: { stats: Record<string, number>, activityLog: any[] }) => {
      setData(prev => {
        const updateRoomMembers = (rooms: any[]) => rooms.map(room => ({
          ...room,
          members: stats[room.id]?.toString() || "0"
        }));

        return {
          ...prev,
          trendingRooms: updateRoomMembers(prev.trendingRooms),
          communityRooms: updateRoomMembers(prev.communityRooms),
          liveActivity: activityLog.length > 0 ? activityLog : prev.liveActivity
        };
      });
    };

    const handleGlobalActivity = (activity: any) => {
      setData(prev => ({
        ...prev,
        liveActivity: [activity, ...prev.liveActivity].slice(0, 20)
      }));
    };

    const handleRoomsStats = ({ stats }: { stats: Record<string, number> }) => {
      setData(prev => {
        const updateRoomMembers = (rooms: any[]) => rooms.map(room => ({
          ...room,
          members: stats[room.id]?.toString() || "0"
        }));

        return {
          ...prev,
          trendingRooms: updateRoomMembers(prev.trendingRooms),
          communityRooms: updateRoomMembers(prev.communityRooms),
        };
      });
    };

    socket.on("global-stats", handleGlobalStats);
    socket.on("global-user-activity", handleGlobalActivity);
    socket.on("global-rooms-stats", handleRoomsStats);

    return () => {
      socket.off("global-stats", handleGlobalStats);
      socket.off("global-user-activity", handleGlobalActivity);
      socket.off("global-rooms-stats", handleRoomsStats);
    };
  }, [socket, isConnected]);

  return (
    <main className="flex-1 min-h-0 flex flex-col xl:flex-row gap-8 p-4 md:p-8 overflow-y-auto w-full custom-scrollbar bg-transparent">
      <div className="flex-1 space-y-12">
        {/* Trending Section */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black flex items-center gap-4 tracking-tight">
                <span className="p-2.5 bg-orange-500/10 rounded-xl border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
                  <TrendingUp size={24} className="text-orange-500" />
                </span>
                Trending Rooms
              </h2>
              <p className="text-white/40 text-sm mt-2 ml-14 font-medium uppercase tracking-widest leading-none">Most active study groups right now</p>
            </div>
            <button className="text-xs font-black text-[#1337ec] uppercase tracking-widest px-4 py-2 bg-[#1337ec]/5 rounded-full border border-[#1337ec]/20 hover:bg-[#1337ec] hover:text-white transition-all">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.trendingRooms.length > 0 ? (
              data.trendingRooms.map((room: any, i: number) => (
                <div
                  key={room.id}
                  style={{ animationDelay: `${i * 100}ms` }}
                  className="animate-[fadeSlideUp_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0"
                >
                  <RoomCard room={room} />
                </div>
              ))
            ) : (
              <EmptyRoomsPlaceholder message="No trending rooms today." />
            )}
          </div>
        </section>

        {/* Section divider */}
        <div className="flex items-center gap-6 py-6 overflow-hidden">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span className="text-[10px] text-[#1337ec] font-black uppercase tracking-[0.5em] px-6 py-2.5 bg-[#1337ec]/5 rounded-full border border-[#1337ec]/10 backdrop-blur-xl shrink-0">
            Community Explorer
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Categories Section */}
        <section className="space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              Explore Categories
            </h2>
            <div className="flex bg-white/[0.03] rounded-xl p-1 border border-white/5 backdrop-blur-md">
              <button className="p-2 rounded-lg bg-[#1337ec] text-white shadow-lg shadow-[#1337ec]/20 transition-all">
                <LayoutGrid size={18} />
              </button>
              <button className="p-2 rounded-lg text-white/30 hover:text-white/60 transition-all">
                <List size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.communityRooms.length > 0 ? (
              <>
                {data.communityRooms.map((room: any, i: number) => (
                  <div
                    key={room.id}
                    style={{ animationDelay: `${(i + data.trendingRooms.length) * 80}ms` }}
                    className="animate-[fadeSlideUp_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0"
                  >
                    <RoomCategoryCard room={room} />
                  </div>
                ))}
                <div
                  style={{ animationDelay: `${(data.communityRooms.length + data.trendingRooms.length) * 80}ms` }}
                  className="animate-[fadeSlideUp_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0"
                >
                  <CreateRoomCard />
                </div>
              </>
            ) : (
              <EmptyRoomsPlaceholder message="Wait for more communities to sprout!" />
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
