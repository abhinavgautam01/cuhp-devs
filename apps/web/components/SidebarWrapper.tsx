"use client";

import { Sidebar } from "@repo/ui/components/Sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarWrapperProps {
    user: {
        name: string;
        role: string;
        avatar: string;
    };
}

export function SidebarWrapper({ user }: SidebarWrapperProps) {
    const pathname = usePathname();
    const [activeNav, setActiveNav] = useState("community");

    useEffect(() => {
        if (pathname.includes("/dashboard")) setActiveNav("dashboard");
        else if (pathname.includes("/practice")) setActiveNav("practice");
        else if (pathname.includes("/community")) setActiveNav("community");
        else if (pathname.includes("/resources")) setActiveNav("resources");
    }, [pathname]);

    return (
        <Sidebar
            user={user}
            activeNav={activeNav}
            setActiveNav={setActiveNav}
        />
    );
}
