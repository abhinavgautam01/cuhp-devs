"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Flame, Send, Play, RefreshCcw } from "../icons";

import { DescriptionPanel } from "./DescriptionPanel";
import { EditorPanel } from "./EditorPanel";
import { ConsolePanel } from "./ConsolePanel";

const FALLBACK_CODE = "# No code available for this language.";

interface ProblemData {
  id: string;
  slug: string;
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
  testCases: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
}

interface ProblemInterfaceProps {
  problem: ProblemData;
  user?: {
    name: string;
    avatar: string;
    streak: number;
  };
}

export const ProblemInterface: React.FC<ProblemInterfaceProps> = ({ problem, user }) => {
  const router = useRouter();
  const availableLanguages = Object.keys(problem.defaultCode);
  const defaultLanguage = availableLanguages[0] || "python";

  const [language, setLanguage] = useState(defaultLanguage);
  const [code, setCode] = useState(problem.defaultCode[defaultLanguage] ?? FALLBACK_CODE);
  const [isExpanded, setIsExpanded] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [output, setOutput] = useState<any | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Resizing logic
  const [leftWidth, setLeftWidth] = useState(480);
  const [consoleHeight, setConsoleHeight] = useState(320);
  const isResizingWidth = useRef(false);
  const isResizingHeight = useRef(false);

  const startResizingWidth = useCallback(() => {
    isResizingWidth.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  const startResizingHeight = useCallback(() => {
    isResizingHeight.current = true;
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
  }, []);

  const stopResizing = useCallback(() => {
    isResizingWidth.current = false;
    isResizingHeight.current = false;
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizingWidth.current) {
      const newWidth = e.clientX;
      if (newWidth > 300 && newWidth < Math.min(window.innerWidth - 400, 900)) {
        setLeftWidth(newWidth);
      }
    } else if (isResizingHeight.current) {
      const container = document.getElementById('right-panel');
      if (container) {
        const rect = container.getBoundingClientRect();
        const newHeight = rect.bottom - e.clientY - 64; // Substracting toolbar height
        if (newHeight > 100 && newHeight < window.innerHeight - 200) {
          setConsoleHeight(newHeight);
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  useEffect(() => {
    const nextLanguage = Object.keys(problem.defaultCode)[0] || "python";
    setLanguage(nextLanguage);
    setCode(problem.defaultCode[nextLanguage] ?? FALLBACK_CODE);
    setOutput(null);
    setResetKey((prev) => prev + 1);
  }, [problem.id, problem.defaultCode]);

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setCode(problem.defaultCode[newLang] ?? FALLBACK_CODE);
  };

  const handleReset = () => {
    setCode(problem.defaultCode[language] ?? FALLBACK_CODE);
    setResetKey(prev => prev + 1);
  };

  const runCode = async () => {
    try {
      setIsRunning(true);
      setOutput([{ testcase: 0, status: 'Running', stdout: "Running..." }]);

      const res = await fetch("http://localhost:3001/runCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          problemSlug: problem.slug,
          language,
          code,
        }),
      });

      const data = await res.json();

      if (data.results) {
        setOutput(data.results);
      } else if (data.message) {
        setOutput([{ testcase: 0, status: 'Error', stderr: data.message }]);
      }
    } catch (err) {
      setOutput([{ testcase: 0, status: 'Error', stderr: "Execution Error" }]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden transition-colors duration-300">

      {/* Problem Workspace Header */}
      <header className="h-14 bg-background/80 backdrop-blur-md border-b border-primary-custom/10 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-6">
          <button
            onClick={() => router.push("/practice")}
            className="flex items-center gap-2 text-slate-400 hover:text-foreground transition-all group pr-4 border-r border-primary-custom/10"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-slate-500 text-sm font-medium">Problems</span>
            <span className="text-slate-700 text-lg">/</span>
            <span className="text-sm font-bold text-foreground">{problem.title}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {user && (
            <div className="flex items-center gap-3 px-4 py-1.5 bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-amber-500/20 rounded-full shadow-sm">
              <Flame className="text-amber-500" size={16} />
              <span className="text-xs font-black text-amber-500 uppercase tracking-widest">{user.streak} Day Streak</span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Progress</span>
            <div className="w-24 h-1.5 bg-background border border-primary-custom/10 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence initial={false}>
          {!isExpanded && (
            <motion.div
              initial={{ width: leftWidth, opacity: 1, x: 0 }}
              animate={{ width: leftWidth, opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: -100 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="shrink-0 overflow-y-auto border-r border-primary-custom/10 custom-scrollbar overflow-hidden"
            >
              <div className="p-8" style={{ width: `${leftWidth}px` }}>
                <DescriptionPanel problem={problem} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resizer Handle */}
        {!isExpanded && (
          <div
            className="w-1.5 hover:w-2 bg-primary-custom/5 hover:bg-primary-custom/30 cursor-col-resize transition-all shrink-0 group relative z-50 flex items-center justify-center active:bg-primary-custom/50"
            onMouseDown={startResizingWidth}
          >
            <div className="h-8 w-1 bg-primary-custom/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {/* Right Side: Editor & Console */}
        <motion.div
          layout
          id="right-panel"
          className="flex-1 flex flex-col bg-background min-w-0 h-full relative"
        >
          <EditorPanel
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={handleLanguageChange}
            availableLanguages={availableLanguages}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            resetKey={resetKey}
          />

          {/* Console Resizer */}
          {!isExpanded && (
            <div
              className="h-1.5 hover:h-2 bg-primary-custom/5 hover:bg-primary-custom/30 cursor-row-resize transition-all shrink-0 group relative z-50 flex items-center justify-center active:bg-primary-custom/50"
              onMouseDown={startResizingHeight}
            >
              <div className="w-8 h-1 bg-primary-custom/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}

          {/* Console/Test Cases section */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-background"
              >
                <ConsolePanel
                  output={output}
                  testCases={problem.testCases}
                  height={consoleHeight}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Toolbar */}
          <div className="h-16 border-t border-primary-custom/10 bg-background/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2 bg-background/60 hover:bg-background/80 text-foreground border border-primary-custom/10 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 group"
              >
                <RefreshCcw size={14} className="text-muted-custom group-hover:rotate-180 transition-transform duration-500" />
                Reset
              </button>
              <button
                onClick={runCode}
                disabled={isRunning}
                className="px-5 py-2 bg-background/60 hover:bg-background/80 text-foreground border border-primary-custom/10 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Play size={14} className="text-muted-custom" />
                {isRunning ? "Running..." : "Run Code"}
              </button>
            </div>
            <button className="px-8 py-2 bg-primary-custom hover:brightness-110 text-white rounded-lg text-sm font-bold shadow-lg shadow-primary-custom/20 transition-all transform active:scale-95 flex items-center gap-2">
              <Send size={16} />
              Submit
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
