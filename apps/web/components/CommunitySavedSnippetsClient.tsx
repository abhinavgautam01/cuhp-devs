"use client";

import { useEffect, useState } from "react";
import SavedSnippets from "@repo/ui/community/SavedSnippets";
import { apiFetch } from "../lib/api";

const DEFAULT_SNIPPETS_DATA = {
    snippets: [],
    collections: [],
    recentTags: [],
};

export function CommunitySavedSnippetsClient() {
    const [snippetsData, setSnippetsData] = useState(DEFAULT_SNIPPETS_DATA);

    useEffect(() => {
        let isMounted = true;

        const loadSnippets = async () => {
            try {
                const data = await apiFetch("/user/community/snippets");
                if (isMounted && data) {
                    setSnippetsData(data);
                }
            } catch (error) {
                console.error("Failed to fetch community snippets:", error);
            }
        };

        loadSnippets();

        return () => {
            isMounted = false;
        };
    }, []);

    return <SavedSnippets data={snippetsData} />;
}
