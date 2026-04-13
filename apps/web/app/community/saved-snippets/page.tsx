import SavedSnippets from "@repo/ui/community/SavedSnippets";
import { serverApiFetch } from "../../../lib/server-api";

export const dynamic = "force-dynamic";

export default async function CommunitySavedSnippetsPage() {
    let snippetsData = {
        snippets: [],
        collections: [],
        recentTags: [],
    };

    try {
        snippetsData = await serverApiFetch("/user/community/snippets");
    } catch (error) {
        console.error("Failed to fetch community snippets:", error);
    }

    return <SavedSnippets data={snippetsData} />;
}
