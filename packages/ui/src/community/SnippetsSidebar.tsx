"use client";

import { PlusCircle, Star, FolderOpen } from "lucide-react";

interface SnippetsSidebarProps {
    collections: Array<{
        label: string;
        count: number;
        active: boolean;
    }>;
    recentTags: string[];
}

export function SnippetsSidebar({ collections, recentTags }: SnippetsSidebarProps) {
    return (
        <aside className="w-64 shrink-0 space-y-8">
            {/* Collections */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest">Collections</h3>
                    <button className="text-white/20 hover:text-[#1337ec] transition-colors">
                        <PlusCircle size={14} />
                    </button>
                </div>
                <nav className="space-y-1">
                    {collections.map(col => (
                        <button
                            key={col.label}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${col.active
                                ? "bg-[#1337ec]/10 text-[#1337ec] font-bold"
                                : "text-white/50 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {col.label === 'Favorites' ? <Star size={18} /> : <FolderOpen size={18} />}
                                {col.label}
                            </div>
                            <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-white/40">
                                {col.count}
                            </span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Languages/Tags */}
            <div>
                <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {recentTags.map(tag => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white/40 hover:text-white hover:border-[#1337ec]/40 cursor-pointer transition-all"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Storage Status */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-white/40 uppercase">Storage</span>
                    <span className="text-[10px] text-white/60 font-bold">42/100</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[42%] h-full bg-[#1337ec]"></div>
                </div>
            </div>
        </aside>
    );
}
