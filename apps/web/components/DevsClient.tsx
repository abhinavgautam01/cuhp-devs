"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@repo/ui/components/Navbar";
import RibbonCardsSection from "./RibbonCardsSection";

export default function DevsClient() {
    const [hideNavbar, setHideNavbar] = useState(false);
    const lastScrollYRef = useRef(0);

    useEffect(() => {
        const update = () => {
            const scrolled = window.scrollY;
            const deltaY = scrolled - lastScrollYRef.current;

            if (scrolled <= 16) {
                setHideNavbar(false);
            } else if (deltaY > 1) {
                setHideNavbar(true);
            } else if (deltaY < -1) {
                setHideNavbar(false);
            }
            lastScrollYRef.current = scrolled;
        };

        update();
        window.addEventListener("scroll", update, { passive: true });

        return () => {
            window.removeEventListener("scroll", update);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden">
            <Navbar
                className={`transition-transform duration-500 ease-out transition-opacity ${
                    hideNavbar
                        ? "-translate-y-full opacity-0 pointer-events-none"
                        : "translate-y-0 opacity-100"
                }`}
            />

            <RibbonCardsSection />
        </div>
    );
}

