import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: string;
    fullName: string;
    email: string;
    handle?: string;
    avatar?: string;
    bio?: string;
    theme?: "light" | "dark" | "cyber-orange" | "rose-pine-dawn" | "nord-light" | "solarized-light" | "vaporwave" | "gruvbox-light" | "vesper-light";
    onboardingCompleted: boolean;
    program?: string;
    semester?: string;
    interests?: string[];
    savedPosts?: string[];
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    theme: "light" | "dark" | "cyber-orange" | "rose-pine-dawn" | "nord-light" | "solarized-light" | "vaporwave" | "gruvbox-light" | "vesper-light";
    isSidebarCollapsed: boolean;
    setUser: (user: any | null) => void;
    setTheme: (theme: "light" | "dark" | "cyber-orange" | "rose-pine-dawn" | "nord-light" | "solarized-light" | "vaporwave" | "gruvbox-light" | "vesper-light") => void;
    toggleSidebarCollapsed: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            theme: "dark",
            isSidebarCollapsed: false,
            setUser: (user) => {
                if (user && !user.id && user._id) {
                    user.id = String(user._id);
                }
                set({
                    user,
                    isAuthenticated: !!user,
                    theme: user?.theme || "dark"
                });
            },
            setTheme: (theme) => set({ theme }),
            toggleSidebarCollapsed: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: "auth-storage",
        }
    )
);
