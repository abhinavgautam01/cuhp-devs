import React, { useState } from "react";
import { Play, Plus, CheckCircle2 } from "../icons";

interface ConsolePanelProps {
    output: any[] | null;
    height?: number;
}

export const ConsolePanel: React.FC<ConsolePanelProps> = ({ output, height }) => {
    const [activeTab, setActiveTab] = useState<"testCases" | "testResults">("testResults");

    return (
        <div
            className="border-t border-primary-custom/10 bg-background flex flex-col shrink-0 overflow-hidden"
            style={{ height: height ? `${height}px` : "100%" }}
        >
            <div className="flex items-center px-6 h-14 border-b border-primary-custom/5 bg-background/80 backdrop-blur-md">
                <button
                    onClick={() => setActiveTab("testCases")}
                    className={`px-6 h-full text-sm font-bold uppercase tracking-widest flex items-center transition-colors ${activeTab === "testCases"
                        ? "text-primary-custom border-b-2 border-primary-custom"
                        : "text-muted-custom hover:text-foreground border-b-2 border-transparent"
                        }`}
                >
                    Test Cases
                </button>
                <button
                    onClick={() => setActiveTab("testResults")}
                    className={`px-6 h-full text-sm font-bold uppercase tracking-widest flex items-center transition-colors ${activeTab === "testResults"
                        ? "text-primary-custom border-b-2 border-primary-custom"
                        : "text-muted-custom hover:text-foreground border-b-2 border-transparent"
                        }`}
                >
                    Test Results
                </button>
            </div>

            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-muted-custom/[0.02]">
                {activeTab === "testCases" ? (
                    <div className="flex flex-col gap-6 max-w-3xl">
                        <div className="bg-card-custom border border-card-border rounded-2xl p-6 shadow-sm group hover:border-primary-custom/20 transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold text-foreground flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    Test Case 1
                                </span>
                                <button className="px-4 py-1.5 text-xs font-bold text-muted-custom hover:text-primary-custom hover:bg-primary-custom/5 rounded-lg transition-all flex items-center gap-2 border border-transparent hover:border-primary-custom/10">
                                    <Play size={12} />
                                    Run
                                </button>
                            </div>
                            <div className="bg-background border border-primary-custom/5 p-4 rounded-xl font-mono text-sm space-y-2">
                                <div className="flex gap-3">
                                    <span className="text-muted-custom min-w-[70px]">nums =</span>
                                    <span className="text-foreground">[2, 7, 11, 15]</span>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-muted-custom min-w-[70px]">target =</span>
                                    <span className="text-foreground">9</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card-custom border border-card-border rounded-2xl p-6 shadow-sm group hover:border-primary-custom/20 transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-bold text-foreground flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    Test Case 2
                                </span>
                                <button className="px-4 py-1.5 text-xs font-bold text-muted-custom hover:text-primary-custom hover:bg-primary-custom/5 rounded-lg transition-all flex items-center gap-2 border border-transparent hover:border-primary-custom/10">
                                    <Play size={12} />
                                    Run
                                </button>
                            </div>
                            <div className="bg-background border border-primary-custom/5 p-4 rounded-xl font-mono text-sm space-y-2">
                                <div className="flex gap-3">
                                    <span className="text-muted-custom min-w-[70px]">nums =</span>
                                    <span className="text-foreground">[3, 2, 4]</span>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-muted-custom min-w-[70px]">target =</span>
                                    <span className="text-foreground">6</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-6 border-2 border-dashed border-card-border rounded-2xl text-muted-custom hover:text-primary-custom hover:border-primary-custom/30 hover:bg-primary-custom/5 transition-all flex items-center justify-center gap-3 font-bold group">
                            <Plus size={20} className="transition-transform group-hover:scale-110" />
                            Add Test Case
                        </button>
                    </div>
                ) : (
                    // Test Results Tab
                    <div className="flex flex-col gap-6 max-w-3xl">
                        {output && output.length > 0 ? (
                            <div className="space-y-4">
                                {output.map((res: any, idx: number) => (
                                    <div key={idx} className="space-y-1.5 bg-card-custom border border-card-border p-4 rounded-xl shadow-sm">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-bold text-foreground flex items-center gap-2">
                                                Test Case {res.testcase || idx + 1}
                                            </span>
                                            <span className={`text-xs font-bold px-2 py-1 rounded-md ${res.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-500' :
                                                    res.status === 'Running' ? 'bg-blue-500/10 text-blue-500' :
                                                        'bg-red-500/10 text-red-500'
                                                }`}>
                                                {res.status || 'Unknown'}
                                            </span>
                                        </div>

                                        {res.time !== null && res.time !== undefined && (
                                            <div className="flex gap-4 mb-3 text-xs text-muted-custom font-mono">
                                                <span>Time: {res.time}s</span>
                                                {res.memory && <span>Memory: {Math.round(res.memory / 1024)}KB</span>}
                                            </div>
                                        )}

                                        {res.stdout && res.stdout.trim() !== "" && (
                                            <div className="space-y-1">
                                                <span className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">Stdout</span>
                                                <div className="bg-emerald-500/5 p-3 rounded-lg text-xs font-mono text-emerald-400 border border-emerald-500/10 whitespace-pre-wrap">
                                                    {res.stdout}
                                                </div>
                                            </div>
                                        )}

                                        {res.stderr && res.stderr.trim() !== "" && (
                                            <div className="space-y-1 mt-2">
                                                <span className="text-[9px] text-slate-500 uppercase font-black tracking-tighter">Stderr</span>
                                                <div className="bg-red-500/5 p-3 rounded-lg text-xs font-mono text-red-400 border border-red-500/10 whitespace-pre-wrap">
                                                    {res.stderr}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-sm text-slate-500 font-medium italic mt-4">
                               {output?.length === 0 ? "No output yet" : "No output"}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
