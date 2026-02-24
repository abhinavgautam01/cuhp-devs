"use client";

import { useState } from "react";

export default function CSHubPage() {
  const [postText, setPostText] = useState("");
  const [activeTab, setActiveTab] = useState<"relevant" | "recent" | "debugging">("relevant");

  return (
    <div className="bg-[#0B0B0C] text-slate-100 min-h-screen flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0B0B0C] h-screen sticky top-0 flex flex-col shrink-0">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-[#1337ec] rounded-xl flex items-center justify-center shadow-lg shadow-[#1337ec]/20 shrink-0">
              <span className="material-icons-round text-white">terminal</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              CS<span className="text-[#1337ec]">Hub</span>
            </h1>
          </div>

          {/* Nav */}
          <nav className="space-y-2">
            {[
              { icon: "grid_view", label: "Dashboard", active: true },
              { icon: "psychology", label: "Practice", active: false },
              { icon: "groups", label: "Community", active: false },
              { icon: "auto_stories", label: "Resources", active: false },
            ].map(({ icon, label, active }) => (
              <a
                key={label}
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  active
                    ? "bg-[#1337ec]/10 text-[#1337ec] font-bold"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="material-icons-round">{icon}</span>
                <span>{label}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* User Footer */}
        <div className="mt-auto p-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <img
              alt="User"
              className="w-9 h-9 rounded-full object-cover border-2 border-[#1337ec]/30"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKeDES5v4wTyY_dGvn8RsNW8R2FTTE4ywEcV0_-CFK_7G1ACm0erQ8wU34EPJEvMW-kKAsRKimmU3XTQivuhknRFnWXt7XHGpoMlkUGHIRMM_sv6phnXy2nBpMvZkKi8LHnXT-D8MtB09_k2GrpezGvdkpaCZKvqU22ZbhuhtzVA7O5pR26MJp5DCOloh0QDJez8I7Z76IQQh5TjnEIUaF-L0NxyMgtmZV5yxZL5YUFwG23MwTwc6KmI6x0YSrAg7HWL9ReEU0ffKd"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">Alex Rivera</p>
              <p className="text-[10px] text-[#1337ec]">Junior Dev</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Nav */}
        <nav className="sticky top-0 z-50 border-b border-[#1337ec]/10 bg-[#0B0B0C]/80 backdrop-blur-md">
          <div className="px-8 h-16 flex items-center justify-between gap-8">
            <div className="flex items-center gap-8 text-sm font-medium">
              {[
                { icon: "dynamic_feed", label: "Feed", active: true },
                { icon: "group_work", label: "Study Groups", active: false },
                { icon: "bookmarks", label: "Saved Snippets", active: false },
              ].map(({ icon, label, active }) => (
                <a
                  key={label}
                  href="#"
                  className={`flex items-center gap-2 transition-colors ${
                    active ? "text-[#1337ec]" : "text-white/60 hover:text-white"
                  }`}
                >
                  <span className="material-icons-round text-[20px]">{icon}</span>
                  {label}
                </a>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1 max-w-xl">
              <div className="relative group">
                <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#1337ec] transition-colors">
                  search
                </span>
                <input
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-[#1337ec] focus:border-[#1337ec] transition-all placeholder:text-white/20 outline-none"
                  placeholder="Search for snippets, users or discussions..."
                  type="text"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-[#1337ec]/10 rounded-full transition-colors relative">
                <span className="material-icons-round">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0B0B0C]" />
              </button>
              <button className="p-2 hover:bg-[#1337ec]/10 rounded-full transition-colors">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Main */}
        <main className="flex-1 flex gap-8 p-8 overflow-y-auto">
          {/* Feed */}
          <section className="flex-1 space-y-6 max-w-3xl">
            {/* Compose */}
            <div className="bg-[#161618] rounded-xl border border-[#1337ec]/10 overflow-hidden">
              <div className="p-4">
                <div className="flex gap-4">
                  <img
                    alt="User avatar"
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_MRocfAc3G7cAcAopZxpRTMMkXNFumYLVw-XomndRyV5EcHVrdD65-55rfGYIg9iKQQutDwr02e3qB7zJ9OzKXwQupZ5tFbqDUnYYubfQ4T-T2FIrp9YJehyWAr-3jJa7sbeGZLm54o6NJ1kDiI6bx7ji575hLuMPxdcC2Z6qUj2gEqH50i5Org4eFRMTWk1yUi6iI0bRhR7pUdJEd7x1RRkuVu5wrK5eWw_cCaf5vvoRzSSRupJ-qD87iz1dVtL0uKo5B85b2dmr"
                  />
                  <textarea
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 text-lg placeholder:text-white/30 resize-none h-20 font-sans outline-none"
                    placeholder="Share a snippet, ask a question, or celebrate a win..."
                  />
                </div>
              </div>
              <div className="px-4 py-3 bg-white/5 flex items-center justify-between">
                <div className="flex gap-2">
                  {[
                    { icon: "code", color: "text-blue-400", label: "Snippet" },
                    { icon: "help_outline", color: "text-[#8b5cf6]", label: "Question" },
                    { icon: "emoji_events", color: "text-yellow-500", label: "Win" },
                  ].map(({ icon, color, label }) => (
                    <button
                      key={label}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-white/5 text-sm font-medium transition-colors"
                    >
                      <span className={`material-icons-round ${color} text-[18px]`}>{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>
                <button className="bg-[#1337ec] hover:bg-[#1337ec]/90 text-white px-6 py-1.5 rounded-lg font-bold text-sm shadow-lg shadow-[#1337ec]/20 transition-transform active:scale-95">
                  Post
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-[#1337ec]/10 pb-1">
              {(["relevant", "recent", "debugging"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium text-sm transition-colors capitalize ${
                    activeTab === tab
                      ? "text-[#1337ec] border-b-2 border-[#1337ec] font-bold"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Post: Code Snippet */}
            <article className="bg-[#161618] rounded-xl border border-[#1337ec]/10 overflow-hidden">
              <div className="p-4 flex gap-4">
                <img
                  alt="Sarah Jenkins"
                  className="w-10 h-10 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAes5h4fmh72X8ydxiowrLL-ybzOL38IODt3PqyfCRPSo-ARtBXANbfbKzMb-bN7y3CFm5AxwBoPDb-R7_UJFcDB1Z_mh4iADbuaLxu1R7QfXupK-do-lkCAvWnI2h6LCQ_0kHPFRm-ybbZiBJ2who5yOndYpLqUkFm4xBNOsZc5ZW0XhNw_t2DXhtQ2_e7VdFEvsrI2kplh3Kgp5GkNs3xDPfIKOGP2zPKGo0qtltg8J-4YM3WUDqkJujrv748MIRE6mCRuI_qD5G4"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-sm">Sarah Jenkins</h4>
                    <span className="text-xs text-white/40">• 2h ago</span>
                    <span className="ml-auto flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded">
                      Snippet
                    </span>
                  </div>
                  <p className="text-sm mb-4">
                    Just optimized my binary search tree traversal. Check out this cleaner way to handle recursive cases! 🚀
                  </p>
                  <div className="bg-black/40 rounded-lg p-4 mb-4 border border-white/5 relative group">
                    <pre className="font-mono text-xs leading-relaxed overflow-x-auto">
                      <span className="text-[#8b5cf6]">function</span>{" "}
                      <span className="text-blue-400">traverse</span>(node) {"{"}
                      {"\n  "}
                      <span className="text-[#8b5cf6]">if</span> (!node){" "}
                      <span className="text-[#8b5cf6]">return</span>;{"\n  "}
                      <span className="text-slate-500">// Process left child first</span>
                      {"\n  "}traverse(node.left);{"\n  "}
                      <span className="text-[#10b981]">console</span>.log(node.value);{"\n  "}
                      <span className="text-slate-500">// Then process right</span>
                      {"\n  "}traverse(node.right);{"\n}"}
                    </pre>
                    <button className="absolute top-2 right-2 p-1.5 bg-white/5 hover:bg-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-icons-round text-sm">content_copy</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-6 border-t border-white/5 pt-4">
                    <button className="flex items-center gap-2 text-white/60 hover:text-[#1337ec] transition-colors group">
                      <span className="material-icons-round text-[20px] group-active:scale-125 transition-transform">
                        thumb_up
                      </span>
                      <span className="text-xs font-bold">142</span>
                    </button>
                    <button className="flex items-center gap-2 text-white/60 hover:text-[#8b5cf6] transition-colors">
                      <span className="material-icons-round text-[20px]">chat_bubble_outline</span>
                      <span className="text-xs font-bold">24</span>
                    </button>
                    <button className="flex items-center gap-2 text-white/60 hover:text-[#10b981] transition-colors group">
                      <span className="material-icons-round text-[20px] group-hover:rotate-12 transition-transform">
                        bug_report
                      </span>
                      <span className="text-xs font-bold">Debug</span>
                    </button>
                    <div className="ml-auto">
                      <span className="material-icons-round text-white/30 cursor-pointer hover:text-white">
                        more_horiz
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Post: Win */}
            <article className="bg-[#161618] rounded-xl border border-[#1337ec]/10 overflow-hidden">
              <div className="p-4 flex gap-4">
                <img
                  alt="Emily Chen"
                  className="w-10 h-10 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiHXl0P06fpJnbhQctvcP96mrHRjEHG_v5CCxmj1EesAwjaLDW7psQM_Qs9fuwyz59btEc9Avof9pJuR0ZXeBznXEQsE4sWcCMcd5mWt7C_HTvvQcGT_wqQkFD1Vq58M_SRSbFWUuSTuM-7Gs8DrYf5FlHS5f4--8cY6WgUVy2gLF2LplRYIppQloKsxbArJ6NE3FKC3nf0vUibSHrJUR5lh7ZlcWXF4IQXYS1KxNpXecFAycr3WcuPWjuGQ5MrQjK4aHHHBRZKLoi"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-sm">Emily Chen</h4>
                    <span className="text-xs text-white/40">• 5h ago</span>
                    <span className="ml-auto flex items-center gap-1 px-2 py-0.5 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase tracking-wider rounded">
                      Win
                    </span>
                  </div>
                  <p className="text-sm mb-4">
                    Finally landed the Summer SWE Intern role at a top fintech firm! 💳 Thanks everyone for the help!
                  </p>
                  <div className="rounded-lg overflow-hidden border border-white/5 mb-4">
                    <img
                      alt="Celebration"
                      className="w-full aspect-video object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiVRIzUad66d9ef4seusla2H8r0wawxNaTwkt8Lv3nGBo45XkHsryONe_eIoecB0DNcKnz99p_MU91D5aJcfbKLbNpHupf77TX3oW10irkz60K9L9wD3TUV1pP1tnTVgm2kSka_es_xUQzl4zdEFn4Y4W-r4yLjyAZQXLjDUZvstM9KHLDAg-wLIyqI__mDXFXKPvfxGAm8U-lmNHjIGL7l3F7rZFfoY1lsBelc5MQWIfk2lIbMWrMOm6a6vwkBlCD2o-85dqEGlGx"
                    />
                  </div>
                  <div className="flex items-center gap-6 border-t border-white/5 pt-4">
                    <button className="flex items-center gap-2 text-white/60 hover:text-[#1337ec] transition-colors group">
                      <span className="material-icons-round text-[20px] group-active:scale-125 transition-transform">
                        thumb_up
                      </span>
                      <span className="text-xs font-bold">892</span>
                    </button>
                    <button className="flex items-center gap-2 text-white/60 hover:text-[#8b5cf6] transition-colors">
                      <span className="material-icons-round text-[20px]">chat_bubble_outline</span>
                      <span className="text-xs font-bold">156</span>
                    </button>
                    <button className="flex items-center gap-2 text-white/60 hover:text-[#10b981] transition-colors group">
                      <span className="material-icons-round text-[20px] group-hover:rotate-12 transition-transform">
                        bug_report
                      </span>
                      <span className="text-xs font-bold">Debug</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </section>

          {/* Right Sidebar */}
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
                {[
                  {
                    rank: 1,
                    rankColor: "bg-yellow-500",
                    name: "Marcus Zhao",
                    streak: "🔥 42 day streak",
                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfpcVKWjO4AEFrvRQbTlN2oFj7Cg9JZIGigtJzhKAjVEVG4qtYijisaj3cfaD0tJ23nms7jQi3WiRtD-WrjQZp8Cb9oRV1f7TOWJoXypeK5IFQL6HgIcoflooNNfDvsjFRiLCMNTQ8ftdkBYmoznaZQizRJGzXc9gsvfnW_X7OziwtMw6_WlfcaiDyHLWTrZXkDUwWiz_BWN5femIxz4bnoGrtD9e5qdcAsJ3XZek9lMAh2GE7wSCJ6SLaJG6iqFopyOsBtPfmp4Yy",
                    badges: ["pest_control", "military_tech"],
                    badgeColors: ["text-blue-400", "text-yellow-500"],
                  },
                  {
                    rank: 2,
                    rankColor: "bg-slate-400",
                    name: "Lena Schmidt",
                    streak: "🔥 28 day streak",
                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_dN-P2YZa5kDQqH7CYbZO5NGTikg84BA26wobBYF0FIiC0gEtBILB2A1JXSvMhQ5zxEYAZrgJp4vGQF0KeAOnxbwRzAc7qjqDqPzRNt2i9gK2Zdc1lPfAXls80p3RcoC0VeAZFrtq40z1TN2CGkYK4SVDSqgtGD4pmudN227jpEHQSBUFxhFhmRqHMjMqsuFI9uWWQ7LkucLSxrxhuU2KyvQF4E7grbt8WRkc0zbRCBsmnQ-FP12G1aSn484wh84bbG6_GCdv2MMN",
                    badges: ["school"],
                    badgeColors: ["text-[#8b5cf6]"],
                  },
                ].map(({ rank, rankColor, name, streak, src, badges, badgeColors }) => (
                  <div key={name} className="flex items-center gap-3">
                    <div className="relative">
                      <img alt={name} className="w-10 h-10 rounded-lg object-cover" src={src} />
                      <div
                        className={`absolute -top-2 -left-2 w-5 h-5 ${rankColor} rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-[#161618] text-black`}
                      >
                        {rank}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold leading-tight">{name}</p>
                      <p className="text-xs text-white/40">{streak}</p>
                    </div>
                    <div className="flex gap-1">
                      {badges.map((badge, i) => (
                        <span key={badge} className={`material-icons-round ${badgeColors[i]} text-sm`}>
                          {badge}
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
                {["#javascript", "#rust", "#algorithms", "#internship", "#react_tips", "#python"].map((tag) => (
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
                {[
                  { month: "Nov", day: "12", title: "Mock Interview Night", time: "6:00 PM • CS Hall" },
                  { month: "Nov", day: "15", title: "Rust Workshop", time: "4:30 PM • Zoom" },
                ].map(({ month, day, title, time }) => (
                  <div key={title} className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1337ec]/10 flex flex-col items-center justify-center text-[#1337ec]">
                      <span className="text-[10px] font-bold uppercase leading-none">{month}</span>
                      <span className="text-sm font-bold leading-none">{day}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-tight">{title}</p>
                      <p className="text-xs text-white/40">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </main>
      </div>

      {/* FAB for mobile */}
      <button className="fixed bottom-6 right-6 lg:hidden w-14 h-14 bg-[#1337ec] rounded-full shadow-2xl flex items-center justify-center text-white">
        <span className="material-icons-round">edit</span>
      </button>
    </div>
  );
}