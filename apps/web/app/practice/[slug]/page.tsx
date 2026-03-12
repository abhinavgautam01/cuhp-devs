import { ProblemInterface } from "@repo/ui/practice/ProblemInterface";
import { Metadata } from "next";
import { serverApiFetch } from "../../../lib/server-api";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Coding Challenges",
    description: "Solve coding challenges and master algorithms.",
};

export default async function ProblemPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;

    try {
        const data = await serverApiFetch(`/problems/${slug}`) as {
            problem: any,
            defaultCode: Record<string, string>
        };

        if (!data || !data.problem) return notFound();

        const { problem: found, defaultCode } = data;

        // Map API problem to interface format
        const problem = {
            id: found._id,
            slug: found.slug,
            title: found.title,
            difficulty: found.difficulty,
            description: found.description,
            examples: found.sampleTestCases?.map((tc: any) => ({
                input: tc.input,
                output: tc.output,
            })) || [],
            constraints: (found as any).constraints || [], // Use empty array if missing in DB
            defaultCode: defaultCode || {}
        };

        return <ProblemInterface problem={problem as any} />;
    } catch (e) {
        console.error("Error fetching problem:", e);
        return notFound();
    }
}
