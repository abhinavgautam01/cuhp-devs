"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Flame, Bell, Settings2 } from "../icons";
import { DescriptionPanel } from "./DescriptionPanel";
import { EditorPanel } from "./EditorPanel";
import { ConsolePanel } from "./ConsolePanel";

interface ProblemData {
    id: string;
    title: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    description: string;
    examples: Array<{
        input: string;
        output: string;
        explanation?: string;
    }>;
    constraints: string[];
    defaultCode: Record<string, string>;
}

interface ProblemInterfaceProps {
    problem: ProblemData;
    user: {
        name: string;
        avatar: string;
        streak: number;
    };
}

export const ProblemInterface: React.FC<ProblemInterfaceProps> = ({ problem, user }) => {
    const router = useRouter();
    const [language, setLanguage] = useState(Object.keys(problem.defaultCode)[0] || "python");
    const [code, setCode] = useState(problem.defaultCode[language] ?? "# No code available for this language.");
    const [activeTab, setActiveTab] = useState<"description" | "solutions" | "submissions">("description");

    const handleLanguageChange = (newLang: string) => {
        setLanguage(newLang);
        setCode(problem.defaultCode[newLang] ?? "# No code available for this language.");
    };

    return (
        <div className="flex flex-col h-screen bg-[#090c10] text-slate-100 font-sans overflow-hidden">
            {/* Top Header */}
            <header className="h-14 bg-[#0d1117] border-b border-[#1337ec]/10 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-6">
                    <div
                        onClick={() => router.push("/practice")}
                        className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={16} />
                        <span className="text-sm font-semibold">Problems</span>
                        <span className="text-slate-600">/</span>
                        <span className="text-sm font-bold text-slate-200">{problem.title}</span>
                    </div>
                    <div className="h-4 w-px bg-slate-800"></div>
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-amber-500 to-red-500 px-3 py-0.5 rounded-full flex items-center gap-1.5 shadow-md">
                            <Flame className="text-white" size={14} />
                            <span className="text-white font-bold text-[10px] uppercase tracking-wider">{user.streak} Days</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Progress: 2/3 Daily Goals</span>
                        <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="w-2/3 h-full bg-[#00d2ff] shadow-[0_0_8px_rgba(0,210,255,0.4)]"></div>
                        </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                        <Settings2 size={20} />
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Side: Description */}
                <div className="w-[450px] border-r border-[#1337ec]/10 bg-[#0d1117] flex flex-col overflow-hidden">
                    <div className="flex border-b border-[#1337ec]/5 px-2 bg-slate-900/20">
                        {["description", "solutions", "submissions"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === tab
                                    ? "border-[#1337ec] text-[#1337ec]"
                                    : "border-transparent text-slate-500 hover:text-slate-300"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide">
                        {activeTab === "description" && <DescriptionPanel problem={problem} />}
                    </div>
                </div>

                {/* Right Side: Editor & Console */}
                <div className="flex-1 flex flex-col bg-[#272822]">
                    <EditorPanel
                        code={code}
                        setCode={setCode}
                        language={language}
                        setLanguage={handleLanguageChange}
                        availableLanguages={Object.keys(problem.defaultCode)}
                    />
                    <ConsolePanel />

                    {/* Bottom Toolbar */}
                    <div className="h-14 border-t border-white/5 bg-[#0d1117] flex items-center justify-between px-6 shrink-0">
                        <button className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors">
                            <span className="text-[10px] font-bold uppercase tracking-widest">Console</span>
                        </button>
                        <div className="flex items-center gap-3">
                            <button className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-all border border-white/10">
                                Run Code
                            </button>
                            <button className="px-8 py-2 bg-[#1337ec] hover:bg-[#1337ec]/90 text-white rounded-lg text-xs font-bold shadow-lg shadow-[#1337ec]/20 transition-all transform active:scale-95">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
