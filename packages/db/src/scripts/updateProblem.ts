import path from "path";
import fs from "fs/promises";
import { Problem, DefaultCode, Language } from "@repo/db";
import { LANGUAGE_MAPPING } from "@repo/common";

const PROBLEMS_PATH = path.resolve(
  process.env.PROBLEMS_PATH || "apps/problems"
);

async function readFileSafe(filePath: string) {
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
}

export async function updateProblem(slug: string) {
  const problemDir = path.join(PROBLEMS_PATH, slug);

  const problemMd = await readFileSafe(
    path.join(problemDir, "Problem.md")
  );

  if (!problemMd) throw new Error("Problem.md not found");

  const problem = await Problem.findOneAndUpdate(
    { slug },
    {
      title: slug,
      slug,
      description: problemMd,
      hidden: false,
    },
    { upsert: true, returnDocument: "after" }
  );

  const languages = await Language.find();

  const languageMap = new Map(
    languages.map((l) => [l.name, l._id])
  );

  await Promise.all(
    Object.entries(LANGUAGE_MAPPING).map(async ([ext, langName]) => {
      const filePath = path.join(
        problemDir,
        "boilerplate",
        `function.${ext}`
      );

      const code = await readFileSafe(filePath);
      if (!code) return;

      const languageId = languageMap.get(langName);
      if (!languageId) return;

      await DefaultCode.findOneAndUpdate(
        { problemId: problem._id, languageId },
        { code },
        { upsert: true, returnDocument: "after" }
      );

      console.log(`✅ ${slug} → ${langName}`);
    })
  );

  console.log(`🎉 Problem synced: ${slug}`);
}