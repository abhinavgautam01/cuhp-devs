"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import {
    AlertCircle,
    Bell,
    Rocket,
    Layers,
    FileText,
    Megaphone,
    Flame,
    Calendar,
    MoreHorizontal
} from "../icons";
import { DynamicIcon } from "../components/Icon";


// ─── Types ─────────────────────────────────────────────────────────────────────

interface User {
    name: string;
    handle?: string;
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

interface DashboardProps {
    isCollapsed?: boolean;
    onToggle?: () => void;
    user?: Partial<User>;
    activeNav: string;
    setActiveNav: (nav: string) => void;
}

export default function Dashboard({ isCollapsed, onToggle, user: userOverride, activeNav, setActiveNav }: DashboardProps) {
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
            <div className="min-h-screen bg-background flex items-center justify-center transition-colors duration-300">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-custom border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-500 font-medium tracking-wide">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (error || !dashboardData) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center max-w-md p-8 bg-background border border-primary-custom/10 rounded-2xl shadow-lg">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="text-red-600" size={32} />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Failed to Load Dashboard</h2>
                    <p className="text-slate-500 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-primary-custom text-white rounded-lg font-medium hover:brightness-110 transition-all"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    const user = userOverride ? { ...dashboardData.user, ...userOverride } : dashboardData.user;
    const { badges, feedItems, events, stats } = dashboardData;
    const xp = user.xp ?? 0;
    const xpTarget = user.xpTarget ?? 1000;
    const xpPercentage = (xp / xpTarget) * 100;

    return (
        <>
            <div className="bg-background text-foreground min-h-screen flex transition-colors duration-300">
                {/* Sidebar */}
                <Sidebar
                    user={user}
                    activeNav={activeNav}
                    setActiveNav={setActiveNav}
                    isCollapsed={isCollapsed}
                    onToggle={onToggle}
                />

                {/* Main Content */}
                <main className="flex-1 flex flex-col lg:flex-row h-screen overflow-y-auto scrollbar-hide">
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
                                <button className="p-2 bg-background/50 rounded-xl border border-primary-custom/10 hover:border-primary-custom transition-colors">
                                    <Bell className="text-slate-400" size={20} />
                                </button>
                                <button className="bg-primary-custom hover:brightness-110 text-white px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-primary-custom/20">
                                    <Rocket size={16} />
                                    Daily Challenge
                                </button>
                            </div>
                        </header>

                        {/* Tech Stack Featured Card */}
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-primary-custom to-blue-400 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                            <div className="relative bg-background/40 rounded-xl p-6 flex flex-col md:flex-row items-center gap-8 backdrop-blur-sm">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-3 py-1 bg-primary-custom/20 text-primary-custom text-xs font-bold rounded-full uppercase tracking-wider">
                                            Tech Stack of the Month
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4">Mastering Modern Web Architecture</h2>
                                    <p className="text-slate-400 mb-6 font-medium">
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
                                                className="flex items-center gap-2 px-3 py-1.5 bg-background/60 border border-primary-custom/5 rounded-lg"
                                            >
                                                <DynamicIcon name={tech.icon} className="text-primary-custom" size={16} />
                                                <span className="text-sm font-medium">{tech.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="w-full md:w-auto px-6 py-2 bg-primary-custom text-white rounded-lg font-medium hover:brightness-110 transition-all shadow-md shadow-primary-custom/10">
                                        Start Path
                                    </button>
                                </div>
                                <div className="w-full md:w-48 aspect-square relative flex items-center justify-center">
                                    <div className="w-32 h-32 bg-primary-custom/10 rounded-full flex items-center justify-center animate-pulse">
                                        <Layers className="text-primary-custom" size={64} />
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
                                        <FileText className="mx-auto mb-2 opacity-20" size={48} />
                                        <p>No recent activity</p>
                                    </div>
                                ) : (
                                    feedItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-4 bg-background/40 rounded-xl flex gap-4 items-start backdrop-blur-sm"
                                        >
                                            {item.user ? (
                                                <img
                                                    src={item.user.avatar}
                                                    alt={item.user.name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 bg-primary-custom/20 rounded-full flex items-center justify-center">
                                                    <Megaphone className="text-primary-custom" size={20} />
                                                </div>
                                            )}

                                            <div className="flex-1">
                                                <p className="text-sm">
                                                    {item.user && <span className="font-bold">{item.user.name} </span>}
                                                    {item.content}{" "}
                                                    {item.highlight && (
                                                        <span className="text-primary-custom font-medium">{item.highlight}</span>
                                                    )}
                                                </p>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    {item.time} • {item.meta}
                                                </p>

                                                {item.type === "achievement" && (
                                                    <div className="mt-3 flex gap-2">
                                                        <button className="px-3 py-1 text-xs bg-primary-custom/10 text-primary-custom rounded-full hover:bg-primary-custom/20 transition-colors">
                                                            Congratulate
                                                        </button>
                                                        <button className="px-3 py-1 text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                                            Discuss
                                                        </button>
                                                    </div>
                                                )}

                                                {item.image && (
                                                    <div className="mt-4 rounded-xl overflow-hidden h-32 w-full bg-background/60 border border-primary-custom/5 relative">
                                                        <img
                                                            src={item.image}
                                                            alt="Announcement"
                                                            className="absolute inset-0 w-full h-full object-cover opacity-50"
                                                        />
                                                        <div className="absolute inset-0 flex items-end p-4 bg-linear-to-t from-background to-transparent">
                                                            <span className="text-foreground text-xs font-medium">
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
                    <section className="w-full lg:w-80 bg-background/20 p-6 border-l border-primary-custom/10 overflow-y-auto space-y-8 scrollbar-hide backdrop-blur-md">
                        {/* Stats Widget */}
                        <div className="bg-background/60 p-6 rounded-2xl shadow-sm backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg">Your Progress</h3>
                                <div className="streak-gradient px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-gray-500/20">
                                    <Flame className="text-white" size={18} />
                                    <span className="text-white font-bold text-sm">{user.streakDays ?? 0} Days</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-muted-custom font-medium uppercase tracking-wider">
                                            Level {user.level ?? 1} Developer
                                        </span>
                                        <span className="text-primary-custom font-bold">
                                            {(user.xp ?? 0).toLocaleString()} / {(user.xpTarget ?? 1000).toLocaleString()} XP
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary-custom rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(var(--primary),0.4)]"
                                            style={{ width: `${xpPercentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <p className="text-xs font-bold text-muted-custom uppercase tracking-widest mb-4">
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
                                            <DynamicIcon name={badge.icon} size={20} />
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-24 p-2 bg-slate-800 text-[10px] rounded hidden group-hover:block text-center text-white z-10">
                                                {badge.label}
                                            </div>
                                        </div>
                                    ))}
                                    {badges.length > 3 && (
                                        <div className="aspect-square rounded-lg bg-background/50 border border-primary-custom/10 flex items-center justify-center text-muted-custom">
                                            <MoreHorizontal size={14} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Events */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold">Upcoming</h3>
                                <Calendar className="text-muted-custom cursor-pointer" size={20} />
                            </div>

                            <div className="space-y-3">
                                {events.length === 0 ? (
                                    <div className="p-4 text-center text-muted-custom text-sm">
                                        No upcoming events
                                    </div>
                                ) : (
                                    events.map((event, index) => (
                                        <div
                                            key={event.id}
                                            className={`p-3 bg-background/30 border-l-4 rounded-r-xl flex items-center gap-4 ${event.isHighlighted
                                                ? "border-primary-custom shadow-md shadow-primary-custom/5"
                                                : "border-slate-300 dark:border-slate-700"
                                                } ${index >= 2 ? "opacity-75" : ""}`}
                                        >
                                            <div className="flex flex-col items-center justify-center w-12 border-r border-slate-700/20 pr-3">
                                                <span className={`text-xs font-bold ${event.isHighlighted ? "text-primary-custom" : "text-muted-custom"}`}>
                                                    {event.month}
                                                </span>
                                                <span className="text-xl font-black">{event.date}</span>
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="text-sm font-bold truncate">{event.title}</p>
                                                <p className="text-xs text-muted-custom">
                                                    {event.time} • {event.location}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Upgrade Promo */}
                        <div className="p-4 bg-primary-custom rounded-2xl text-white relative overflow-hidden group shadow-lg shadow-primary-custom/20">
                            <div className="relative z-10">
                                <h4 className="font-bold mb-1">Upgrade to Nexus+</h4>
                                <p className="text-xs text-blue-100 mb-4">
                                    Get access to premium courses and mentorship.
                                </p>
                                <button className="w-full py-2 bg-white text-primary-custom rounded-lg text-xs font-bold transition-transform active:scale-95 hover:bg-blue-50">
                                    Upgrade Now
                                </button>
                            </div>
                            <DynamicIcon name="workspace_premium" className="absolute -bottom-4 -right-4 text-white/10 group-hover:rotate-12 transition-transform duration-500" size={72} />
                        </div>


                    </section>
                </main>
            </div>
        </>
    );
}
