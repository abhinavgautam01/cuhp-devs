import React from "react";
import { CheckCircle2 } from "../icons";

interface ConsolePanelProps {
  output: string;
}


export const ConsolePanel: React.FC<ConsolePanelProps> = ({ output }) => {
    return (
        // <div className="h-48 border-t border-primary-custom/10 bg-background flex flex-col shrink-0">
        //     <div className="flex items-center px-4 border-b border-primary-custom/5 bg-background/80 backdrop-blur-sm">
        //         <button className="px-4 py-2 text-[10px] font-bold text-primary-custom border-b-2 border-primary-custom uppercase tracking-widest">
        //             Results
        //         </button>
        //         <button className="px-4 py-2 text-[10px] font-medium text-slate-500 hover:text-slate-300 uppercase tracking-widest transition-colors">
        //             Console
        //         </button>
        //     </div>

        //     <div className="flex-1 p-4 overflow-y-auto scrollbar-hide">
        //         <div className="flex items-center gap-3 text-emerald-400 font-bold mb-4">
        //             <CheckCircle2 size={16} />
        //             <span className="text-xs uppercase tracking-wider">Accepted</span>
        //             <span className="text-[10px] font-medium text-slate-600 ml-2">Runtime: 48ms</span>
        //         </div>

        //         <div className="space-y-4">
        //             <div className="space-y-1.5">
        //                 <span className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">Input</span>
        //                 <div className="bg-background/40 backdrop-blur-sm p-3 rounded-lg text-xs font-mono text-slate-300 border border-primary-custom/10">
        //                     height = [1,1]
        //                 </div>
        //             </div>
        //             <div className="space-y-1.5">
        //                 <span className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">Your Output</span>
        //                 <div className="bg-emerald-500/5 p-3 rounded-lg text-xs font-mono text-emerald-400 border border-emerald-500/10">
        //                     1
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="h-40 bg-black text-green-400 p-4 overflow-auto">
      <pre>{output}</pre>
    </div>
    );
};
