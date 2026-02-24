"use client";

import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Tag {
  label: string;
  color: string;
  bg: string;
  border: string;
}

interface Snippet {
  id: number;
  title: string;
  language: string;
  code: JSX.Element;
  tags: Tag[];
  updated: string;
  collection: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const snippets: Snippet[] = [
  {
    id: 1,
    title: "Efficient QuickSort Impl",
    language: "Python",
    code: (
      <>
        <span className="text-[#ff79c6]">def</span>{" "}
        <span className="text-[#50fa7b]">quick_sort</span>(arr):{"\n"}
        {"    "}
        <span className="text-[#ff79c6]">if</span> len(arr) &lt;={" "}
        <span className="text-[#ffb86c]">1</span>:{"\n"}
        {"        "}
        <span className="text-[#ff79c6]">return</span> arr{"\n"}
        {"    "}pivot = arr[len(arr) //{" "}
        <span className="text-[#ffb86c]">2</span>]{"\n"}
        {"    "}left = [x <span className="text-[#ff79c6]">for</span> x{" "}
        <span className="text-[#ff79c6]">in</span> arr{" "}
        <span className="text-[#ff79c6]">if</span> x &lt; pivot]{"\n"}
        {"    "}middle = [x <span className="text-[#ff79c6]">for</span> x{" "}
        <span className="text-[#ff79c6]">in</span> arr{" "}
        <span className="text-[#ff79c6]">if</span> x == pivot]{"\n"}
        {"    "}right = [x <span className="text-[#ff79c6]">for</span> x{" "}
        <span className="text-[#ff79c6]">in</span> arr{" "}
        <span className="text-[#ff79c6]">if</span> x &gt; pivot]{"\n"}
        {"    "}
        <span className="text-[#ff79c6]">return</span> quick_sort(left) + middle + quick_sort(right){"\n"}
        <span className="text-[#6272a4]"># Optimized sorting algorithm</span>
      </>
    ),
    tags: [
      { label: "#Python", color: "text-[#1337ec]", bg: "bg-[#1337ec]/10", border: "border-[#1337ec]/20" },
      { label: "#DSA", color: "text-[#8b5cf6]", bg: "bg-[#8b5cf6]/10", border: "border-[#8b5cf6]/20" },
      { label: "#Algorithms", color: "text-slate-400", bg: "bg-white/5", border: "border-white/10" },
    ],
    updated: "Updated 2h ago",
    collection: "Interview Prep",
  },
  {
    id: 2,
    title: "Local Storage Custom Hook",
    language: "React",
    code: (
      <>
        <span className="text-[#ff79c6]">const</span>{" "}
        <span className="text-[#50fa7b]">useLocalStorage</span> = (key, initialValue) =&gt; {"{"}
        {"\n  "}
        <span className="text-[#ff79c6]">const</span> [storedValue, setStoredValue] = useState(() =&gt; {"{"}
        {"\n    "}
        <span className="text-[#ff79c6]">try</span> {"{"}
        {"\n      "}
        <span className="text-[#ff79c6]">const</span> item = window.localStorage.getItem(key);{"\n      "}
        <span className="text-[#ff79c6]">return</span> item ? JSON.parse(item) : initialValue;{"\n    "}
        {"}"} <span className="text-[#ff79c6]">catch</span> (error) {"{"}
        {"\n      "}
        <span className="text-[#ff79c6]">return</span> initialValue;{"\n    "}
        {"}"}{"\n  "}
        {"}"});{"\n  "}
        <span className="text-[#ff79c6]">return</span> [storedValue, setStoredValue];{"\n"}
        {"}"};
      </>
    ),
    tags: [
      { label: "#React", color: "text-[#10b981]", bg: "bg-[#10b981]/10", border: "border-[#10b981]/20" },
      { label: "#Hooks", color: "text-[#00f3ff]", bg: "bg-[#00f3ff]/10", border: "border-[#00f3ff]/20" },
      { label: "#Utils", color: "text-slate-400", bg: "bg-white/5", border: "border-white/10" },
    ],
    updated: "Updated yesterday",
    collection: "Project X Utils",
  },
  {
    id: 3,
    title: "Generic API Fetch Wrapper",
    language: "TypeScript",
    code: (
      <>
        <span className="text-[#ff79c6]">interface</span>{" "}
        <span className="text-[#50fa7b]">ApiResponse</span>&lt;T&gt; {"{"}
        {"\n  "}data: T;{"\n  "}status: <span className="text-[#ff79c6]">number</span>;{"\n  "}message:{" "}
        <span className="text-[#ff79c6]">string</span>;{"\n"}
        {"}"}{"\n"}
        <span className="text-[#ff79c6]">async function</span>{" "}
        <span className="text-[#50fa7b]">fetchData</span>&lt;T&gt;(url:{" "}
        <span className="text-[#ff79c6]">string</span>):{"\n  "}Promise&lt;ApiResponse&lt;T&gt;&gt; {"{"}
        {"\n  "}
        <span className="text-[#ff79c6]">const</span> res = <span className="text-[#ff79c6]">await</span> fetch(url);
        {"\n  "}
        <span className="text-[#ff79c6]">return</span> res.json();{"\n"}
        {"}"}
      </>
    ),
    tags: [
      { label: "#TypeScript", color: "text-[#1337ec]", bg: "bg-[#1337ec]/10", border: "border-[#1337ec]/20" },
      { label: "#API", color: "text-slate-400", bg: "bg-white/5", border: "border-white/10" },
    ],
    updated: "Oct 12, 2023",
    collection: "Shared Boilerplate",
  },
];

const collections = [
  { label: "All Snippets", icon: "folder", iconColor: "text-[#1337ec]", count: 42, active: true },
  { label: "Interview Prep", icon: "folder", iconColor: "text-slate-400", count: 12, active: false },
  { label: "Project X Utils", icon: "folder", iconColor: "text-slate-400", count: 8, active: false },
  { label: "Favorites", icon: "star", iconColor: "text-[#10b981]", count: 5, active: false },
];

const recentTags = ["#Python", "#React", "#DSA", "#Typescript", "#Hooks", "#Algorithms"];

// ─── Component ───────────────────────────────────────────────────────────────

export default function SavedSnippetsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCollection, setActiveCollection] = useState("All Snippets");

  return (
    <div className="bg-[#0B0B0C] text-slate-100 min-h-screen flex flex-col font-sans">
      {/* ── Top Nav ── */}
      <nav className="sticky top-0 z-50 border-b border-[#1337ec]/10 bg-[#0B0B0C]/80 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
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
            {/* Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              {[
                { icon: "feed", label: "Feed", active: false },
                { icon: "groups", label: "Study Groups", active: false },
                { icon: "bookmark", label: "Saved Snippets", active: true },
              ].map(({ icon, label, active }) => (
                <a
                  key={label}
                  href="#"
                  className={`flex items-center gap-2 transition-colors ${
                    active ? "text-[#1337ec]" : "text-slate-400 hover:text-[#1337ec]"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{icon}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Search + Bell */}
          <div className="flex items-center gap-6 flex-1 max-w-md ml-auto">
            <div className="relative w-full">
              <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">
                search
              </span>
              <input
                className="w-full bg-[#161618]/50 border border-[#1337ec]/20 rounded-lg py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#1337ec]/50 transition-all"
                placeholder="Search snippets, tags, or collections..."
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

      <div className="max-w-[1600px] mx-auto px-6 flex gap-8 flex-1">
        {/* ── Left Sidebar ── */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 py-8 h-[calc(100vh-64px)] sticky top-16">
          <div className="space-y-6 flex-1">
            <div className="bg-[#161618]/40 p-4 rounded-xl border border-[#1337ec]/10">
              <nav className="space-y-1.5">
                {[
                  { icon: "dashboard", label: "Dashboard" },
                  { icon: "code", label: "Practice" },
                  { icon: "forum", label: "Community" },
                  { icon: "library_books", label: "Resources" },
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-white text-sm"
                  >
                    <span className="material-symbols-outlined text-[22px]">{icon}</span>
                    {label}
                  </button>
                ))}
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

        {/* ── Main ── */}
        <main className="flex-1 py-8 space-y-8 min-w-0">
          <section>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <span className="material-icons-round text-[#00f3ff]">bookmark</span>
                  Saved Snippets
                </h2>
                <span className="px-3 py-1 bg-[#1337ec]/10 text-[#1337ec] text-xs font-bold rounded-full border border-[#1337ec]/20">
                  42 Snippets
                </span>
              </div>
              <div className="flex items-center gap-3">
                {/* View toggle */}
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
                <button className="flex items-center gap-2 bg-[#1337ec] px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-[#1337ec]/20 hover:bg-[#1337ec]/80 transition-all">
                  <span className="material-icons-round text-sm">add</span> New Snippet
                </button>
              </div>
            </div>

            {/* Snippet Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {snippets.map((snippet) => (
                <div
                  key={snippet.id}
                  className="bg-[#161618] border border-[#1337ec]/10 rounded-2xl overflow-hidden hover:border-[#1337ec]/40 transition-all group flex flex-col"
                >
                  {/* Code block */}
                  <div className="p-4 bg-[#1e1e20] font-mono text-[13px] leading-relaxed relative h-48 overflow-hidden">
                    <div className="absolute top-3 right-3">
                      <span className="bg-black/40 backdrop-blur px-2 py-0.5 rounded text-[10px] text-slate-400">
                        {snippet.language}
                      </span>
                    </div>
                    <pre className="text-slate-300">{snippet.code}</pre>
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#1e1e20] to-transparent" />
                  </div>

                  {/* Meta */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg group-hover:text-[#00f3ff] transition-colors">
                        {snippet.title}
                      </h3>
                      <button className="text-slate-500 hover:text-white transition-colors">
                        <span className="material-icons-round">more_vert</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {snippet.tags.map((tag) => (
                        <span
                          key={tag.label}
                          className={`text-[10px] font-bold ${tag.color} ${tag.bg} px-2 py-0.5 rounded uppercase tracking-wider border ${tag.border}`}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="material-icons-round text-xs">schedule</span>
                        {snippet.updated}
                      </span>
                      <span className="flex items-center gap-1 text-[#00f3ff] font-bold">
                        <span className="material-icons-round text-xs">folder</span>
                        {snippet.collection}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add new card */}
              <div className="bg-[#161618]/30 rounded-2xl border border-dashed border-white/10 p-5 flex flex-col items-center justify-center text-center hover:bg-white/5 transition-all cursor-pointer group min-h-[300px]">
                <div className="w-14 h-14 rounded-full border border-dashed border-white/20 flex items-center justify-center text-white/30 group-hover:text-[#00f3ff] group-hover:border-[#00f3ff] transition-all mb-4">
                  <span className="material-icons-round text-3xl">add</span>
                </div>
                <h4 className="font-bold text-slate-300">New Code Snippet</h4>
                <p className="text-xs text-slate-500 max-w-[180px] mt-1">
                  Save your latest logic or helper function to the library.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* ── Right Sidebar ── */}
        <aside className="hidden xl:block w-80 shrink-0 space-y-6 py-8">
          {/* My Collections */}
          <div className="bg-[#161618] rounded-xl border border-[#1337ec]/10 overflow-hidden">
            <div className="p-4 bg-[#1337ec]/10 border-b border-[#1337ec]/20 flex items-center justify-between">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <span className="material-icons-round text-[#00f3ff]">folder_special</span>
                My Collections
              </h3>
              <button className="p-1 hover:bg-white/5 rounded">
                <span className="material-icons-round text-sm">add</span>
              </button>
            </div>
            <div className="p-2 space-y-1">
              {collections.map(({ label, icon, iconColor, count, active }) => {
                const isActive = activeCollection === label;
                return (
                  <button
                    key={label}
                    onClick={() => setActiveCollection(label)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all text-sm ${
                      isActive
                        ? "bg-[#1337ec]/10 text-white"
                        : "hover:bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`material-icons-round text-lg ${isActive ? "text-[#1337ec]" : iconColor}`}>
                        {icon}
                      </span>
                      {label}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isActive ? "bg-[#1337ec]/20 text-[#1337ec]" : "bg-white/5 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recently Used Tags */}
          <div className="bg-[#161618] rounded-xl border border-[#1337ec]/10 p-4">
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
              <span className="material-icons-round text-[#8b5cf6]">sell</span>
              Recently Used Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {recentTags.map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-medium text-slate-300 hover:bg-[#1337ec]/20 hover:text-[#1337ec] transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Promo Card */}
          <div className="bg-gradient-to-br from-[#1337ec]/20 to-[#8b5cf6]/20 p-5 rounded-2xl border border-[#1337ec]/20 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="font-bold text-sm mb-1">Snippet Sync Pro</h4>
              <p className="text-xs text-slate-300 mb-4">
                Sync your library with VS Code and GitHub automatically.
              </p>
              <button className="w-full py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-[#00f3ff] transition-colors">
                Install Extension
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:rotate-12 transition-transform">
              <span className="material-icons-round text-8xl">extension</span>
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