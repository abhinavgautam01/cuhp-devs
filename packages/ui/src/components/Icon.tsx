import React from "react";
import * as LucideIcons from "../icons";
import { LucideProps } from "lucide-react";

/**
 * A mapping from Material Icon names (or other strings) to Lucide React components.
 */
export const ICON_MAP: Record<string, keyof typeof LucideIcons> = {
    // Common icons
    trending_up: "TrendingUp",
    emoji_events: "Trophy",
    error_outline: "AlertCircle",
    notifications: "Bell",
    rocket_launch: "Rocket",
    layers: "Layers",
    feed: "FileText",
    campaign: "Megaphone",
    local_fire_department: "Flame",
    more_horiz: "MoreHorizontal",
    event: "Calendar",
    settings: "Settings",
    add_circle_outline: "PlusCircle",
    grid_view: "LayoutGrid",
    list: "List",
    add: "Plus",
    search_off: "SearchX",
    keyboard_arrow_down: "ChevronDown",
    dashboard: "LayoutDashboard",
    code: "Code2",
    groups: "Users",
    library_books: "Library",
    school: "GraduationCap",
    pest_control: "Bug",
    military_tech: "Medal",
    neurology: "Brain",
    data_object: "Braces",
    smart_toy: "Bot",
    hub: "Network",
    memory: "Cpu",
    workspace_premium: "Award",
    auto_awesome: "Sparkles",
    api: "Database",
    palette: "Palette",
    // Practice specific
    account_tree: "GitFork",
    psychology: "Brain",
    dynamic_form: "FormInput",
};

interface DynamicIconProps extends LucideProps {
    name: string;
    fallback?: React.ReactNode;
}

export const DynamicIcon = ({ name, fallback, ...props }: DynamicIconProps) => {
    const lucideName = ICON_MAP[name];

    if (!lucideName) {
        return <>{fallback || null}</>;
    }

    const IconComponent = LucideIcons[lucideName] as React.ComponentType<LucideProps>;

    if (!IconComponent) {
        return <>{fallback || null}</>;
    }

    return <IconComponent {...props} />;
};
