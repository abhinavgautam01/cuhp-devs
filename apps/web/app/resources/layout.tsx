import { SidebarWrapper } from "../../components/SidebarWrapper";
import { ReactNode } from "react";
import { MdDynamicFeed, MdGroups, MdBookmarks, MdSearch, MdNotifications } from "../../lib/icons";
import { serverApiFetch } from "../../lib/server-api";
import Link from "next/link";

interface LayoutProps {
    children: ReactNode;
}

type ProfileResponse = {
    fullName?: string;
    name?: string;
    avatar?: string;
};

const DEFAULT_SIDEBAR_USER = {
    name: "Guest User",
    role: "Student",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=guest-user",
};

export default async function ResourcesLayout({ children }: LayoutProps) {
    let sidebarUser = DEFAULT_SIDEBAR_USER;

    try {
        const profile = (await serverApiFetch("/user/profile")) as ProfileResponse;
        const resolvedName = profile?.fullName || profile?.name || DEFAULT_SIDEBAR_USER.name;

        sidebarUser = {
            name: resolvedName,
            role: "Student",
            avatar: profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(resolvedName)}`,
        };
    } catch (error) {
        console.error("Failed to fetch profile for sidebar:", error);
    }

    return (
        <div className="bg-background text-foreground h-screen flex font-sans overflow-hidden transition-colors duration-300">
            {/* Sidebar - Automatically handles active state internally against '/resources' */}
            <SidebarWrapper user={sidebarUser} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 bg-background transition-colors duration-300">
                {/* Top Navigation - customized for resources */}
                <nav className="sticky top-0 z-50 border-b border-primary-custom/10 bg-background/80 backdrop-blur-md">
                    <div className="px-8 h-16 flex items-center justify-between gap-8">
                        <div className="flex items-center gap-8 text-sm font-medium">
                            <span className="font-bold text-lg text-white border-b-2 border-[#1337ec] pb-1">Resources Portal</span>
                        </div>

                        {/* Search */}
                        <div className="flex-1 max-w-xl hidden md:block">
                            <div className="relative group">
                                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1337ec]" />

                                <input
                                    type="text"
                                    placeholder="Search syllabus or skills..."
                                    className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-[#1337ec] focus:border-[#1337ec] placeholder:text-white/20 outline-none transition-all text-white"
                                />
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-[#1337ec]/10 rounded-full transition relative text-white/60 hover:text-white">
                                <MdNotifications size={22} />
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Page Content */}
                {children}
            </div>
        </div>
    );
}
