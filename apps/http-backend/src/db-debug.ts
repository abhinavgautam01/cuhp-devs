import { connectDB, Language, Problem, DefaultCode } from "@repo/db";
import "dotenv/config";

async function debug() {
    try {
        await connectDB();
        console.log("--- DB DEBUG START ---");

        const languages = await Language.find().lean();
        console.log("LANGUAGES IN DB:", languages.map((l: any) => ({ id: l._id, name: l.name })));

        const problem = await Problem.findOne({ slug: "two-sum" }).lean();
        if (problem) {
            console.log("PROBLEM FOUND:", { id: problem._id, title: problem.title });
            const codes = await DefaultCode.find({ problemId: problem._id }).lean();
            console.log("DEFAULT CODES FOR PROBLEM:", codes.map((c: any) => ({
                id: c._id,
                langId: c.languageId,
                hasCode: !!c.code
            })));
        } else {
            console.log("PROBLEM NOT FOUND: valid-parentheses");
        }

        console.log("--- DB DEBUG END ---");
    } catch (e) {
        console.error("DEBUG ERROR:", e);
    } finally {
        process.exit(0);
    }
}

debug();
