import { SidebarWrapper } from "../../components/SidebarWrapper";
import Link from "next/link";
import { ReactNode } from "react";
import { MdDynamicFeed, MdGroups, MdBookmarks, MdSearch, MdNotifications } from "../../lib/icons";
import { serverApiFetch } from "../../lib/server-api";

export const dynamic = "force-dynamic";

interface LayoutProps {
  children: ReactNode;
}

type ProfileResponse = {
  fullName?: string;
  name?: string;
  avatar?: string;
  handle?: string;
};

const DEFAULT_SIDEBAR_USER = {
  name: "Guest User",
  role: "Student",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=guest-user",
  handle: "guest",
};

export default async function CommunityLayout({ children }: LayoutProps) {
  let sidebarUser = DEFAULT_SIDEBAR_USER;

  try {
    const profile = (await serverApiFetch("/user/profile")) as ProfileResponse;
    const resolvedName = profile?.fullName || profile?.name || DEFAULT_SIDEBAR_USER.name;

    sidebarUser = {
      name: resolvedName,
      role: "Student",
      avatar: profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(resolvedName)}`,
      handle: profile?.handle || DEFAULT_SIDEBAR_USER.handle,
    };
  } catch (error) {
    console.error("Failed to fetch profile for sidebar:", error);
  }

  return (
    <div className="bg-background text-foreground h-screen flex font-sans overflow-hidden transition-colors duration-300">
      {/* Sidebar */}
      <SidebarWrapper user={sidebarUser} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <nav className="sticky top-0 z-50 border-b border-primary-custom/10 bg-background/80 backdrop-blur-md">
          <div className="px-8 h-16 flex items-center justify-between gap-8">
            {/* Nav Links */}
            <div className="flex items-center gap-8 text-sm font-medium">
              {[
                { id: "feed", icon: MdDynamicFeed, label: "Feed" },
                { id: "chat-rooms", icon: MdGroups, label: "Study Groups" },
                { id: "saved-snippets", icon: MdBookmarks, label: "Saved Snippets" },
              ].map(({ id, icon: Icon, label }) => (
                <Link
                  key={id}
                  href={`/community/${id}`}
                  className="flex items-center gap-2 text-muted-custom hover:text-primary-custom transition-colors"
                >
                  <Icon size={20} />
                  {label}
                </Link>
              ))}
            </div>

            <div className="flex-1 max-w-xl">
              <div className="relative group">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-custom/40 group-focus-within:text-primary-custom" />

                <input
                  type="text"
                  placeholder="Search in community..."
                  className="w-full bg-foreground/[0.03] border border-card-border rounded-full py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary-custom focus:border-primary-custom placeholder:text-muted-custom/30 outline-none transition-all"
                />
              </div>
            </div>

            {/* Notifications */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-primary-custom/10 rounded-full transition relative text-muted-custom hover:text-primary-custom">
                <MdNotifications size={22} />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-background" />
              </button>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 flex flex-col overflow-hidden scrollbar-hide">{children}</main>
      </div>
    </div>
  );
}
