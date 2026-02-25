"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export default function Navbar() {
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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-none backdrop-blur-md border-b border-cyan-500/20">
            <div className="max-w-400 mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-20">

                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="relative">
                            <div className="w-12 h-12 relative z-10">
                                <svg viewBox="0 0 100 100" className="w-full h-full transition-transform duration-500 group-hover:scale-110">
                                    <defs>
                                        <linearGradient id="phoenixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#ef4444" />
                                            <stop offset="100%" stopColor="#eab308" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M50 10 L35 40 L20 50 L35 55 L30 75 L45 65 L50 85 L55 65 L70 75 L65 55 L80 50 L65 40 Z"
                                        fill="url(#phoenixGradient)"
                                        className="drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]"
                                    />
                                </svg>
                            </div>
                            <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-full group-hover:bg-red-600/40 transition-colors" />
                        </div>

                        <div className="flex flex-col">
                            <span className="text-white text-xl font-black tracking-tighter">CUHP</span>
                            <span className="text-[10px] text-cyan-400 font-bold tracking-[0.3em] uppercase">DEVS</span>
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

                            {/* Icon State - Centered by default */}
                            <div className="absolute inset-0 w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 transition-all duration-500 group-hover:opacity-0 group-hover:scale-75 group-hover:blur-sm">
                                <Terminal className="text-cyan-400 w-5 h-5" />
                            </div>

                            {/* Login Button - Slides in/Scales up */}
                            <Link
                                href="/signin"
                                className="absolute text-xl w-35 h-8 inset-0 flex items-center justify-center px-4 py-2 text-[10px] f tracking-[0.2em] text-cyan-400 rounded-lg opacity-0 scale-90 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 shadow-[0_0_20px_rgba(37,99,235,0.4)] whitespace-nowrap mt-1"
                            >
                                PORTAL LOGIN
                                <span className="ml-2 animate-pulse">_</span>
                            </Link>

                            {/* Optional: Cyber Decor (Corner borders that appear on hover) */}
                            <div className="absolute -inset-[1px] border border-cyan-500/0 rounded-lg group-hover:border-cyan-500/50 transition-colors duration-500 pointer-events-none" />
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