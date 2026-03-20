import { connectDB, Language } from "@repo/db";
import "dotenv/config";

async function seed() {
    try {
        await connectDB();
        const langs = [
            // { name: "C++", judge0Id: 54 },
            // { name: "Javascript", judge0Id: 63 },
            // { name: "Python", judge0Id: 71 },
            // { name: "Rust", judge0Id: 73 }
            {
                name: "Javascript",
                runtime: "javascript",
                version: "18.15.0",
                aliases: ["node-javascript", "node-js", "javascript", "js", "node"],
            },
            {
                name: "C++",
                runtime: "c++",
                version: "10.2.0",
                aliases: ["cpp", "g++", "gcc"],
            },
            {
                name: "Python",
                runtime: "python",
                version: "3.10.0",
                aliases: ["py", "py3", "python3", "python3.10"],
            },
            {
                name: "Rust",
                runtime: "rust",
                version: "1.68.2",
                aliases: ["rs"],
            },
        ];

        for (const l of langs) {
            const exists = await Language.findOne({ name: l.name });
            if (!exists) {
                await Language.create(l);
                console.log(`Created language: ${l.name}`);
            } else {
                //      console.log(`Language exists: ${l.name}`);
                await Language.updateOne({ name: l.name }, l);
                console.log(`Updated language: ${l.name}`);
            }
        }
        console.log("Seeding complete.");
    } catch (e) {
        console.error("Seeding failed:", e);
    } finally {
        process.exit(0);
    }
}

seed();
