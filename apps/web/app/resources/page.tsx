import { getMockResourcesData } from "../../lib/mock-resources-data";
import { ResourcesClient } from "./ResourcesClient";

export default async function ResourcesPage() {
    // This works fine here because this is a Server Component
    const data = await getMockResourcesData();

    return (
        <main className="flex-1 overflow-y-auto bg-background min-h-screen transition-colors duration-300">
            <div className="max-w-5xl mx-auto p-6 lg:p-10">
                <header className="mb-10 animate-fade-in text-center">
                    <h1 className="text-4xl font-bold mb-2 font-display text-foreground tracking-tight">
                        Resources<span className="text-primary-custom">.</span>
                    </h1>
                    <p className="text-slate-400">
                        Direct access to the best study materials and communities.
                    </p>
                </header>

                {/* We pass the pre-fetched data to the Client Component */}
                <ResourcesClient data={data} />
            </div>
        </main>
    );
}