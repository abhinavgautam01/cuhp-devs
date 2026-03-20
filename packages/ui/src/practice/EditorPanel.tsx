import React from "react";
import Editor from "@monaco-editor/react";
import { Code2, RefreshCcw, Info, Settings, Maximize2, Clock } from "../icons";

interface EditorPanelProps {
    code: string;
    setCode: (code: string) => void;
    language: string;
    setLanguage: (language: string) => void;
    availableLanguages: string[];
    isExpanded: boolean;
    setIsExpanded: (expanded: boolean) => void;
    resetKey?: number;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
    code,
    setCode,
    language,
    setLanguage,
    availableLanguages,
    isExpanded,
    setIsExpanded,
    resetKey
}) => {
    const [elapsedTime, setElapsedTime] = React.useState(0);
    const [hasTyped, setHasTyped] = React.useState(false);

    React.useEffect(() => {
        if (!hasTyped) return;
        const timer = setInterval(() => {
            setElapsedTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [hasTyped]);

    React.useEffect(() => {
        setElapsedTime(0);
        setHasTyped(false);
    }, [resetKey]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const getMonacoLang = (lang: string) => {
        const lower = lang.toLowerCase();
        if (lower === "c++" || lower === "cpp") return "cpp";
        if (lower === "javascript" || lower === "js") return "javascript";
        if (lower === "python" || lower === "py") return "python";
        if (lower === "rust" || lower === "rs") return "rust";
        return lower;
    };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Editor Header */}
            <div className="h-14 border-b border-primary-custom/10 bg-background/80 flex items-center justify-between px-6 backdrop-blur-md">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-card-custom border border-card-border px-4 py-2 rounded-xl text-sm font-bold text-foreground focus:ring-2 focus:ring-primary-custom/20 cursor-pointer outline-none min-w-[140px] shadow-sm transition-all hover:border-primary-custom/40"
                        >
                            {availableLanguages.map((lang) => (
                                <option key={lang} value={lang} className="bg-background text-foreground py-2 px-4 uppercase">{lang}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-muted-custom bg-muted-custom/5 px-4 py-2 rounded-xl border border-muted-custom/10">
                        <Clock size={16} className="text-primary-custom" />
                        <span className="font-mono">{formatTime(elapsedTime)}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2.5 text-muted-custom hover:text-foreground hover:bg-muted-custom/10 rounded-xl transition-all border border-transparent hover:border-muted-custom/20">
                        <Settings size={18} />
                    </button>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`p-2.5 rounded-xl transition-all border border-transparent shadow-sm ${isExpanded
                            ? "bg-primary-custom text-white shadow-primary-custom/20"
                            : "text-muted-custom hover:text-foreground hover:bg-muted-custom/10 hover:border-muted-custom/20"
                            }`}
                    >
                        <Maximize2 size={18} />
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 overflow-hidden relative border-t border-primary-custom/5">
                <Editor
                    height="100%"
                    language={getMonacoLang(language)}
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => {
                        setCode(value || "");
                        if (!hasTyped && value) setHasTyped(true);
                    }}
                    options={{
                        fontSize: 16,
                        fontFamily: "'Fira Code', 'Courier New', monospace",
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        lineHeight: 28,
                        padding: { top: 24, bottom: 24 },
                        selectionHighlight: true,
                        smoothScrolling: true,
                        cursorBlinking: 'smooth',
                        cursorSmoothCaretAnimation: 'on',
                        scrollbar: {
                            verticalScrollbarSize: 10,
                            horizontalScrollbarSize: 10,
                        },
                    }}
                />
            </div>
        </div>
    );
};
