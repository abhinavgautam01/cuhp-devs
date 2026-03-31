"use client";

import { useAuthStore } from "../../store/useAuthStore";
import { ProblemInterface } from "@repo/ui/practice/ProblemInterface";

interface ProblemInterfaceWrapperProps {
    problemData: any;
}

export function ProblemInterfaceWrapper({ problemData }: ProblemInterfaceWrapperProps) {
    const { user, updateStreak } = useAuthStore();

    const formattedUser = user ? {
        name: user.fullName,
        avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.fullName}`,
        streak: user.streakDays || 0
    } : undefined;

    const handleSuccess = (newStreak: number) => {
        if (newStreak > 0) {
            updateStreak(newStreak);
        }
    };

    return (
        <ProblemInterface 
            problem={problemData} 
            user={formattedUser} 
            onSuccess={handleSuccess}
        />
    );
}
