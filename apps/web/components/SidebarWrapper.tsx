"use client";

import { Sidebar } from "@repo/ui/components/Sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "../store/useToastStore";

interface SidebarWrapperProps {
    user: {
        name: string;
        role: string;
        avatar: string;
        handle?: string;
    };
}

export function SidebarWrapper({ user: initialUser }: SidebarWrapperProps) {
    const { user: storeUser, isSidebarCollapsed, toggleSidebarCollapsed } = useAuthStore();
    const pathname = usePathname();
    const [activeNav, setActiveNav] = useState("community");

    useEffect(() => {
        if (pathname.includes("/dashboard")) setActiveNav("dashboard");
        else if (pathname.includes("/practice")) setActiveNav("practice");
        else if (pathname.includes("/community")) setActiveNav("community");
        else if (pathname.includes("/resources")) setActiveNav("resources");
    }, [pathname]);

    // Priority: Store User (Updated) > Initial User (SSR) > Default Fallback
    const currentUser = {
        name: storeUser?.fullName || initialUser.name,
        role: initialUser.role, // Or storeUser?.program etc if available
        avatar: storeUser?.avatar || initialUser.avatar,
        handle: storeUser?.handle || initialUser.handle
    };

    return (
        <Sidebar
            user={currentUser}
            activeNav={activeNav}
            setActiveNav={setActiveNav}
            isCollapsed={isSidebarCollapsed}
            onToggle={toggleSidebarCollapsed}
            onProfileClick={() => {
                if (!currentUser.handle) {
                    toast.error("Please setup a public handle in settings to view your profile dashboard!");
                }
            }}
        />
    );
}

