"use client";

import { useState } from "react";

const trendingRooms = [
  {
    id: 1,
    title: "Deep Learning Mastery",
    description: "Discussing PyTorch, TensorFlow and Neural Network architectures.",
    badge: "Hot Room",
    badgeBg: "bg-[#1337ec]/30",
    cardBg: "from-[#1337ec]/20 to-[#161618]",
    borderColor: "border-[#1337ec]/20 hover:border-[#1337ec]/40",
    iconBg: "bg-[#1337ec]/20",
    iconColor: "text-[#1337ec]",
    icon: "neurology",
    members: "2.1k",
    btnBg: "bg-[#1337ec] shadow-[#1337ec]/20",
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_MRocfAc3G7cAcAopZxpRTMMkXNFumYLVw-XomndRyV5EcHVrdD65-55rfGYIg9iKQQutDwr02e3qB7zJ9OzKXwQupZ5tFbqDUnYYubfQ4T-T2FIrp9YJehyWAr-3jJa7sbeGZLm54o6NJ1kDiI6bx7ji575hLuMPxdcC2Z6qUj2gEqH50i5Org4eFRMTWk1yUi6iI0bRhR7pUdJEd7x1RRkuVu5wrK5eWw_cCaf5vvoRzSSRupJ-qD87iz1dVtL0uKo5B85b2dmr",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAes5h4fmh72X8ydxiowrLL-ybzOL38IODt3PqyfCRPSo-ARtBXANbfbKzMb-bN7y3CFm5AxwBoPDb-R7_UJFcDB1Z_mh4iADbuaLxu1R7QfXupK-do-lkCAvWnI2h6LCQ_0kHPFRm-ybbZiBJ2who5yOndYpLqUkFm4xBNOsZc5ZW0XhNw_t2DXhtQ2_e7VdFEvsrI2kplh3Kgp5GkNs3xDPfIKOGP2zPKGo0qtltg8J-4YM3WUDqkJujrv748MIRE6mCRuI_qD5G4",
    ],
    extra: "+42",
    extraBg: "bg-[#1337ec]/40",
  },
  {
    id: 2,
    title: "Rust Systems Dev",
    description: "Memory safety, ownership, and low-level optimization in Rust.",
    badge: "Featured",
    badgeBg: "bg-[#8b5cf6]/30",
    cardBg: "from-[#8b5cf6]/10 to-[#161618]",
    borderColor: "border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40",
    iconBg: "bg-[#8b5cf6]/20",
    iconColor: "text-[#8b5cf6]",
    icon: "data_object",
    members: "890",
    btnBg: "bg-[#8b5cf6] shadow-[#8b5cf6]/20",
    avatars: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBiHXl0P06fpJnbhQctvcP96mrHRjEHG_v5CCxmj1EesAwjaLDW7psQM_Qs9fuwyz59btEc9Avof9pJuR0ZXeBznXEQsE4sWcCMcd5mWt7C_HTvvQcGT_wqQkFD1Vq58M_SRSbFWUuSTuM-7Gs8DrYf5FlHS5f4--8cY6WgUVy2gLF2LplRYIppQloKsxbArJ6NE3FKC3nf0vUibSHrJUR5lh7ZlcWXF4IQXYS1KxNpXecFAycr3WcuPWjuGQ5MrQjK4aHHHBRZKLoi",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfpcVKWjO4AEFrvRQbTlN2oFj7Cg9JZIGigtJzhKAjVEVG4qtYijisaj3cfaD0tJ23nms7jQi3WiRtD-WrjQZp8Cb9oRV1f7TOWJoXypeK5IFQL6HgIcoflooNNfDvsjFRiLCMNTQ8ftdkBYmoznaZQizRJGzXc9gsvfnW_X7OziwtMw6_WlfcaiDyHLWTrZXkDUwWiz_BWN5femIxz4bnoGrtD9e5qdcAsJ3XZek9lMAh2GE7wSCJ6SLaJG6iqFopyOsBtPfmp4Yy",
    ],
    extra: "+18",
    extraBg: "bg-[#8b5cf6]/40",
  },
];

const communityRooms = [
  {
    id: 1,
    title: "Machine Learning",
    description: "Exploring algorithms, predictive modeling, and data science essentials.",
    icon: "smart_toy",
    iconColor: "text-[#00f3ff]",
    members: "1.2k",
    contributor: "@zhao_dev",
    contributorImg:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfpcVKWjO4AEFrvRQbTlN2oFj7Cg9JZIGigtJzhKAjVEVG4qtYijisaj3cfaD0tJ23nms7jQi3WiRtD-WrjQZp8Cb9oRV1f7TOWJoXypeK5IFQL6HgIcoflooNNfDvsjFRiLCMNTQ8ftdkBYmoznaZQizRJGzXc9gsvfnW_X7OziwtMw6_WlfcaiDyHLWTrZXkDUwWiz_BWN5femIxz4bnoGrtD9e5qdcAsJ3XZek9lMAh2GE7wSCJ6SLaJG6iqFopyOsBtPfmp4Yy",
  },
  {
    id: 2,
    title: "Blockchain Tech",
    description: "Smart contracts, DeFi, and decentralized systems architecture.",
    icon: "hub",
    iconColor: "text-[#10b981]",
    members: "450",
    contributor: "@lena_s",
    contributorImg:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_dN-P2YZa5kDQqH7CYbZO5NGTikg84BA26wobBYF0FIiC0gEtBILB2A1JXSvMhQ5zxEYAZrgJp4vGQF0KeAOnxbwRzAc7qjqDqPzRNt2i9gK2Zdc1lPfAXls80p3RcoC0VeAZFrtq40z1TN2CGkYK4SVDSqgtGD4pmudN227jpEHQSBUFxhFhmRqHMjMqsuFI9uWWQ7LkucLSxrxhuU2KyvQF4E7grbt8WRkc0zbRCBsmnQ-FP12G1aSn484wh84bbG6_GCdv2MMN",
  },
  {
    id: 3,
    title: "System Design",
    description: "Scaling applications, microservices, and load balancing strategies.",
    icon: "memory",
    iconColor: "text-yellow-500",
    members: "3.4k",
    contributor: "@jordan_s",
    contributorImg:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaIBKpUPd1LImvLviZ_v-OwdJ52LuFs70EIaQMH2Q0V3MiRoA6O7WSK6bpTVghbpdtp84OZxH1wsklugWi-yJVGqeaF6TOU_KoWrbATdlqFMlgnJ1rlk3fm-44vF_rup-VAjKAxyrPUpPY1ZeRgapQsit0Ts7NnvWCYE9shw_sfPKMAPe4BdMDXZyj4p62Hs0syDS_9ThymO88W6zVXFozN1sjiVdXPwI1MKVZrPwEH0AxqhOIELlKZeTmjvjSBGhsI5B1oLbXQ3PL",
  },
  {
    id: 4,
    title: "Web Ecosystem",
    description: "Modern frontend frameworks, performance, and server-side JS.",
    icon: "javascript",
    iconColor: "text-[#8b5cf6]",
    members: "5.1k",
    contributor: "@sarah_j",
    contributorImg:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAes5h4fmh72X8ydxiowrLL-ybzOL38IODt3PqyfCRPSo-ARtBXANbfbKzMb-bN7y3CFm5AxwBoPDb-R7_UJFcDB1Z_mh4iADbuaLxu1R7QfXupK-do-lkCAvWnI2h6LCQ_0kHPFRm-ybbZiBJ2who5yOndYpLqUkFm4xBNOsZc5ZW0XhNw_t2DXhtQ2_e7VdFEvsrI2kplh3Kgp5GkNs3xDPfIKOGP2zPKGo0qtltg8J-4YM3WUDqkJujrv748MIRE6mCRuI_qD5G4",
  },
  {
    id: 5,
    title: "Cybersecurity",
    description: "Penetration testing, encryption, and network security protocols.",
    icon: "shield_lock",
    iconColor: "text-red-500",
    members: "672",
    contributor: "@cyber_alex",
    contributorImg:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKeDES5v4wTyY_dGvn8RsNW8R2FTTE4ywEcV0_-CFK_7G1ACm0erQ8wU34EPJEvMW-kKAsRKimmU3XTQivuhknRFnWXt7XHGpoMlkUGHIRMM_sv6phnXy2nBpMvZkKi8LHnXT-D8MtB09_k2GrpezGvdkpaCZKvqU22ZbhuhtzVA7O5pR26MJp5DCOloh0QDJez8I7Z76IQQh5TjnEIUaF-L0NxyMgtmZV5yxZL5YUFwG23MwTwc6KmI6x0YSrAg7HWL9ReEU0ffKd",
  },
];

const communityMasters = [
  {
    name: "Marcus Zhao",
    subtitle: "ML Expert • 42 streak",
    subtitleColor: "text-[#10b981]",
    rank: "Top",
    rankColor: "text-[#1337ec]",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfpcVKWjO4AEFrvRQbTlN2oFj7Cg9JZIGigtJzhKAjVEVG4qtYijisaj3cfaD0tJ23nms7jQi3WiRtD-WrjQZp8Cb9oRV1f7TOWJoXypeK5IFQL6HgIcoflooNNfDvsjFRiLCMNTQ8ftdkBYmoznaZQizRJGzXc9gsvfnW_X7OziwtMw6_WlfcaiDyHLWTrZXkDUwWiz_BWN5femIxz4bnoGrtD9e5qdcAsJ3XZek9lMAh2GE7wSCJ6SLaJG6iqFopyOsBtPfmp4Yy",
  },
  {
    name: "Lena Schmidt",
    subtitle: "Web3 Guru • 28 streak",
    subtitleColor: "text-[#8b5cf6]",
    rank: "#2",
    rankColor: "text-slate-500",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_dN-P2YZa5kDQqH7CYbZO5NGTikg84BA26wobBYF0FIiC0gEtBILB2A1JXSvMhQ5zxEYAZrgJp4vGQF0KeAOnxbwRzAc7qjqDqPzRNt2i9gK2Zdc1lPfAXls80p3RcoC0VeAZFrtq40z1TN2CGkYK4SVDSqgtGD4pmudN227jpEHQSBUFxhFhmRqHMjMqsuFI9uWWQ7LkucLSxrxhuU2KyvQF4E7grbt8WRkc0zbRCBsmnQ-FP12G1aSn484wh84bbG6_GCdv2MMN",
  },
];

const liveActivity = [
  {
    dotColor: "bg-[#10b981]",
    text: (
      <>
        <span className="font-bold">Sarah Jenkins</span> joined{" "}
        <span className="text-[#1337ec] font-medium">Rust Systems Dev</span>
      </>
    ),
    time: "2 mins ago",
  },
  {
    dotColor: "bg-[#1337ec]",
    text: (
      <>
        <span className="font-bold">Emily Chen</span> shared a paper in{" "}
        <span className="text-[#1337ec] font-medium">Deep Learning</span>
      </>
    ),
    time: "14 mins ago",
  },
];

export default function StudyGroupsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="bg-[#0B0B0C] text-slate-100 min-h-screen flex flex-col font-sans">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 border-b border-[#1337ec]/10 bg-[#0B0B0C]/80 backdrop-blur-md">
        <div className="max-w-400 mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-12">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1337ec] rounded-xl flex items-center justify-center shadow-lg shadow-[#1337ec]/20">
                <span className="material-icons-round text-white">sync</span>
              </div>
              <h1 className="text-xl font-bold tracking-tight">
                Dev<span className="text-[#1337ec]">Sync</span>
              </h1>
            </div>
            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#" className="hover:text-[#1337ec] transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">feed</span> Feed
              </a>
              <a href="#" className="text-[#1337ec] flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">groups</span> Study Groups
              </a>
              <a href="#" className="hover:text-[#1337ec] transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">bookmark</span> Saved Snippets
              </a>
            </div>
          </div>

          {/* Search + Icons */}
          <div className="flex items-center gap-6 flex-1 max-w-md ml-auto">
            <div className="relative w-full">
              <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                search
              </span>
              <input
                className="w-full bg-[#161618]/50 border border-[#1337ec]/20 rounded-lg py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#1337ec]/50 transition-all"
                placeholder="Search resources, rooms, or code..."
                type="text"
              />
            </div>
            <button className="p-2 hover:bg-[#1337ec]/10 rounded-full transition-colors relative">
              <span className="material-icons-round">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B0B0C]" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-400 mx-auto px-6 flex gap-8 flex-1">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 py-8 h-[calc(100vh-64px)] sticky top-16">
          <div className="space-y-6 flex-1">
            {/* Nav */}
            <div className="bg-[#161618]/40 p-4 rounded-xl border border-[#1337ec]/10">
              <nav className="space-y-1.5">
                {[
                  { icon: "dashboard", label: "Dashboard", active: false },
                  { icon: "code", label: "Practice", active: false },
                  { icon: "forum", label: "Community", active: true },
                  { icon: "library_books", label: "Resources", active: false },
                ].map(({ icon, label, active }) => (
                  <button
                    key={label}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all text-sm ${
                      active
                        ? "bg-[#1337ec]/10 text-[#1337ec] font-medium"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">{icon}</span>
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Categories */}
            <div className="bg-[#161618]/40 p-5 rounded-xl border border-[#1337ec]/10">
              <h3 className="text-xs font-bold text-[#1337ec] uppercase tracking-widest mb-6 flex items-center justify-between">
                Categories
                <span className="material-icons-round text-sm">tune</span>
              </h3>
              <nav className="space-y-2">
                <button className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[#1337ec]/5 text-slate-300 text-sm hover:text-white transition-all">
                  <span className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">all_inclusive</span> All Rooms
                  </span>
                  <span className="text-[10px] bg-[#1337ec]/20 px-1.5 py-0.5 rounded">24</span>
                </button>
                <button className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-white text-sm">
                  <span className="material-symbols-outlined text-[20px]">psychology</span> AI / ML
                </button>
                <button className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-white text-sm">
                  <span className="material-symbols-outlined text-[20px]">settings_ethernet</span> Systems
                </button>
              </nav>
            </div>
          </div>

          {/* User */}
          <div className="mt-auto pt-6 border-t border-[#1337ec]/10">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
              <img
                alt="User profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#1337ec]/30 group-hover:border-[#1337ec]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKeDES5v4wTyY_dGvn8RsNW8R2FTTE4ywEcV0_-CFK_7G1ACm0erQ8wU34EPJEvMW-kKAsRKimmU3XTQivuhknRFnWXt7XHGpoMlkUGHIRMM_sv6phnXy2nBpMvZkKi8LHnXT-D8MtB09_k2GrpezGvdkpaCZKvqU22ZbhuhtzVA7O5pR26MJp5DCOloh0QDJez8I7Z76IQQh5TjnEIUaF-L0NxyMgtmZV5yxZL5YUFwG23MwTwc6KmI6x0YSrAg7HWL9ReEU0ffKd"
              />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate">Alex Rivera</p>
                <p className="text-[11px] text-[#1337ec] truncate">Junior Developer</p>
              </div>
              <span className="material-icons-round text-slate-500 group-hover:text-white transition-colors">
                settings
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 py-8 space-y-8 min-w-0">
          {/* Trending Rooms */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="material-icons-round text-orange-500">trending_up</span>
                Trending Rooms
              </h2>
              <button className="text-sm font-bold text-[#1337ec] hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trendingRooms.map((room) => (
                <div
                  key={room.id}
                  className={`relative group overflow-hidden rounded-2xl border ${room.borderColor} bg-linear-to-br ${room.cardBg} p-6 transition-all`}
                >
                  <div className="absolute top-0 right-0 p-4">
                    <span
                      className={`flex items-center gap-1 px-2 py-1 ${room.badgeBg} rounded-full text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-md`}
                    >
                      {room.badge}
                    </span>
                  </div>
                  <div className="flex gap-5 items-start">
                    <div
                      className={`w-14 h-14 rounded-xl ${room.iconBg} flex items-center justify-center ${room.iconColor} shadow-inner`}
                    >
                      <span className="material-symbols-outlined text-4xl">{room.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{room.title}</h3>
                      <p className="text-sm text-slate-400 mb-4">{room.description}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          {room.avatars.map((src, i) => (
                            <img
                              key={i}
                              alt="Member"
                              className="w-6 h-6 rounded-full border-2 border-[#0B0B0C]"
                              src={src}
                            />
                          ))}
                          <div
                            className={`w-6 h-6 rounded-full ${room.extraBg} border-2 border-[#0B0B0C] flex items-center justify-center text-[8px] font-bold`}
                          >
                            {room.extra}
                          </div>
                        </div>
                        <span className="text-xs font-medium text-slate-500">{room.members} Members</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className={`mt-6 w-full py-2.5 ${room.btnBg} rounded-lg font-bold text-sm shadow-lg transition-transform active:scale-95`}
                  >
                    Enter Room
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Community Rooms */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">Community Rooms</h2>
              <div className="flex bg-[#161618] rounded-lg p-1 border border-[#1337ec]/10">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === "grid" ? "bg-[#1337ec]/20 text-[#1337ec]" : "text-slate-500 hover:text-white"
                  }`}
                >
                  <span className="material-icons-round text-sm">grid_view</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === "list" ? "bg-[#1337ec]/20 text-[#1337ec]" : "text-slate-500 hover:text-white"
                  }`}
                >
                  <span className="material-icons-round text-sm">view_list</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {communityRooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-[#161618] rounded-2xl border border-[#1337ec]/5 p-5 flex flex-col hover:border-[#1337ec]/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${room.iconColor} group-hover:scale-110 transition-transform`}
                    >
                      <span className="material-symbols-outlined text-3xl">{room.icon}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 uppercase tracking-tighter mb-1">Top Contributor</p>
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-xs font-bold">{room.contributor}</span>
                        <img
                          alt="Contributor"
                          className="w-6 h-6 rounded-full object-cover border border-[#1337ec]/20"
                          src={room.contributorImg}
                        />
                      </div>
                    </div>
                  </div>
                  <h4 className="font-bold text-lg mb-1">{room.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-6">{room.description}</p>
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1337ec] flex items-center gap-1">
                      <span className="material-icons-round text-xs">group</span> {room.members}
                    </span>
                    <button className="px-4 py-1.5 rounded-lg border border-[#1337ec]/30 hover:bg-[#1337ec] hover:border-[#1337ec] text-xs font-bold transition-all">
                      Join Room
                    </button>
                  </div>
                </div>
              ))}

              {/* Create Room Card */}
              <div className="bg-[#161618]/30 rounded-2xl border border-dashed border-white/10 p-5 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center text-white/30 mb-4">
                  <span className="material-icons-round">add</span>
                </div>
                <h4 className="font-bold text-slate-300">Start a New Room</h4>
                <p className="text-xs text-slate-500 max-w-35 mt-1">
                  Can&apos;t find a topic? Create your own study group.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-80 shrink-0 space-y-6 py-8">
          {/* Community Masters */}
          <div className="bg-[#161618] rounded-xl border border-[#1337ec]/10 overflow-hidden">
            <div className="p-4 bg-[#1337ec]/10 border-b border-[#1337ec]/20 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <span className="material-icons-round text-yellow-500">military_tech</span>
                Community Masters
              </h3>
            </div>
            <div className="p-4 space-y-4">
              {communityMasters.map((master) => (
                <div key={master.name} className="flex items-center gap-3">
                  <img
                    alt={master.name}
                    className="w-8 h-8 rounded-lg object-cover"
                    src={master.img}
                  />
                  <div className="flex-1">
                    <p className="text-xs font-bold">{master.name}</p>
                    <p className={`text-[10px] ${master.subtitleColor}`}>{master.subtitle}</p>
                  </div>
                  <span className={`text-[10px] font-bold ${master.rankColor}`}>{master.rank}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Activity */}
          <div className="bg-[#161618] rounded-xl border border-[#1337ec]/10 p-4">
            <h3 className="font-bold text-sm mb-4">Live Activity</h3>
            <div className="space-y-4">
              {liveActivity.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className={`w-2 h-2 rounded-full ${item.dotColor} mt-1.5 shrink-0`} />
                  <div>
                    <p className="text-xs leading-tight">{item.text}</p>
                    <p className="text-[10px] text-slate-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile FAB */}
      <button className="fixed bottom-6 right-6 lg:hidden w-14 h-14 bg-[#1337ec] rounded-full shadow-2xl flex items-center justify-center text-white z-50">
        <span className="material-icons-round">add</span>
      </button>
    </div>
  );
}