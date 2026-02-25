import { useState } from "react";
import Link from "next/link";
import { SquareTerminal } from "lucide-react";

interface User {
    name: string;
    role: string;
    avatar: string;
}

interface SidebarProps {
    user?: User;
    activeNav: string;
    setActiveNav: (id: string) => void;
}

const DEFAULT_USER: User = {
    name: "Guest User",
    role: "Student",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=guest-user",
};

export function Sidebar({ user, activeNav, setActiveNav }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const safeUser: User = user ?? DEFAULT_USER;

    return (
        <aside
            className={`border-r  border-[#1337ec]/10 bg-white dark:bg-[#101322]  top-0 h-screen flex flex-col py-6 px-4 transition-all duration-300 ${
                isCollapsed ? "w-20 items-center" : "w-64 items-start"
            }`}
        >
            {/* Logo */}
            <div className={`flex items-center px-2 mb-10 w-full ${isCollapsed ? "justify-center" : "gap-3"}`}>
                <button
                    type="button"
                    onClick={() => setIsCollapsed((prev) => !prev)}
                    className="w-10 h-10 bg-[#1337ec] rounded-lg flex items-center justify-center"
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    <SquareTerminal className=" text-white" />
                </button>
                <span className={`text-xl font-bold tracking-tight ${isCollapsed ? "hidden" : "block"}`}>
                    CUHP<span className="text-[#1337ec]">DEVS</span>
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 w-full space-y-2">
                {[
                    { id: "dashboard", icon: "dashboard", label: "Dashboard" },
                    { id: "practice", icon: "code", label: "Practice" },
                    { id: "community", icon: "groups", label: "Community" },
                    { id: "resources", icon: "library_books", label: "Resources" },
                ].map((item) => (
                    <Link
                        key={item.id}
                        href={`/${item.id}`}
                        onClick={() => setActiveNav(item.id)}
                        className={`
              flex items-center gap-4 px-3 py-3 rounded-xl transition-all
              ${activeNav === item.id
                                ? "bg-[#1337ec]/10 text-[#1337ec]"
                                : "text-slate-400 hover:bg-[#1337ec]/5 hover:text-[#1337ec]"
                            }
            `}
                    >
                        <span className="material-icons-round">{item.icon}</span>
                        <span className={`font-medium ${isCollapsed ? "hidden" : "block"}`}>{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="mt-auto w-full pt-6 border-t border-[#1337ec]/10">
                <Link
                    href="/settings"
                    className="flex items-center gap-4 px-3 py-3 text-slate-400 hover:bg-[#1337ec]/5 hover:text-[#1337ec] rounded-xl transition-all"
                >
                    <span className="material-icons-round">settings</span>
                    <span className={`font-medium ${isCollapsed ? "hidden" : "block"}`}>Settings</span>
                </Link>

                {/* User Profile */}
                <div className="mt-4 flex items-center gap-3 px-3">
                    <img
                        src={safeUser.avatar}
                        alt={safeUser.name}
                        className="w-10 h-10 rounded-full border-2 border-[#1337ec]/20"
                    />
                    <div className={`${isCollapsed ? "hidden" : "block"} overflow-hidden`}>
                        <p className="text-sm font-bold truncate">{safeUser.name}</p>
                        <p className="text-xs text-slate-500 truncate">{safeUser.role}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}