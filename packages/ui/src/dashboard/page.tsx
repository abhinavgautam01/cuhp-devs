"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface User {
    name: string;
    role: string;
    avatar: string;
    program?: string;
    semester?: string;
    interests?: string[];
    level: number;
    xp: number;
    xpTarget: number;
    streakDays: number;
}

interface Badge {
    id: string;
    icon: string;
    color: string;
    label: string;
}

interface FeedItem {
    id: string;
    type: "achievement" | "announcement" | "share";
    user?: {
        name: string;
        avatar: string;
    };
    content: string;
    highlight?: string;
    time: string;
    meta?: string;
    image?: string;
}

interface Event {
    id: string;
    title: string;
    date: string;
    month: string;
    time: string;
    location: string;
    isHighlighted?: boolean;
}

interface DashboardData {
    user: User;
    badges: Badge[];
    feedItems: FeedItem[];
    events: Event[];
    stats: {
        topPercentile: number;
        activeStudents: number;
        registeredCount: number;
    };
}

// ─── API Functions ─────────────────────────────────────────────────────────────

import { apiFetch } from "../lib/api";

async function fetchDashboardData(): Promise<DashboardData> {
    return apiFetch("/user/dashboard");
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
    const [activeNav, setActiveNav] = useState("dashboard");
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch dashboard data on mount
    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await fetchDashboardData();
                setDashboardData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load dashboard");
                console.error("Dashboard data fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboardData();
    }, []);

    // Loading State
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#101322] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#1337ec] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error || !dashboardData) {
        return (
            <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#101322] flex items-center justify-center">
                <div className="text-center max-w-md p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-lg">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-icons-round text-red-600 text-3xl">error_outline</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Failed to Load Dashboard</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-[#1337ec] text-white rounded-lg font-medium hover:bg-[#1337ec]/90 transition-all"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const { user, badges, feedItems, events, stats } = dashboardData;
    const xpPercentage = (user.xp / user.xpTarget) * 100;

    return (
        <>
            <div className="bg-[#f6f6f8] dark:bg-[#101322] text-slate-900 dark:text-slate-100 min-h-screen flex">
                {/* Sidebar */}
                <Sidebar
                    user={user}
                    activeNav={activeNav}
                    setActiveNav={setActiveNav}
                />

                {/* Main Content */}
                <main className="flex-1 flex flex-col lg:flex-row h-screen overflow-y-auto">
                    {/* Center Feed */}
                    <section className="flex-1 p-6 space-y-8 max-w-4xl mx-auto w-full">
                        {/* Welcome Header */}
                        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
                                <p className="text-slate-500">
                                    You&apos;re in the top {stats.topPercentile}% of this week&apos;s coding sprint.
                                </p>
                                <p className="text-sm text-slate-500 mt-2">
                                    {user.program || "Program not set"} | {user.semester || "Semester not set"}
                                </p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {(user.interests ?? []).slice(0, 4).map((interest) => (
                                        <span
                                            key={interest}
                                            className="px-2 py-1 rounded-full text-xs bg-[#1337ec]/10 text-[#1337ec]"
                                        >
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-[#1337ec]/10 hover:border-[#1337ec] transition-colors">
                                    <span className="material-icons-round text-slate-400">notifications</span>
                                </button>
                                <button className="bg-[#1337ec] hover:bg-[#1337ec]/90 text-white px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2">
                                    <span className="material-icons-round text-sm">rocket_launch</span>
                                    Daily Challenge
                                </button>
                            </div>
                        </header>

                        {/* Tech Stack Featured Card */}
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-[#1337ec] to-blue-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                            <div className="relative bg-white dark:bg-slate-900 border border-[#1337ec]/10 rounded-xl p-6 flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-3 py-1 bg-[#1337ec]/20 text-[#1337ec] text-xs font-bold rounded-full uppercase tracking-wider">
                                            Tech Stack of the Month
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4">Mastering Modern Web Architecture</h2>
                                    <p className="text-slate-400 mb-6">
                                        Explore Next.js, GraphQL, and Tailwind CSS. Complete the learning path to earn the &apos;Architech&apos; badge.
                                    </p>
                                    <div className="flex flex-wrap gap-4 mb-6">
                                        {[
                                            { icon: "auto_awesome", label: "Next.js 14" },
                                            { icon: "api", label: "GraphQL" },
                                            { icon: "palette", label: "Tailwind" },
                                        ].map((tech) => (
                                            <div
                                                key={tech.label}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg"
                                            >
                                                <span className="material-icons-round text-sm text-[#1337ec]">{tech.icon}</span>
                                                <span className="text-sm font-medium">{tech.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full md:w-auto px-6 py-2 bg-[#1337ec] text-white rounded-lg font-medium hover:brightness-110 transition-all">
                                        Start Path
                                    </button>
                                </div>
                                <div className="w-full md:w-48 aspect-square relative flex items-center justify-center">
                                    <div className="w-32 h-32 bg-[#1337ec]/10 rounded-full flex items-center justify-center animate-pulse">
                                        <span className="material-icons-round text-6xl text-[#1337ec]">layers</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Activity Feed */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold">Activity Feed</h3>
                                <button className="text-sm text-[#1337ec] font-medium hover:underline">View All</button>
                            </div>

                            <div className="space-y-4">
                                {feedItems.length === 0 ? (
                                    <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                                        <span className="material-icons-round text-5xl mb-2 opacity-20">feed</span>
                                        <p>No recent activity</p>
                                    </div>
                                ) : (
                                    feedItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-4 bg-white dark:bg-slate-900 border border-[#1337ec]/5 rounded-xl flex gap-4 items-start"
                                        >
                                            {item.user ? (
                                                <img
                                                    src={item.user.avatar}
                                                    alt={item.user.name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 bg-[#1337ec]/20 rounded-full flex items-center justify-center">
                                                    <span className="material-icons-round text-[#1337ec]">campaign</span>
                                                </div>
                                            )}

                                            <div className="flex-1">
                                                <p className="text-sm">
                                                    {item.user && <span className="font-bold">{item.user.name} </span>}
                                                    {item.content}{" "}
                                                    {item.highlight && (
                                                        <span className="text-[#1337ec] font-medium">{item.highlight}</span>
                                                    )}
                                                </p>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    {item.time} • {item.meta}
                                                </p>

                                                {item.type === "achievement" && (
                                                    <div className="mt-3 flex gap-2">
                                                        <button className="px-3 py-1 text-xs bg-[#1337ec]/10 text-[#1337ec] rounded-full hover:bg-[#1337ec]/20 transition-colors">
                                                            Congratulate
                                                        </button>
                                                        <button className="px-3 py-1 text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                                            Discuss
                                                        </button>
                                                    </div>
                                                )}

                                                {item.image && (
                                                    <div className="mt-4 rounded-xl overflow-hidden h-32 w-full bg-slate-100 dark:bg-slate-800 relative">
                                                        <img
                                                            src={item.image}
                                                            alt="Announcement"
                                                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                                                        />
                                                        <div className="absolute inset-0 flex items-end p-4 bg-linear-to-t from-black/80 to-transparent">
                                                            <span className="text-white text-xs font-medium">
                                                                Join {stats.registeredCount}+ students registered
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Right Sidebar */}
                    <section className="w-full lg:w-80 bg-slate-50 dark:bg-slate-900/50 p-6 border-l border-[#1337ec]/10 overflow-y-auto space-y-8 scrollbar-hide">
                        {/* Stats Widget */}
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-[#1337ec]/10 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg">Your Progress</h3>
                                <div className="streak-gradient px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-orange-500/20">
                                    <span className="material-icons-round text-white text-lg">local_fire_department</span>
                                    <span className="text-white font-bold text-sm">{user.streakDays} Days</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-slate-500 font-medium uppercase tracking-wider">
                                            Level {user.level} Developer
                                        </span>
                                        <span className="text-[#1337ec] font-bold">
                                            {user.xp.toLocaleString()} / {user.xpTarget.toLocaleString()} XP
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#1337ec] rounded-full transition-all duration-500"
                                            style={{ width: `${xpPercentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                                    Recent Badges
                                </p>
                                <div className="grid grid-cols-4 gap-3">
                                    {badges.slice(0, 3).map((badge) => (
                                        <div
                                            key={badge.id}
                                            className={`aspect-square rounded-lg flex items-center justify-center group relative cursor-help`}
                                            style={{
                                                backgroundColor: `${badge.color}1a`,
                                                color: badge.color,
                                            }}
                                        >
                                            <span className="material-icons-round">{badge.icon}</span>
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-24 p-2 bg-slate-800 text-[10px] rounded hidden group-hover:block text-center text-white z-10">
                                                {badge.label}
                                            </div>
                                        </div>
                                    ))}
                                    {badges.length > 3 && (
                                        <div className="aspect-square rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                            <span className="material-icons-round text-sm">more_horiz</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Events */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold">Upcoming</h3>
                                <span className="material-icons-round text-slate-400 cursor-pointer">event</span>
                            </div>

                            <div className="space-y-3">
                                {events.length === 0 ? (
                                    <div className="p-4 text-center text-slate-500 dark:text-slate-400 text-sm">
                                        No upcoming events
                                    </div>
                                ) : (
                                    events.map((event, index) => (
                                        <div
                                            key={event.id}
                                            className={`p-3 bg-white dark:bg-slate-900 border-l-4 rounded-r-xl border border-[#1337ec]/5 flex items-center gap-4 ${event.isHighlighted
                                                ? "border-[#1337ec]"
                                                : "border-slate-300 dark:border-slate-700"
                                                } ${index >= 2 ? "opacity-75" : ""}`}
                                        >
                                            <div className="flex flex-col items-center justify-center w-12 border-r border-slate-100 dark:border-slate-800 pr-3">
                                                <span className={`text-xs font-bold ${event.isHighlighted ? "text-[#1337ec]" : "text-slate-400"}`}>
                                                    {event.month}
                                                </span>
                                                <span className="text-xl font-black">{event.date}</span>
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="text-sm font-bold truncate">{event.title}</p>
                                                <p className="text-xs text-slate-500">
                                                    {event.time} • {event.location}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Upgrade Promo */}
                        <div className="p-4 bg-[#1337ec] rounded-2xl text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h4 className="font-bold mb-1">Upgrade to Nexus+</h4>
                                <p className="text-xs text-blue-100 mb-4">
                                    Get access to premium courses and mentorship.
                                </p>
                                <button className="w-full py-2 bg-white text-[#1337ec] rounded-lg text-xs font-bold transition-transform active:scale-95">
                                    Upgrade Now
                                </button>
                            </div>
                            <span className="material-icons-round absolute -bottom-4 -right-4 text-7xl text-white/10 group-hover:rotate-12 transition-transform duration-500">
                                workspace_premium
                            </span>
                        </div>

                        {/* Study Hubs Map */}

                    </section>
                </main>
            </div>
        </>
    );
}
