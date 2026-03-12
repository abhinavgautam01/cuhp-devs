import { serverApiFetch } from "../../lib/server-api";
import { SidebarWrapper } from "../../components/SidebarWrapper";
import { ProblemCard } from "@repo/ui/practice/ProblemCard";
import { PracticeFiltersWrapper } from "../../components/practice/PracticeFiltersWrapper";
import { Metadata } from "next";
import { Flame, Bell, SearchX, ChevronDown } from "../../lib/icons";

export const metadata: Metadata = {
    title: "Practice: Coding Challenges",
    description: "Master algorithms and data structures with curated problems.",
};

interface Problem {
    _id: string;
    title: string;
    slug: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    description: string;
    solved?: number;
    tags?: string[];
}

const DEFAULT_SIDEBAR_USER = {
    name: "Guest User",
    role: "Student",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=guest-user",
};

export default async function PracticePage({
    searchParams,
}: {
    searchParams: { q?: string; category?: string };
}) {
    let sidebarUser = DEFAULT_SIDEBAR_USER;
    let problems: Problem[] = [];

    try {
        // Fetch user for sidebar
        const profile = await serverApiFetch("/user/profile").catch(() => null);
        if (profile) {
            const resolvedName = profile.fullName || profile.name || DEFAULT_SIDEBAR_USER.name;
            sidebarUser = {
                name: resolvedName,
                role: "Student",
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(resolvedName)}`,
            };
        }

        // Fetch problems
        problems = await serverApiFetch("/problems") as Problem[];
        console.log(`[PracticePage] Fetched ${problems.length} problems`);
    } catch (error) {
        console.error("Failed to fetch initial data for Practice page:", error);
    }

    const { q, category } = await searchParams;

    // Server-side filtering (simple for now)
    let filteredProblems = problems;
    if (q) {
        const query = q.toLowerCase();
        filteredProblems = filteredProblems.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
    }

    // Category mapping logic if backend tags are resolved
    // For now, we simulate basic category filtering if tags matched strings
    if (category && category !== "All Topics") {
        // Since tags are ObjectIds in DB right now, we can't easily filter by "Arrays & Strings" 
        // unless we hardcode some slugs or the backend provides string tags.
        // For demonstration, we just show all if filtering mismatch for now.
    }

    // Identify a "daily" problem (random or first one)
    const dailyProblem = filteredProblems.length > 0 ? { ...filteredProblems[0], isDaily: true } : null;
    const otherProblems = filteredProblems.slice(1);

    return (
        <div className="bg-background text-foreground h-screen flex font-sans overflow-hidden transition-colors duration-300">
            <SidebarWrapper user={sidebarUser} />

            <main className="flex-1 flex flex-col min-w-0">
                {/* Header Section */}
                <div className="bg-background/80 backdrop-blur-md border-b border-primary-custom/10 px-8 py-3 flex items-center justify-between z-10">
                    <div className="flex items-center gap-4">
                        <div className=" px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg shadow-gray-500/20">
                            <Flame className="text-white" size={18} />
                            <span className="text-white font-bold text-sm">0-Day Streak</span>
                        </div>
                        <p className="text-sm text-slate-400 hidden sm:block">Solve your daily problem to maintain your ranking!</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Goal</span>
                            <div className="w-24 h-1.5 bg-background border border-primary-custom/5 rounded-full overflow-hidden">
                                <div className="w-2/3 h-full bg-primary-custom rounded-full shadow-[0_0_8px_rgba(var(--primary),0.4)]"></div>
                            </div>
                            <span className="text-xs font-bold text-primary-custom">0/1</span>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-white transition-colors">
                            <Bell size={20} />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 space-y-12 scrollbar-hide">
                    <div className="max-w-7xl mx-auto space-y-12">
                        {/* Search & Tabs (Client-Side Wrapper) */}
                        <PracticeFiltersWrapper
                            activeCategory={category || "All Topics"}
                        />

                        {/* Problems Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {dailyProblem && (
                                <ProblemCard
                                    key={dailyProblem._id}
                                    problem={{
                                        ...(dailyProblem as Problem),
                                        isDaily: true,
                                        successRate: "72.4%"
                                    }}
                                    href={`/problem/${dailyProblem.slug}`}
                                />
                            )}
                            {otherProblems.map(p => (
                                <ProblemCard
                                    key={p._id}
                                    problem={{
                                        ...(p as Problem),
                                        successRate: "85.2%"
                                    }}
                                    href={`/problem/${p.slug}`}
                                />
                            ))}
                            {filteredProblems.length === 0 && (
                                <div className="col-span-full py-20 text-center">
                                    <SearchX className="mx-auto mb-4 text-slate-700" size={64} />
                                    <h2 className="text-xl font-bold text-slate-400">No challenges found matching your search.</h2>
                                    <p className="text-slate-500">Try a different keyword or category.</p>
                                </div>
                            )}
                        </div>

                        {/* Load More */}
                        <div className="flex items-center justify-center py-10">
                            <button className="px-8 py-3 border border-primary-custom/20 bg-primary-custom/5 text-primary-custom rounded-xl font-bold hover:bg-primary-custom/10 transition-all flex items-center gap-2 shadow-lg shadow-primary-custom/5">
                                <span>Load More Challenges</span>
                                <ChevronDown size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
