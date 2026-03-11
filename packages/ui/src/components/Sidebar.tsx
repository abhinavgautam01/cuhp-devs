"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
    // We ignore external isCollapsed/onToggle since the requested behavior is purely hover-driven now.
    isCollapsed?: boolean;
    onToggle?: () => void;
}

const DEFAULT_USER: User = {
    name: "Guest User",
    role: "Student",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=guest-user",
};

export function Sidebar({ user, activeNav, setActiveNav }: SidebarProps) {
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const safeUser: User = user ?? DEFAULT_USER;

    // Sidebar is collapsed if it is NOT hovered
    const isCollapsed = !isHovered;

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsHovered(false);
        }, 2000);
    };

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const navItems = [
        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { id: "practice", icon: Code2, label: "Practice" },
        { id: "community", icon: Users, label: "Community" },
        { id: "resources", icon: Library, label: "Resources" },
    ];

    return (
        <motion.aside
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            animate={{ width: isCollapsed ? 80 : 256 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`border-r shrink-0 border-primary-custom/10 bg-background/80 backdrop-blur-xl top-0 h-screen flex flex-col py-6 px-4 overflow-hidden`}
        >
            {/* Logo */}
            <div className={`flex items-center px-2 mb-10 w-full ${isCollapsed ? "justify-center" : "gap-3"}`}>
                <div className="w-10 h-10 bg-primary-custom rounded-lg flex items-center justify-center shadow-lg shadow-primary-custom/20 shrink-0">
                    <SquareTerminal className="text-white" />
                </div>
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="text-xl font-bold tracking-tight whitespace-nowrap overflow-hidden"
                        >
                            CUHP<span className="text-primary-custom">DEVS</span>
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <nav className="flex-1 w-full space-y-2 relative">
                {navItems.map((item) => (
                    <Link
                        key={item.id}
                        href={`/${item.id}`}
                        onClick={() => setActiveNav(item.id)}
                        className={`
              flex items-center gap-4 px-3 py-3 rounded-xl transition-colors whitespace-nowrap overflow-hidden
              ${activeNav === item.id
                                ? "bg-primary-custom/10 text-primary-custom shadow-sm shadow-primary-custom/5"
                                : "text-muted-custom hover:bg-primary-custom/5 hover:text-primary-custom"
                            }
            `}
                    >
                        <item.icon size={20} className="shrink-0" />
                        <AnimatePresence>
                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="font-medium whitespace-nowrap"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="mt-auto w-full pt-6 border-t border-primary-custom/10 overflow-hidden">
                <Link
                    href="/settings"
                    onClick={() => setActiveNav("settings")}
                    className={`
              flex items-center gap-4 px-3 py-3 rounded-xl transition-colors whitespace-nowrap
              ${activeNav === "settings"
                            ? "bg-primary-custom/10 text-primary-custom shadow-sm shadow-primary-custom/5"
                            : "text-muted-custom hover:bg-primary-custom/5 hover:text-primary-custom"
                        }
            `}
                >
                    <Settings size={20} className="shrink-0" />
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="font-medium whitespace-nowrap"
                            >
                                Settings
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>

                {/* User Profile */}
                <div className="mt-4 flex items-center gap-3 px-3 whitespace-nowrap">
                    <img
                        src={safeUser.avatar}
                        alt={safeUser.name}
                        className="w-10 h-10 rounded-full border-2 border-primary-custom/20 shrink-0 object-cover"
                    />
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="overflow-hidden"
                            >
                                <p className="text-sm font-bold truncate">{safeUser.name}</p>
                                <p className="text-xs text-muted-custom truncate">{safeUser.role}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.aside>
    );
}