import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    id: string;
    fullName: string;
    email: string;
    onboardingCompleted: boolean;
    program?: string;
    semester?: string;
    interests?: string[];
    avatar?: string;
    savedPosts?: string[];
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: any | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            setUser: (user) => {
                if (user && !user.id && user._id) {
                    user.id = String(user._id);
                }
                set({ user, isAuthenticated: !!user });
            },
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: "auth-storage",
        }
    )
);
