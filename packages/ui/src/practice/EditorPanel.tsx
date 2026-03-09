import React from "react";
import Editor from "@monaco-editor/react";
import { Code2, RefreshCcw, Info } from "../icons";

interface EditorPanelProps {
    code: string;
    setCode: (code: string) => void;
    language: string;
    setLanguage: (language: string) => void;
    availableLanguages: string[];
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
    code,
    setCode,
    language,
    setLanguage,
    availableLanguages
}) => {
    // Map display language to monaco language
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
            <div className="h-12 border-b border-primary-custom/10 bg-background/80 flex items-center justify-between px-4 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-background border border-primary-custom/10 px-4 py-1.5 rounded-lg hover:border-primary-custom/30 transition-all cursor-pointer group">
                        <Code2 className="text-primary-custom group-hover:brightness-110" size={14} />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-transparent border-none text-[11px] font-bold text-foreground focus:ring-0 cursor-pointer outline-none min-w-[100px] h-6 p-0"
                        >
                            {availableLanguages.map((lang) => (
                                <option key={lang} value={lang} className="bg-background text-foreground py-2 px-4 uppercase">{lang}</option>
                            ))}
                        </select>
                    </div>
                    <button className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors">
                        <RefreshCcw size={14} />
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors">
                        <Info size={16} />
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 overflow-hidden relative border-t border-primary-custom/10">
                <Editor
                    height="100%"
                    language={getMonacoLang(language)}
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    options={{
                        fontSize: 14,
                        fontFamily: "'Fira Code', 'Courier New', monospace",
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        lineHeight: 24,
                        padding: { top: 16 },
                        selectionHighlight: true,
                        scrollbar: {
                            verticalScrollbarSize: 8,
                            horizontalScrollbarSize: 8,
                        },
                    }}
                />
            </div>
        </div>
    );
};
