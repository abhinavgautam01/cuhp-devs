"use client";

import { ProfileOverview } from "@repo/ui";
import { apiFetch } from "../lib/api";

interface ProfileOverviewClientProps {
    user: any;
    isOwnProfile: boolean;
}

export function ProfileOverviewClient({ user, isOwnProfile }: ProfileOverviewClientProps) {
    const handleSearch = async (query: string) => {
        return apiFetch(`/user/suggest?q=${query}`);
    };

    return (
        <ProfileOverview 
            user={user} 
            isOwnProfile={isOwnProfile} 
            onSearch={handleSearch} 
        />
    );
}
