
"use client";

import { Search } from "../icons";

interface PracticeFiltersProps {
    onSearch: (query: string) => void;
    onCategoryChange: (category: string) => void;
    activeCategory: string;
}

const CATEGORIES = [
    "All Topics",
    "Arrays & Strings",
    "Linked Lists",
    "Trees & Graphs",
    "Dynamic Programming",
    "Recursion"
];

export function PracticeFilters({ onSearch, onCategoryChange, activeCategory }: PracticeFiltersProps) {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">Coding Challenges</h1>
                    <p className="text-slate-400">Master algorithms and data structures with curated problems.</p>
                </div>

                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-custom transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search by problem name or tag..."
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full bg-background/50 border border-primary-custom/10 rounded-2xl py-3 pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary-custom/30 focus:border-primary-custom transition-all backdrop-blur-sm"
                    />
                </div>
            </div>

            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 pb-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className={`px-6 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${activeCategory === cat
                                ? "bg-primary-custom text-white shadow-lg shadow-primary-custom/20"
                                : "bg-background/40 border border-primary-custom/10 text-slate-400 hover:border-primary-custom/40"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
