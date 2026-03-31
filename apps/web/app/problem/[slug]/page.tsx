import { ProblemInterfaceWrapper } from "../../../components/practice/ProblemInterfaceWrapper";
import { Metadata } from "next";
import { serverApiFetch } from "../../../lib/server-api";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Solve Problem",
    description: "Solve coding challenges and master algorithms.",
};

export default async function ProblemPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;

    try {
        const response = await serverApiFetch(`/problems/${slug}`) as any;

        if (!response || !response.problem) {
            return notFound();
        }

        const { problem: dbProblem, defaultCode } = response;

        // Map API problem to interface format
        const problemData = {
            id: dbProblem._id,
            slug: dbProblem.slug,
            title: dbProblem.title,
            difficulty: dbProblem.difficulty as "EASY" | "MEDIUM" | "HARD",
            description: dbProblem.description,
            examples: dbProblem.sampleTestCases || [
                {
                    input: "No examples provided",
                    output: "N/A"
                }
            ],
            testCases: dbProblem.sampleTestCases || [],
            constraints: dbProblem.constraints || ["No constraints provided"],
            defaultCode: defaultCode && Object.keys(defaultCode).length > 0 ? defaultCode : {}
        };

        return <ProblemInterfaceWrapper problemData={problemData} />;
    } catch (e) {
        console.error("Error fetching problem:", e);
        return notFound();
    }
}
