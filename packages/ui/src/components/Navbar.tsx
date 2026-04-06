"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "../icons";

type NavbarProps = {
    className?: string;
};

export default function Navbar({ className = "" }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { label: "HOME", href: "/" },
        { label: "ACTIVITIES", href: "/activities" },
        { label: "FEATURES", href: "/features" },
        { label: "DEVS", href: "/devs" },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50 ${className}`}>
            <div className="max-w-400 mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-20">

                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="relative">
                            <div className="w-40 h-25 relative z-10">
                                <img
                                    src="/Eagle2.svg"
                                    alt="CUHP DEVS"
                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 bg-orange-500/5 blur-xl rounded-full group-hover:bg-orange-500/10 transition-colors" />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex text-xl items-center bg-slate-900/40 border border-white/5 rounded-xl ">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative px-6 py-2 text-xs font-bold tracking-widest transition-colors duration-300 ${isActive(link.href) ? "text-cyan-400" : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                {isActive(link.href) && (
                                    <motion.div
                                        layoutId="nav-glow"
                                        className="absolute inset-0 text-cyan-500/10 "
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Right Section Actions */}
                    <div className="hidden lg:flex items-center gap-6">

                        <div className="relative group mb-10 mr-40 ">
                            {/* The container has a fixed width to prevent layout shift */}

                          

                            {/* Login Button - Slides in/Scales up */}
                            <Link
                                href="/signin"
                                className="absolute text-xl w-35 h-8 inset-0 flex items-center justify-center  py-2 text-[10px] f tracking-[0.2em] text-cyan-400 rounded-lg scale-90 translate-y-2 transition-all duration-300 group-hover:opacity-100  shadow-[0_0_20px_rgba(37,99,235,0.4)] "
                            >
                                PORTAL LOGIN
                                <span className="ml-2 animate-pulse">_</span>
                            </Link>

                            {/* Optional: Cyber Decor (Corner borders that appear on hover) */}
                            
                        </div>

                        {/* Contact Us Button */}
                        <Link
                            href="/contact"
                            className="text-md font-bold text-slate-400 border border-slate-700/50 px-4 py-2 rounded-md hover:text-white hover:border-slate-500 tracking-widest transition-all hover:bg-slate-800/30"
                        >
                            CONTACT US
                        </Link>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden text-cyan-400 w-10 h-10 flex items-center justify-center"
                        aria-label="Toggle menu"
                    >
                        <div className="flex flex-col gap-1.5">
                            <span className={`w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-sm font-bold tracking-widest transition-colors ${isActive(link.href)
                                        ? 'text-cyan-400 pl-4 border-l-2 border-cyan-400'
                                        : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <hr className="border-white/5 my-2" />

                            <Link
                                href="/signin"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-center rounded-lg font-bold text-xs tracking-widest text-white hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-500/30"
                            >
                                SIGN IN TO PORTAL
                            </Link>

                            <Link
                                href="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full py-4 border border-slate-700 text-center rounded-lg font-bold text-xs tracking-widest text-slate-400 hover:text-white hover:border-slate-500 transition-all"
                            >
                                CONTACT US
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
