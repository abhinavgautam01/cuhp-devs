"use client"
import { useState } from "react";
import { Share2, PencilLine, Trash2, Copy, ArrowRight } from "../icons";

interface SnippetCardProps {
    snippet: {
        id: string | number;
        title: string;
        language: string;
        code: string;
        tags: string[];
        updated: string;
        collection: string;
    };
}

export function SnippetCard({ snippet }: SnippetCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`bg-[#161618] rounded-xl border border-white/5 overflow-hidden group hover:border-[#1337ec]/30 transition-all flex flex-col shadow-lg shadow-black/20 ${isExpanded ? 'h-auto' : 'h-full'}`}>
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold bg-[#1337ec]/10 text-[#1337ec]">
                        {snippet.language.substring(0, 2).toUpperCase()}
                    </div>
                    <h3 className="text-sm font-bold truncate max-w-[150px] text-white/90">{snippet.title}</h3>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(snippet.code);
                        }}
                        className="p-1.5 hover:bg-white/5 rounded-md text-white/40 hover:text-white transition-colors"
                        title="Copy Code"
                    >
                        <Copy size={14} />
                    </button>
                    <button className="p-1.5 hover:bg-white/5 rounded-md text-white/40 hover:text-white transition-colors" title="Share">
                        <Share2 size={14} />
                    </button>
                </div>
            </div>

            <div className="p-4 flex-1">
                <div className={`bg-black/60 rounded-lg p-3 mb-4 overflow-hidden relative border border-white/5 shadow-inner transition-all duration-300 ${isExpanded ? 'h-auto' : 'h-32'}`}>
                    <pre className={`text-[10px] font-mono text-white/80 leading-relaxed ${isExpanded ? 'whitespace-pre-wrap' : ''}`}>
                        {snippet.code}
                    </pre>
                    {!isExpanded && (
                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#161618] to-transparent pointer-events-none"></div>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {snippet.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="px-4 py-3 bg-white/[0.01] border-t border-white/5 flex items-center justify-between mt-auto">
                <span className="text-[10px] text-white/30 font-medium">{snippet.updated}</span>
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[10px] font-bold text-[#1337ec] flex items-center gap-1.5 hover:gap-2 transition-all group/btn"
                >
                    {isExpanded ? 'Show Less' : 'View Detail'}
                    <ArrowRight size={14} className={`group-hover/btn:translate-x-0.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
            </div>
        </div>
    );
}
