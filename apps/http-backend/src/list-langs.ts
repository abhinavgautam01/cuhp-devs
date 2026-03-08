import { connectDB, Language } from "@repo/db";
import "dotenv/config";

async function run() {
    await connectDB();
    const langs = await Language.find().lean();
    for (const l of langs) {
        console.log(`LANG: "${l.name}" ID: ${l._id}`);
    }
    process.exit(0);
}
run();
