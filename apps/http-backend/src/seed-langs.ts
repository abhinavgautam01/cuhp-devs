import { connectDB, Language } from "@repo/db";
import "dotenv/config";

async function seed() {
    try {
        await connectDB();
        const langs = [
            { name: "C++", judge0Id: 54 },
            { name: "Javascript", judge0Id: 63 },
            { name: "Python", judge0Id: 71 },
            { name: "Rust", judge0Id: 73 }
        ];

        for (const l of langs) {
            const exists = await Language.findOne({ name: l.name });
            if (!exists) {
                await Language.create(l);
                console.log(`Created language: ${l.name}`);
            } else {
                console.log(`Language exists: ${l.name}`);
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
