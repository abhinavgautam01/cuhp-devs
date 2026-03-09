"use client";

import { useState } from "react";
import Link from "next/link";
import {
    SquareTerminal,
    LayoutDashboard,
    Code2,
    Users,
    Library,
    Settings
} from "../icons";

interface User {
    name: string;
    role: string;
    avatar: string;
}

interface SidebarProps {
    user?: User;
    activeNav: string;
    setActiveNav: (id: string) => void;
    isCollapsed?: boolean;
    onToggle?: () => void;
}

const DEFAULT_USER: User = {
    name: "Guest User",
    role: "Student",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=guest-user",
};

export function Sidebar({ user, activeNav, setActiveNav, isCollapsed: externalCollapsed, onToggle }: SidebarProps) {
    const [localCollapsed, setLocalCollapsed] = useState(false);
    const isCollapsed = externalCollapsed ?? localCollapsed;
    const safeUser: User = user ?? DEFAULT_USER;

    const handleToggle = () => {
        if (onToggle) {
            onToggle();
        } else {
            setLocalCollapsed((prev) => !prev);
        }
    };

    const navItems = [
        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { id: "practice", icon: Code2, label: "Practice" },
        { id: "community", icon: Users, label: "Community" },
        { id: "resources", icon: Library, label: "Resources" },
    ];

    return (
        <aside
            className={`border-r shrink-0 border-primary-custom/10 bg-background/80 backdrop-blur-xl top-0 h-screen flex flex-col py-6 px-4 transition-all duration-300 ${isCollapsed ? "w-20 items-center" : "w-64 items-start"
                }`}
        >
            {/* Logo */}
            <div className={`flex items-center px-2 mb-10 w-full ${isCollapsed ? "justify-center" : "gap-3"}`}>
                <button
                    type="button"
                    onClick={handleToggle}
                    className="w-10 h-10 bg-primary-custom rounded-lg flex items-center justify-center shadow-lg shadow-primary-custom/20"
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    <SquareTerminal className=" text-white" />
                </button>
                <span className={`text-xl font-bold tracking-tight ${isCollapsed ? "hidden" : "block"}`}>
                    CUHP<span className="text-primary-custom">DEVS</span>
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 w-full space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.id}
                        href={`/${item.id}`}
                        onClick={() => setActiveNav(item.id)}
                        className={`
              flex items-center gap-4 px-3 py-3 rounded-xl transition-all
              ${activeNav === item.id
                                ? "bg-primary-custom/10 text-primary-custom shadow-sm shadow-primary-custom/5"
                                : "text-muted-custom hover:bg-primary-custom/5 hover:text-primary-custom"
                            }
            `}
                    >
                        <item.icon size={20} />
                        <span className={`font-medium ${isCollapsed ? "hidden" : "block"}`}>{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="mt-auto w-full pt-6 border-t border-primary-custom/10">
                <Link
                    href="/settings"
                    onClick={() => setActiveNav("settings")}
                    className={`
              flex items-center gap-4 px-3 py-3 rounded-xl transition-all
              ${activeNav === "settings"
                            ? "bg-primary-custom/10 text-primary-custom shadow-sm shadow-primary-custom/5"
                            : "text-muted-custom hover:bg-primary-custom/5 hover:text-primary-custom"
                        }
            `}
                >
                    <Settings size={20} />
                    <span className={`font-medium ${isCollapsed ? "hidden" : "block"}`}>Settings</span>
                </Link>

                {/* User Profile */}
                <div className="mt-4 flex items-center gap-3 px-3">
                    <img
                        src={safeUser.avatar}
                        alt={safeUser.name}
                        className="w-10 h-10 rounded-full border-2 border-primary-custom/20"
                    />
                    <div className={`${isCollapsed ? "hidden" : "block"} overflow-hidden`}>
                        <p className="text-sm font-bold truncate">{safeUser.name}</p>
                        <p className="text-xs text-muted-custom truncate">{safeUser.role}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}