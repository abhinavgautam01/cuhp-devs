"use client";

import { LayoutGrid, List, Plus } from "../icons";
import { SnippetCard } from "./SnippetCard";
import { SnippetsSidebar } from "./SnippetsSidebar";

interface SavedSnippetsProps {
  data: {
    snippets: any[];
    collections: any[];
    recentTags: string[];
  };
}

export default function SavedSnippets({ data }: SavedSnippetsProps) {
  return (
    <main className="flex-1 flex gap-8 p-4 md:p-8 overflow-y-auto w-full">
      {/* Sidebar for collections */}
      <SnippetsSidebar
        collections={data.collections}
        recentTags={data.recentTags}
      />

      <div className="flex-1 space-y-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">Your Snippets</h2>
            <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
              <button className="p-1.5 rounded-md bg-[#1337ec] text-white">
                <LayoutGrid size={14} />
              </button>
              <button className="p-1.5 rounded-md text-white/40 hover:text-white transition-all">
                <List size={14} />
              </button>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#1337ec] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-[#1337ec]/20 hover:scale-105 transition-transform">
            <Plus size={14} /> New Snippet
          </button>
        </div>

        {/* Snippets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
          {data.snippets.map((snippet: any) => (
            <SnippetCard key={snippet.id} snippet={snippet} />
          ))}
        </div>
      </div>
    </main>
  );
}