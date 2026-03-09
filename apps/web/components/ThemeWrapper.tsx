"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const theme = useAuthStore((state) => state.theme);

    useEffect(() => {
        const root = window.document.documentElement;
        // List of all possible themes to ensure we clean up correctly
        const themes = [
            "light", "dark", "cyber-orange",
            "rose-pine-dawn", "nord-light", "solarized-light",
            "vaporwave", "gruvbox-light", "vesper-light"
        ];
        root.classList.remove(...themes);
        root.classList.add(theme);
    }, [theme]);

    return <>{children}</>;
}
