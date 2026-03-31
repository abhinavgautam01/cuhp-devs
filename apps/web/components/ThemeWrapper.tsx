"use client";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export const THEMES = [
    {
        id: "light",
        name: "Light",
        desc: "Clean & Bright",
        bg: "bg-white",
        border: "border-slate-200",
        text: "text-slate-900",
    },
    {
        id: "dark",
        name: "Dark",
        desc: "Eye Protection",
        bg: "bg-[#0a0c16]",
        border: "border-primary/30",
        text: "text-white",
    },
    {
        id: "cyber-orange",
        name: "Cyber Orange",
        desc: "Neon Glow",
        bg: "bg-[#1a0f00]",
        border: "border-[#ff6b00]/30",
        text: "text-[#ff6b00]",
    },
    {
        id: "rose-pine-dawn",
        name: "Rose Pine",
        desc: "Ethereal",
        bg: "bg-[#faf4ed]",
        border: "border-[#d7827e]/30",
        text: "text-[#575279]",
    },
    {
        id: "nord-light",
        name: "Nord Light",
        desc: "Arctic Frost",
        bg: "bg-[#e5e9f0]",
        border: "border-[#5e81ac]/30",
        text: "text-[#2e3440]",
    },
    {
        id: "solarized-light",
        name: "Solarized",
        desc: "Warm Paper",
        bg: "bg-[#fdf6e3]",
        border: "border-[#268bd2]/30",
        text: "text-[#657b83]",
    },
    {
        id: "vaporwave",
        name: "Vaporwave",
        desc: "Retro Neon",
        bg: "bg-[#2d1b4e]",
        border: "border-[#01cdfe]/30",
        text: "text-[#ff71ce]",
    },
    {
        id: "gruvbox-light",
        name: "Gruvbox",
        desc: "Retro Warm",
        bg: "bg-[#fbf1c7]",
        border: "border-[#af3a03]/30",
        text: "text-[#3c3836]",
    },
    {
        id: "vesper-light",
        name: "Vesper",
        desc: "Minimalist",
        bg: "bg-white",
        border: "border-black/10",
        text: "text-black",
    },
    {
        id: "github-dark",
        name: "GitHub Dark",
        desc: "Developer Pro",
        bg: "bg-[#0d1117]",
        border: "border-[#30363d]",
        text: "text-[#c9d1d9]",
    },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export default function ThemeWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const theme = useAuthStore((state) => state.theme);

    useEffect(() => {
        const root = window.document.documentElement;
        // List of all possible themes to ensure we clean up correctly
        const themeIds = THEMES.map((t) => t.id);
        root.classList.remove(...themeIds);
        root.classList.add(theme);
    }, [theme]);

    return <>{children}</>;
}
