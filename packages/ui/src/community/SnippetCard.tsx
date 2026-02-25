import { Share2, PencilLine, Trash2, Copy } from "lucide-react";

interface SnippetCardProps {
    snippet: {
        id: number;
        title: string;
        language: string;
        code: string;
        tags: string[];
        updated: string;
        collection: string;
    };
}

export function SnippetCard({ snippet }: SnippetCardProps) {
    return (
        <div className="bg-[#161618] rounded-xl border border-white/5 overflow-hidden group hover:border-[#1337ec]/30 transition-all flex flex-col h-full">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${snippet.language === 'Python' ? 'bg-blue-500/10 text-blue-400' :
                            snippet.language === 'React' ? 'bg-cyan-500/10 text-cyan-400' :
                                'bg-yellow-500/10 text-yellow-500'
                        }`}>
                        {snippet.language.substring(0, 2).toUpperCase()}
                    </div>
                    <h3 className="text-sm font-bold truncate max-w-[150px]">{snippet.title}</h3>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 hover:bg-white/5 rounded-md text-white/40 hover:text-white transition-colors">
                        <Copy size={14} />
                    </button>
                    <button className="p-1.5 hover:bg-white/5 rounded-md text-white/40 hover:text-white transition-colors">
                        <PencilLine size={14} />
                    </button>
                </div>
            </div>

            <div className="p-4 flex-1">
                <div className="bg-black/40 rounded-lg p-3 mb-4 h-32 overflow-hidden relative">
                    <pre className="text-[10px] font-mono text-white/40">
                        {snippet.code}
                    </pre>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161618] via-transparent to-transparent"></div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {snippet.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded italic">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="px-4 py-3 bg-white/[0.01] border-t border-white/5 flex items-center justify-between mt-auto">
                <span className="text-[10px] text-white/20">{snippet.updated}</span>
                <button className="text-[10px] font-bold text-[#1337ec] flex items-center gap-1 hover:underline">
                    View Detail <span className="material-icons-round text-sm">arrow_forward</span>
                </button>
            </div>
        </div>
    );
}
