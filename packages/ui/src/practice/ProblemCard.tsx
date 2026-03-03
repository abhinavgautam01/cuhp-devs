import React from 'react';

interface ProblemCardProps {
    problem: {
        title: string;
        slug: string;
        difficulty: 'EASY' | 'MEDIUM' | 'HARD';
        description: string;
        solved?: number;
        successRate?: string;
        tags?: string[];
        isDaily?: boolean;
    };
    onSolve?: (slug: string) => void;
}

export function ProblemCard({ problem, onSolve }: ProblemCardProps) {
    const difficultyColor = {
        EASY: 'text-emerald-500 bg-emerald-500/10',
        MEDIUM: 'text-yellow-500 bg-yellow-500/10',
        HARD: 'text-rose-500 bg-rose-500/10',
    }[problem.difficulty];

    const icon = {
        EASY: 'account_tree',
        MEDIUM: 'psychology',
        HARD: 'dynamic_form',
    }[problem.difficulty];

    return (
        <div className={`group relative bg-slate-900 border ${problem.isDaily ? 'border-accent-neon/30 hover:shadow-[0_0_20px_rgba(0,210,255,0.1)]' : 'border-primary/10 hover:border-primary/40'} rounded-2xl p-6 transition-all flex flex-col`}>
            {problem.isDaily && (
                <div className="absolute -top-3 left-6">
                    <span className="bg-accent-neon text-slate-900 text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full shadow-lg">
                        Daily Special
                    </span>
                </div>
            )}

            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${problem.isDaily ? 'bg-accent-neon/10' : 'bg-primary/10'}`}>
                    <span className={`material-icons-round ${problem.isDaily ? 'text-accent-neon' : 'text-primary'}`}>
                        {icon}
                    </span>
                </div>
                <div className="text-right">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${difficultyColor}`}>
                        {problem.difficulty}
                    </span>
                </div>
            </div>

            <h3 className={`text-lg font-bold mb-2 transition-colors ${problem.isDaily ? 'group-hover:text-accent-neon' : 'group-hover:text-primary'}`}>
                {problem.title}
            </h3>

            <p className="text-sm text-slate-400 mb-6 flex-1 line-clamp-2">
                {problem.description}
            </p>

            <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                        <span className="material-icons-round text-[14px]">trending_up</span>
                        {problem.successRate || '75%'} Success
                    </span>
                    <span className="text-slate-300 font-bold flex items-center gap-1">
                        <span className="material-icons-round text-yellow-500 text-sm">emoji_events</span>
                        Badge Available
                    </span>
                </div>

                <button
                    onClick={() => onSolve?.(problem.slug)}
                    className={`w-full py-2.5 rounded-xl font-bold transition-all transform group-hover:scale-[1.02] ${problem.isDaily
                            ? 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                >
                    {problem.isDaily ? 'Attempt Now' : 'Solve Problem'}
                </button>
            </div>
        </div>
    );
}
