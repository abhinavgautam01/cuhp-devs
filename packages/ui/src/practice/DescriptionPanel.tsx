import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ProblemData {
    title: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    description: string;
    examples: Array<{
        input: string;
        output: string;
        explanation?: string;
    }>;
    constraints: string[];
}

export const DescriptionPanel: React.FC<{ problem: ProblemData }> = ({ problem }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl font-bold text-foreground">{problem.title}</h1>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${problem.difficulty === "EASY" ? "text-emerald-500 bg-emerald-500/10" :
                    problem.difficulty === "MEDIUM" ? "text-yellow-500 bg-yellow-500/10" :
                        "text-red-500 bg-red-500/10"
                    }`}>
                    {problem.difficulty}
                </span>
            </div>

            <div className="text-slate-300 text-sm leading-relaxed space-y-4">
                <div className="prose prose-invert prose-sm max-w-none 
                    prose-headings:text-foreground prose-headings:font-bold 
                    prose-h1:text-2xl prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
                    prose-p:text-slate-400 prose-p:leading-7
                    prose-strong:text-foreground prose-code:text-primary-custom 
                    prose-code:bg-background border-primary-custom/10 prose-code:px-1 prose-code:rounded
                    prose-hr:border-primary-custom/10 prose-li:text-slate-400">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {problem.description}
                    </ReactMarkdown>
                </div>

                <div className="space-y-6 mt-8">
                    {problem.examples.map((example, index) => (
                        <div key={index} className="space-y-3">
                            <h3 className="text-foreground font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-custom shadow-[0_0_8px_rgba(var(--primary),0.4)]"></span>
                                Example {index + 1}:
                            </h3>
                            <div className="bg-background/40 backdrop-blur-sm rounded-xl p-4 border border-primary-custom/10 font-mono text-xs space-y-2">
                                <div className="flex gap-2">
                                    <span className="text-slate-500">Input:</span>
                                    <span className="text-slate-300">{example.input}</span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-slate-500">Output:</span>
                                    <span className="text-slate-300">{example.output}</span>
                                </div>
                                {example.explanation && (
                                    <div className="flex gap-2 flex-col mt-2">
                                        <span className="text-slate-500 italic">Explanation:</span>
                                        <span className="text-slate-400">{example.explanation}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="space-y-3 pt-4 border-t border-primary-custom/10">
                        <h3 className="text-foreground font-bold text-xs uppercase tracking-widest">Constraints:</h3>
                        <ul className="list-disc list-inside space-y-2 font-mono text-[11px] text-slate-500">
                            {problem.constraints.map((constraint, index) => (
                                <li key={index}>
                                    <ReactMarkdown>
                                        {constraint}
                                    </ReactMarkdown>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
