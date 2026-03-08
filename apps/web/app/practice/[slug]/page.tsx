import { ProblemInterface } from "@repo/ui/practice/ProblemInterface";
import { Metadata } from "next";
import { serverApiFetch } from "../../../lib/server-api";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Solve Problem | NexusCS",
    description: "Solve coding challenges and master algorithms.",
};

const MOCK_PROBLEM = {
    id: "container-with-most-water",
    title: "11. Container With Most Water",
    difficulty: "MEDIUM" as const,
    description: `
        <p>You are given an integer array <code class="bg-slate-800 px-1 rounded text-accent-neon">height</code> of length <code class="bg-slate-800 px-1 rounded text-accent-neon">n</code>. There are <code class="bg-slate-800 px-1 rounded text-accent-neon">n</code> vertical lines drawn such that the two endpoints of the <code class="bg-slate-800 px-1 rounded text-accent-neon">i<sup>th</sup></code> line are <code class="bg-slate-800 px-1 rounded text-accent-neon">(i, 0)</code> and <code class="bg-slate-800 px-1 rounded text-accent-neon">(i, height[i])</code>.</p>
        <p>Find two lines that together with the x-axis form a container, such that the container contains the most water.</p>
        <p>Return <em>the maximum amount of water a container can store.</em></p>
        <p class="font-bold text-slate-100">Notice that you may not slant the container.</p>
    `,
    examples: [
        {
            input: "height = [1,8,6,2,5,4,8,3,7]",
            output: "49",
            explanation: "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49."
        }
    ],
    constraints: [
        "n == height.length",
        "2 <= n <= 10<sup>5</sup>",
        "0 <= height[i] <= 10<sup>4</sup>"
    ],
    defaultCode: {
        python: "class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        # Write your code here\n        pass",
        cpp: "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        // Write your code here\n    }\n};",
        java: "class Solution {\n    public int maxArea(int[] height) {\n        // Write your code here\n    }\n};"
    }
};

const DEFAULT_USER = {
    name: "Alex Rivera",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    streak: 14,
};

export default async function ProblemPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;

    // In a real app, we would fetch problem data from the API
    // problem = await serverApiFetch(\`/problems/\${slug}\`);

    // For this demonstration, we only support the mocked slug
    if (slug !== "container-with-most-water") {
        // Look for problems in API if not mock
        try {
            const problems = await serverApiFetch("/problems") as any[];
            const found = problems.find(p => p.slug === slug);
            if (!found) return notFound();

            // Map API problem to interface format
            const problem = {
                id: found._id,
                title: found.title,
                difficulty: found.difficulty,
                description: found.description,
                examples: found.examples || MOCK_PROBLEM.examples,
                constraints: found.constraints || MOCK_PROBLEM.constraints,
                defaultCode: found.defaultCode || MOCK_PROBLEM.defaultCode
            };
            return <ProblemInterface problem={problem} user={DEFAULT_USER} />;
        } catch (e) {
            return notFound();
        }
    }

    return <ProblemInterface problem={MOCK_PROBLEM} user={DEFAULT_USER} />;
}
