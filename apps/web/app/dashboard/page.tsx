"use client";

import DashboardUI from "@repo/ui/dashboard/page";
import { useAuthStore } from "../../store/useAuthStore";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardPage() {
    const { user: storeUser, isSidebarCollapsed, toggleSidebarCollapsed } = useAuthStore();
    const [activeNav, setActiveNav] = useState("dashboard");
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.includes("/dashboard")) setActiveNav("dashboard");
    }, [pathname]);

    // Simple user object for the UI component
    const user = {
        name: storeUser?.fullName || "Developer",
        handle: storeUser?.handle,
        role: "Student",
        avatar: storeUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(storeUser?.fullName || 'Dev')}`
    };

    return (
        <DashboardUI
            user={user}
            isCollapsed={isSidebarCollapsed}
            onToggle={toggleSidebarCollapsed}
            activeNav={activeNav}
            setActiveNav={setActiveNav}
        />
    );
}
