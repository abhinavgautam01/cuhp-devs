"use client";

export type FeedTab = "Questions" | "Snippet" | "debugging";

interface FeedTabsProps {
    activeTab: FeedTab;
    onTabChange: (tab: FeedTab) => void;
}

export function FeedTabs({ activeTab, onTabChange }: FeedTabsProps) {
    const tabs: FeedTab[] = ["Questions", "Snippet", "debugging"];

    return (
        <div className="flex gap-4 border-b border-white/5 pb-1 mb-2">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`px-4 py-2 font-medium text-sm transition-all capitalize relative ${activeTab === tab
                        ? "text-[#1337ec] font-bold"
                        : "text-white/40 hover:text-white"
                        }`}
                >
                    {tab}
                    {activeTab === tab && (
                        <div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-[#1337ec] shadow-[0_0_8px_rgba(19,55,236,0.5)]" />
                    )}
                </button>
            ))}
        </div>
    );
}
