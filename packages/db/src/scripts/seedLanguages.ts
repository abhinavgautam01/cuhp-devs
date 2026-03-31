import "dotenv/config";
import mongoose from "mongoose";
import { Language } from "../models";
import { connectDB } from "../connection";

const LANGUAGES = [
  {
    name: "C++",
    runtime: "cpp",
    version: "17",
    aliases: ["cpp", "c++", "gcc"]
  },
  {
    name: "Javascript",
    runtime: "javascript",
    version: "20",
    aliases: ["js", "javascript", "node", "nodejs"]
  },
  {
    name: "Python",
    runtime: "python",
    version: "3.10",
    aliases: ["py", "python", "python3"]
  },
  {
    name: "Rust",
    runtime: "rust",
    version: "1.68",
    aliases: ["rs", "rust"]
  }
];

async function seed() {
  try {
    await connectDB();
    console.log("Connected to DB for seeding languages...");

    for (const lang of LANGUAGES) {
      await Language.findOneAndUpdate(
        { name: lang.name },
        lang,
        { upsert: true, new: true }
      );
      console.log(`✅ Seeded language: ${lang.name}`);
    }

    console.log("🎉 Languages seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
