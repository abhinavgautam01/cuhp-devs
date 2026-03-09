"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { apiFetch } from "../lib/api";
import { toast } from "../store/useToastStore";
import { useAuthStore } from "../store/useAuthStore";
import {
    Zap,
    ArrowRight,
    User,
    Shield,
    Bell,
    Palette,
    Settings,
    FaGithub,
    CheckCircle2,
    HelpCircle,
    Activity,
    X,
    Camera
} from "../lib/icons";
import { Sidebar } from "@repo/ui/components/Sidebar";

export function SettingsClient() {
    const router = useRouter();
    const { user, setUser, logout: logoutStore, theme, setTheme, isSidebarCollapsed, toggleSidebarCollapsed } = useAuthStore();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState("avataaars");

    // Form states
    const [fullName, setFullName] = useState(user?.fullName || "");
    const [handle, setHandle] = useState(user?.handle || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [avatar, setAvatar] = useState(user?.avatar || "");

    useEffect(() => {
        if (user) {
            setFullName(user.fullName || "");
            setHandle(user.handle || "");
            setBio(user.bio || "");
            setAvatar(user.avatar || "");

            // Detect style from current avatar URL
            if (user.avatar) {
                const styleMatch = user.avatar.match(/7\.x\/([^/]+)\/svg/);
                if (styleMatch && styleMatch[1]) {
                    setSelectedStyle(styleMatch[1]);
                }
            }
        }
    }, [user]);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await apiFetch("/auth/logout", { method: "POST" });
            logoutStore();
            toast.success("Logged out successfully.");
            router.push("/signin");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Logout failed.");
        } finally {
            setIsLoggingOut(false);
        }
    };

    const handleSaveChanges = async () => {
        try {
            setIsSaving(true);
            const response = await apiFetch("/user/profile", {
                method: "PUT",
                body: JSON.stringify({
                    fullName,
                    handle,
                    bio,
                    avatar,
                    theme
                }),
            });
            setUser(response.user);
            toast.success("Settings updated successfully.");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Update failed.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleThemeChange = (newTheme: "light" | "dark" | "cyber-orange") => {
        setTheme(newTheme);
    };

    const AVATAR_SEEDS = [
        "Felix", "Anita", "Aneka", "Tigger", "Milo", "Casper",
        "Oliver", "Lucky", "Daisy", "Cookie", "Peanut", "Shadow",
        "Max", "Bella", "Luna", "Charlie"
    ];

    const AVATAR_STYLES = [
        { id: "avataaars", name: "Human" },
        { id: "bottts", name: "Bots" },
        { id: "big-smile", name: "Smiles" },
        { id: "micah", name: "Micah" },
        { id: "lorelei", name: "Lorelei" }
    ];

    const AvatarSelectorModal = () => (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-background border border-card-border w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-6 border-b border-card-border flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold">Select Avatar</h3>
                        <p className="text-sm text-muted-custom">Choose a visual identity that fits you</p>
                    </div>
                    <button
                        onClick={() => setIsAvatarModalOpen(false)}
                        className="p-2 hover:bg-foreground/10 rounded-full transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Style Switcher */}
                <div className="px-6 py-3 bg-foreground/[0.02] border-b border-card-border flex gap-2 overflow-x-auto scrollbar-hide">
                    {AVATAR_STYLES.map((style) => (
                        <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style.id)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${selectedStyle === style.id ? "bg-primary-custom text-primary-foreground-custom shadow-md shadow-primary-custom/20" : "bg-card-custom border border-card-border text-muted-custom hover:border-primary-custom/50"}`}
                        >
                            {style.name}
                        </button>
                    ))}
                </div>

                <div className="p-6 grid grid-cols-4 gap-4 max-h-[50vh] overflow-y-auto scrollbar-hide">
                    {AVATAR_SEEDS.map((seed) => {
                        const url = `https://api.dicebear.com/7.x/${selectedStyle}/svg?seed=${seed}`;
                        const isSelected = avatar === url;
                        return (
                            <button
                                key={seed}
                                onClick={() => setAvatar(url)}
                                className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all group cursor-pointer ${isSelected ? "border-primary-custom ring-2 ring-primary-custom/20 scale-95" : "border-card-border hover:border-primary-custom/50"}`}
                            >
                                <Image
                                    src={url}
                                    alt={seed}
                                    fill
                                    className="object-cover"
                                />
                                {isSelected && (
                                    <div className="absolute inset-0 bg-primary-custom/10 flex items-center justify-center">
                                        <div className="bg-primary-custom text-primary-foreground-custom rounded-full p-1 shadow-lg">
                                            <CheckCircle2 size={16} />
                                        </div>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
                <div className="p-6 border-t border-card-border flex gap-3">
                    <button
                        onClick={() => setIsAvatarModalOpen(false)}
                        className="flex-1 py-3 font-bold text-muted-custom hover:text-foreground transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => setIsAvatarModalOpen(false)}
                        className="flex-1 py-3 bg-primary-custom text-primary-foreground-custom rounded-xl font-bold hover:bg-primary-hover-custom transition-all shadow-lg shadow-primary-custom/20 cursor-pointer"
                    >
                        Change Avatar
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-background text-foreground min-h-screen flex font-display overflow-hidden transition-colors duration-300">
            {/* Use Common Sidebar component */}
            <Sidebar
                user={{
                    name: user?.fullName || "Guest User",
                    role: user?.program || "Developer",
                    avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.fullName || "Guest"}`
                }}
                activeNav="settings"
                setActiveNav={() => { }} // Controlled by pathname in other pages, here we keep it as settings
                isCollapsed={isSidebarCollapsed}
                onToggle={toggleSidebarCollapsed}
            />

            <main className="flex-1 flex flex-col lg:flex-row h-screen overflow-y-auto scrollbar-hide">
                <section className="flex-1 p-6 md:p-10 space-y-12 max-w-4xl mx-auto w-full">
                    <header>
                        <h1 className="text-3xl font-bold">Account Settings</h1>
                        <p className="text-muted-custom mt-2">Manage your account preferences and security settings.</p>
                    </header>

                    {/* Profile Information */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 pb-2">
                            <User className="text-primary" size={24} />
                            <h2 className="text-xl font-bold">Profile Information</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center gap-4">
                                <div className="relative group">
                                    <div className="w-32 h-32 relative">
                                        <Image
                                            src={avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.fullName || "Guest"}`}
                                            alt="Profile"
                                            fill
                                            className="rounded-full border-4 border-card-custom object-cover shadow-lg"
                                        />
                                    </div>
                                    <button
                                        onClick={() => setIsAvatarModalOpen(true)}
                                        className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        <Camera className="text-white" size={24} />
                                    </button>
                                </div>
                                <p className="text-xs text-muted-custom text-center uppercase tracking-wider font-bold">Modify Avatar</p>
                            </div>
                            <div className="md:col-span-2 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-muted-custom mb-1">Email Address</label>
                                        <input
                                            value={user?.email || ""}
                                            disabled
                                            className="w-full bg-foreground/[0.05] border border-card-border rounded-lg text-muted-custom cursor-not-allowed p-2.5"
                                            type="email"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-muted-custom mb-1">Full Name</label>
                                        <input
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="w-full bg-foreground/[0.03] dark:bg-background/50 border border-card-border rounded-lg text-foreground focus:ring-primary-custom focus:border-primary-custom transition-all p-2.5"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-muted-custom mb-1">Public Handle</label>
                                        <input
                                            value={handle}
                                            onChange={(e) => setHandle(e.target.value)}
                                            className="w-full bg-foreground/[0.03] dark:bg-background/50 border border-card-border rounded-lg text-foreground focus:ring-primary-custom focus:border-primary-custom transition-all p-2.5"
                                            type="text"
                                            placeholder="@username"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-muted-custom mb-1">Bio</label>
                                    <textarea
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        className="w-full bg-foreground/[0.03] dark:bg-card-custom border border-card-border rounded-lg text-foreground focus:ring-primary-custom focus:border-primary-custom transition-all p-2.5 h-24 resize-none"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Security */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 pb-2">
                            <Shield className="text-primary-custom" size={24} />
                            <h2 className="text-xl font-bold">Account Security</h2>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-card-custom border border-card-border rounded-xl">
                            <div>
                                <p className="font-bold">Password</p>
                                <p className="text-sm text-muted-custom">Last changed 3 months ago</p>
                            </div>
                            <button className="mt-4 md:mt-0 text-sm font-bold text-primary-custom hover:text-primary-hover-custom transition-colors cursor-pointer">Update Password</button>
                        </div>
                    </div>



                    {/* Appearance */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 pb-2">
                            <Palette className="text-primary" size={24} />
                            <h2 className="text-xl font-bold">Appearance</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {[
                                { id: "light", name: "Light", desc: "Clean & Bright", bg: "bg-white", border: "border-slate-200", text: "text-slate-900" },
                                { id: "dark", name: "Dark", desc: "Eye Protection", bg: "bg-[#0a0c16]", border: "border-primary/30", text: "text-white" },
                                { id: "cyber-orange", name: "Cyber Orange", desc: "Neon Glow", bg: "bg-[#1a0f00]", border: "border-[#ff6b00]/30", text: "text-[#ff6b00]" },
                                { id: "rose-pine-dawn", name: "Rose Pine", desc: "Ethereal", bg: "bg-[#faf4ed]", border: "border-[#d7827e]/30", text: "text-[#575279]" },
                                { id: "nord-light", name: "Nord Light", desc: "Arctic Frost", bg: "bg-[#e5e9f0]", border: "border-[#5e81ac]/30", text: "text-[#2e3440]" },
                                { id: "solarized-light", name: "Solarized", desc: "Warm Paper", bg: "bg-[#fdf6e3]", border: "border-[#268bd2]/30", text: "text-[#657b83]" },
                                { id: "vaporwave", name: "Vaporwave", desc: "Retro Neon", bg: "bg-[#2d1b4e]", border: "border-[#01cdfe]/30", text: "text-[#ff71ce]" },
                                { id: "gruvbox-light", name: "Gruvbox", desc: "Retro Warm", bg: "bg-[#fbf1c7]", border: "border-[#af3a03]/30", text: "text-[#3c3836]" },
                                { id: "vesper-light", name: "Vesper", desc: "Minimalist", bg: "bg-white", border: "border-black/10", text: "text-black" },
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => handleThemeChange(t.id as any)}
                                    className={`group flex flex-col gap-2 p-3 rounded-xl transition-all text-left relative overflow-hidden cursor-pointer ${theme === t.id ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-background bg-primary/5 shadow-md" : "bg-card-custom border border-card-border hover:bg-foreground/[0.02]"}`}
                                >
                                    <div className={`h-12 w-full ${t.bg} rounded-lg border ${t.border} flex flex-col gap-1 p-1.5 justify-center items-center shadow-inner overflow-hidden`}>
                                        <div className="w-3/4 h-1 bg-foreground/10 rounded-full"></div>
                                        <div className="w-1/2 h-1 bg-foreground/5 rounded-full"></div>
                                    </div>
                                    <div>
                                        <p className={`text-xs font-bold leading-none ${t.text}`}>{t.name}</p>
                                        <p className="text-[10px] text-muted-custom mt-1 truncate">{t.desc}</p>
                                    </div>
                                    {theme === t.id && (
                                        <div className="absolute top-1 right-1">
                                            <CheckCircle2 size={12} className="text-primary" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-10 flex items-center justify-end gap-4">
                        <button
                            onClick={() => router.back()}
                            className="px-6 py-2.5 rounded-xl font-bold text-muted-custom hover:text-foreground transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveChanges}
                            disabled={isSaving}
                            className={`px-8 py-2.5 bg-primary-custom hover:bg-primary-hover-custom text-primary-foreground-custom rounded-xl font-bold shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all flex items-center gap-2 cursor-pointer ${isSaving ? "opacity-70 cursor-not-allowed" : ""}`}
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-primary-foreground-custom/30 border-t-primary-foreground-custom rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : "Save Changes"}
                        </button>
                    </div>
                </section>

                {/* Right Sidebar - Matching Dashboard style */}
                <aside className="w-full lg:w-80 bg-background/20 p-6 border-l border-primary/10 overflow-y-auto scrollbar-hide space-y-8 shrink-0">


                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">Connected Accounts</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-card-custom border border-card-border rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                        <FaGithub className="text-white" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">GitHub</p>
                                        <p className="text-xs text-green-500 font-medium tracking-tight">Connected</p>
                                    </div>
                                </div>
                                <button className="text-slate-500 hover:text-primary transition-colors">
                                    <Settings size={18} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-card-custom border border-card-border rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Google</p>
                                        <p className="text-xs text-muted-custom font-medium tracking-tight">Not linked</p>
                                    </div>
                                </div>
                                <button className="text-primary text-sm font-bold hover:underline">Link</button>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-foreground/[0.03] dark:bg-slate-900/40 border border-slate-200/50 dark:border-transparent rounded-2xl">
                        <h4 className="font-bold mb-4">Need help?</h4>
                        <div className="space-y-4">
                            <button className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors w-full text-left">
                                <HelpCircle size={18} />
                                Help Documentation
                            </button>
                            <button className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors w-full text-left">
                                <Activity size={18} />
                                Contact Support
                            </button>
                            <button className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors w-full text-left">
                                <CheckCircle2 size={18} />
                                Privacy Policy
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full flex items-center justify-center gap-2 py-3 text-red-500 font-bold hover:bg-red-500/10 rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                    >
                        {isLoggingOut ? "Signing Out..." : (
                            <>
                                <ArrowRight className="rotate-180" size={20} />
                                Sign Out
                            </>
                        )}
                    </button>
                </aside>
            </main>

            {isAvatarModalOpen && <AvatarSelectorModal />}
        </div>
    );
}
