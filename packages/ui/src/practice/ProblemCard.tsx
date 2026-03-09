"use client";

import Link from "next/link";
import { TrendingUp, Trophy } from "../icons";
import { DynamicIcon } from "../components/Icon";

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
    href?: string;
}

export function ProblemCard({ problem, onSolve, href }: ProblemCardProps) {
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

    const ActionButton = () => (
        <button
            onClick={() => !href && onSolve?.(problem.slug)}
            className={`w-full py-2.5 rounded-xl font-bold transition-all transform group-hover:scale-[1.02] ${problem.isDaily
                ? 'bg-primary-custom hover:brightness-110 text-white shadow-lg shadow-primary-custom/20'
                : 'bg-background/60 shadow-sm hover:shadow-md text-slate-400 hover:text-foreground'
                }`}
        >
            {problem.isDaily ? 'Attempt Now' : 'Solve Problem'}
        </button>
    );

    return (
        <div className={`group relative bg-background/40 backdrop-blur-sm ${problem.isDaily ? 'hover:shadow-[0_0_20px_rgba(var(--primary),0.1)]' : ''} rounded-2xl p-6 transition-all flex flex-col`}>


            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${problem.isDaily ? 'bg-primary-custom/15' : 'bg-primary-custom/10'}`}>
                    <DynamicIcon
                        name={icon}
                        className="text-primary-custom"
                        size={24}
                    />
                </div>
                <div className="text-right">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${difficultyColor}`}>
                        {problem.difficulty}
                    </span>
                </div>
            </div>

            <h3 className={`text-lg font-bold mb-2 transition-colors group-hover:text-primary-custom`}>
                {problem.title}
            </h3>

            <p className="text-sm text-slate-400 mb-6 flex-1 line-clamp-2">
                {problem.description}
            </p>

            <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                        <TrendingUp size={14} />
                        {problem.successRate || '75%'} Success
                    </span>
                    <span className="text-slate-300 font-bold flex items-center gap-1">
                        <Trophy className="text-yellow-500" size={14} />
                        Badge Available
                    </span>
                </div>

                {href ? (
                    <Link href={href}>
                        <ActionButton />
                    </Link>
                ) : (
                    <ActionButton />
                )}
            </div>
        </div>
    );
}
