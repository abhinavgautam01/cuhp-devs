"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("./src");
async function diag() {
    await (0, src_1.connectDB)();
    console.log("--- LANGUAGES ---");
    const langs = await src_1.Language.find();
    langs.forEach(l => console.log(`${l._id}: ${l.name}`));
    console.log("\n--- PROBLEMS ---");
    const probs = await src_1.Problem.find().limit(5);
    probs.forEach(p => console.log(`${p._id}: ${p.slug}`));
    console.log("\n--- DEFAULT CODES ---");
    const codes = await src_1.DefaultCode.find().limit(10);
    codes.forEach(c => console.log(`Problem: ${c.problemId}, Lang: ${c.languageId}`));
    process.exit(0);
}
diag();
