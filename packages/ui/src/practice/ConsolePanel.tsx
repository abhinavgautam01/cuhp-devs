import { Play, Plus } from "../icons";

export const ConsolePanel: React.FC<{ height?: number }> = ({ height = 320 }) => {
    return (
        <div
            className="border-t border-primary-custom/10 bg-background flex flex-col shrink-0 overflow-hidden"
            style={{ height: `${height}px` }}
        >
            <div className="flex items-center px-6 h-14 border-b border-primary-custom/5 bg-background/80 backdrop-blur-md">
                <button className="px-6 h-full text-sm font-bold text-primary-custom border-b-2 border-primary-custom uppercase tracking-widest flex items-center">
                    Test Cases
                </button>
                <button className="px-6 h-full text-sm font-bold text-muted-custom hover:text-foreground uppercase tracking-widest flex items-center transition-colors">
                    Test Results
                </button>
            </div>

            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar bg-muted-custom/[0.02]">
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
            </div>
        </div>
    );
};
