"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Settings from "@repo/ui/components/Settings";
import { apiFetch } from "../lib/api";
import { toast } from "../store/useToastStore";
import { useAuthStore } from "../store/useAuthStore";

export function SettingsClient() {
    const router = useRouter();
    const logoutStore = useAuthStore((state) => state.logout);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await apiFetch("/auth/logout", { method: "POST" });
            logoutStore();
            toast.success("Logged out successfully.");
            router.push("/signin");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Logout failed.");
        } finally {
            setIsLoggingOut(false);
        }
    };

    return <Settings onLogout={handleLogout} isLoggingOut={isLoggingOut} />;
}
