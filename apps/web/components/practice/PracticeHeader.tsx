"use client";

import { useAuthStore } from "../../store/useAuthStore";
import { Flame } from "../../lib/icons";
import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/api";

export function PracticeHeader() {
    const { user, isAuthenticated } = useAuthStore();
    const [hasSolvedToday, setHasSolvedToday] = useState(false);

    useEffect(() => {
        const checkSolved = async () => {
            if (!isAuthenticated) return;
            try {
                const startOfToday = new Date();
                startOfToday.setHours(0, 0, 0, 0);
                const submissions = await apiFetch(`/user/submissions?since=${startOfToday.getTime()}`).catch(() => []);
                setHasSolvedToday(submissions.some((s: any) => s.status === "Accepted"));
            } catch (err) {
                console.error("Header check failed:", err);
            }
        };
        checkSolved();
    }, [isAuthenticated]);

    if (!user) return null;

    return (
        <div className="bg-background/80 backdrop-blur-md border-b border-primary-custom/10 px-8 py-3 flex items-center justify-between z-10">
            <div className="flex items-center gap-4">
                <div className="streak-gradient px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg shadow-gray-500/20">
                    <Flame className="text-white" size={18} />
                    <span className="text-white font-bold text-sm">{user.streakDays || 0}-Day Streak</span>
                </div>
                <p className="text-sm text-slate-400 hidden sm:block">Solve your daily problem to maintain your ranking!</p>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Goal</span>
                    <div className="w-24 h-1.5 bg-background border border-primary-custom/5 rounded-full overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-500 rounded-full shadow-[0_0_8px_rgba(var(--primary),0.4)] ${hasSolvedToday ? "w-full bg-emerald-500" : "w-1/3 bg-primary-custom"}`}
                        />
                    </div>
                    <span className="text-xs font-bold text-primary-custom">{hasSolvedToday ? "1/1" : "0/1"}</span>
                </div>
            </div>
        </div>
    );
}
