"use client";

import React from 'react';

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
                    <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent-neon transition-colors">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Search by problem name or tag..."
                        onChange={(e) => onSearch(e.target.value)}
                        className="w-full bg-slate-900 border border-primary/10 rounded-2xl py-3 pl-12 pr-4 text-slate-100 focus:outline-none focus:ring-2 focus:ring-accent-neon/30 focus:border-accent-neon transition-all"
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
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "bg-slate-900 border border-primary/10 text-slate-400 hover:border-primary/40"
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
