

export type FeedTab = "Recent" | "Questions" | "Snippet" | "debugging";

interface FeedTabsProps {
    activeTab: FeedTab;
    onTabChange: (tab: FeedTab) => void;
}

export function FeedTabs({ activeTab, onTabChange }: FeedTabsProps) {
    const tabs: FeedTab[] = ["Recent", "Questions", "Snippet"];

    return (
        <div className="flex gap-4 border-b border-primary-custom/10 pb-1 mb-2">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`px-4 py-2 font-medium text-sm transition-all capitalize relative ${activeTab === tab
                        ? "text-primary-custom font-bold"
                        : "text-slate-500 hover:text-foreground"
                        }`}
                >
                    {tab}
                    {activeTab === tab && (
                        <div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-primary-custom shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                    )}
                </button>
            ))}
        </div>
    );
}
