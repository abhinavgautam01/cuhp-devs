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

const escapeRegex = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const dedupeExamples = (examples: ProblemData["examples"]) => {
    const seen = new Set<string>();

    return examples.filter((example) => {
        const key = `${example.input}::${example.output}::${example.explanation ?? ""}`;
        if (seen.has(key)) {
            return false;
        }

        seen.add(key);
        return true;
    });
};

export const DescriptionPanel: React.FC<{ problem: ProblemData }> = ({ problem }) => {
    const normalizedDescription = problem.description
        .replace(new RegExp(`^#\\s+${escapeRegex(problem.title)}\\s*\\n+`, "i"), "")
        .replace(/^##\s+Problem Statement\s*\n+/i, "")
        .trim();

    const descriptionHasExamples = /^#{1,6}\s+Examples?\b/im.test(normalizedDescription);
    const descriptionHasConstraints = /^#{1,6}\s+Constraints?\b/im.test(normalizedDescription);
    const examples = dedupeExamples(problem.examples);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">{problem.title}</h1>
                <div className="flex items-center gap-3">
                    <span className={`px-4 py-1 text-xs font-bold rounded-full uppercase tracking-widest shadow-sm ${problem.difficulty === "EASY" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                        problem.difficulty === "MEDIUM" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                            "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                        }`}>
                        {problem.difficulty}
                    </span>
                </div>
            </div>

            <div className="bg-card-custom border border-card-border rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primary-custom rounded-full"></span>
                    Problem Statement
                </h2>
                <div className="prose prose-sm max-w-none 
                    prose-p:text-muted-custom prose-p:leading-relaxed prose-p:text-base
                    prose-strong:text-foreground prose-strong:font-bold
                    prose-code:text-primary-custom prose-code:bg-primary-custom/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {normalizedDescription}
                    </ReactMarkdown>
                </div>
            </div>

            {!descriptionHasExamples && examples.length > 0 && (
                <div className="space-y-6">
                    {examples.map((example, index) => (
                        <div key={index} className="bg-card-custom border border-card-border rounded-2xl p-8 shadow-sm space-y-4">
                            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                                Example {index + 1}
                            </h3>
                            <div className="bg-background border border-primary-custom/10 rounded-xl p-6 font-mono text-sm leading-relaxed">
                                <div className="space-y-1">
                                    <div className="flex gap-2">
                                        <span className="text-muted-custom min-w-[70px]">Input:</span>
                                        <span className="text-foreground whitespace-pre-wrap break-words">{example.input}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-muted-custom min-w-[70px]">Output:</span>
                                        <span className="text-foreground whitespace-pre-wrap break-words">{example.output}</span>
                                    </div>
                                    {example.explanation && (
                                        <div className="mt-4 pt-4 border-t border-primary-custom/5">
                                            <span className="text-muted-custom block mb-1 italic">Explanation:</span>
                                            <span className="text-muted-custom/90">{example.explanation}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!descriptionHasConstraints && problem.constraints.length > 0 && (
                <div className="bg-card-custom border border-card-border rounded-2xl p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-foreground mb-6">Constraints</h3>
                    <ul className="space-y-3">
                        {problem.constraints.map((constraint, index) => (
                            <li key={index} className="flex items-start gap-3 text-muted-custom group">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary-custom/40 mt-2 transition-colors group-hover:bg-primary-custom"></span>
                                <span className="font-mono text-sm">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {constraint}
                                    </ReactMarkdown>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
