import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: string;
    fullName: string;
    email: string;
    handle?: string;
    avatar?: string;
    bio?: string;
    theme?: "light" | "dark" | "cyber-orange" | "rose-pine-dawn" | "nord-light" | "solarized-light" | "vaporwave" | "gruvbox-light" | "vesper-light" | "github-dark";
    streakDays?: number;
    onboardingCompleted: boolean;
    program?: string;
    semester?: string;
    interests?: string[];
    savedPosts?: string[];
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    theme: "light" | "dark" | "cyber-orange" | "rose-pine-dawn" | "nord-light" | "solarized-light" | "vaporwave" | "gruvbox-light" | "vesper-light" | "github-dark";
    isSidebarCollapsed: boolean;
    setUser: (user: any | null, token?: string | null) => void;
    setToken: (token: string | null) => void;
    setTheme: (theme: "light" | "dark" | "cyber-orange" | "rose-pine-dawn" | "nord-light" | "solarized-light" | "vaporwave" | "gruvbox-light" | "vesper-light" | "github-dark") => void;
    toggleSidebarCollapsed: () => void;
    updateStreak: (streak: number) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            theme: "dark",
            isSidebarCollapsed: false,
            setUser: (user, token) => {
                if (user && !user.id && user._id) {
                    user.id = String(user._id);
                }
                
                // Map backend 'streak' to frontend 'streakDays'
                if (user && typeof user.streak === 'number') {
                    user.streakDays = user.streak;
                }

                const nextState: {
                    user: User | null;
                    token?: string | null;
                    isAuthenticated: boolean;
                    theme: AuthState["theme"];
                } = {
                    user,
                    isAuthenticated: !!user,
                    theme: user?.theme || "dark",
                };

                if (token !== undefined) {
                    nextState.token = token;
                } else if (!user) {
                    nextState.token = null;
                }

                set(nextState);
            },
            setToken: (token) => set({ token }),
            setTheme: (theme) => set({ theme }),
            toggleSidebarCollapsed: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
            updateStreak: (streak: number) => set((state) => ({
                user: state.user ? { ...state.user, streakDays: streak } : null
            })),
            logout: () => set({ user: null, token: null, isAuthenticated: false }),
        }),
        {
            name: "auth-storage",
        }
    )
);
