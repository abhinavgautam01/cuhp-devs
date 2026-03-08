import React from "react";
import { CheckCircle2 } from "../icons";

export const ConsolePanel: React.FC = () => {
    return (
        <div className="h-48 border-t border-white/10 bg-[#1e1e1e] flex flex-col shrink-0">
            <div className="flex items-center px-4 border-b border-white/5 bg-[#252526]">
                <button className="px-4 py-2 text-[10px] font-bold text-[#00d2ff] border-b-2 border-[#00d2ff] uppercase tracking-widest">
                    Results
                </button>
                <button className="px-4 py-2 text-[10px] font-medium text-slate-500 hover:text-slate-300 uppercase tracking-widest transition-colors">
                    Console
                </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
                <div className="flex items-center gap-3 text-emerald-400 font-bold mb-4">
                    <CheckCircle2 size={16} />
                    <span className="text-xs uppercase tracking-wider">Accepted</span>
                    <span className="text-[10px] font-medium text-slate-600 ml-2">Runtime: 48ms</span>
                </div>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <span className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">Input</span>
                        <div className="bg-black/40 p-3 rounded-lg text-xs font-mono text-slate-300 border border-white/5">
                            height = [1,1]
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <span className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">Your Output</span>
                        <div className="bg-emerald-500/5 p-3 rounded-lg text-xs font-mono text-emerald-400 border border-emerald-500/10">
                            1
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
