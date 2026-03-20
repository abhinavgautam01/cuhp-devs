"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PracticeFilters } from "@repo/ui/practice/PracticeFilters";

interface PracticeFiltersWrapperProps {
    activeCategory: string;
}

export function PracticeFiltersWrapper({ activeCategory }: PracticeFiltersWrapperProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearch = (q: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (q) params.set("q", q);
        else params.delete("q");
        router.push(`?${params.toString()}`);
    };

    const handleCategoryChange = (cat: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("category", cat);
        router.push(`?${params.toString()}`);
    };

    return (
        <PracticeFilters
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            activeCategory={activeCategory}
        />
    );
}
