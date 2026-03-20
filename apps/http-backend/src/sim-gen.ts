import { connectDB, Language, Problem, DefaultCode } from "@repo/db";
import { generateBoilerplates } from "@repo/boilerplate-generator";
import fs from "fs";
import path from "path";
import "dotenv/config";

async function simulate() {
    try {
        await connectDB();
        const slug = "valid-parentheses";
        const problem = await Problem.findOne({ slug }).lean();
        if (!problem) {
            console.error("Problem not found");
            return;
        }

        const languages = await Language.find().lean() as any[];

        // Find structure path like the controller does
        // Apps/http-backend/src/controller/problem.controller.ts -> simulation is in apps/http-backend/src/sim-gen.ts
        const structurePath = path.join(__dirname, "..", "..", "problems", slug, "Structure.md");
        console.log(`Checking structure at: ${structurePath}`);

        if (fs.existsSync(structurePath)) {
            const structureData = fs.readFileSync(structurePath, "utf-8");
            console.log("Structure Data loaded.");
            const generated = generateBoilerplates(structureData);
            console.log("Generated languages:", Object.keys(generated));

            const nameMap: Record<string, string> = {
                cpp: "C++",
                javascript: "Javascript",
                python: "Python",
                rust: "Rust"
            };

            for (const [genName, code] of Object.entries(generated)) {
                if (genName.endsWith("Full")) continue;

                const dbName = nameMap[genName];
                const searchName = (dbName || genName).toLowerCase();

                const lang = languages.find((l: any) => {
                    const ln = l.name.toLowerCase();
                    return ln === searchName || ln.includes(searchName) || searchName.includes(ln);
                });

                if (lang) {
                    console.log(`MATCH FOUND: ${genName} -> ${lang.name} (${lang._id})`);
                } else {
                    console.warn(`NO MATCH FOUND for ${genName} (searched: ${searchName})`);
                    console.log("Available DB names:", languages.map(l => l.name));
                }
            }
        } else {
            console.error("Structure file NOT FOUND at " + structurePath);
            // Let's see what's in apps/problems
            const appsProblems = path.join(__dirname, "..", "..", "problems");
            if (fs.existsSync(appsProblems)) {
                console.log("Contents of apps/problems:", fs.readdirSync(appsProblems));
            } else {
                console.error("apps/problems directory NOT FOUND at " + appsProblems);
            }
        }
    } catch (e) {
        console.error("Simulation failed:", e);
    } finally {
        process.exit(0);
    }
}

simulate();
