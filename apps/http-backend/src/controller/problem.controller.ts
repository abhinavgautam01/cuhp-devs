import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Problem, DefaultCode, Language } from "@repo/db";
import { generateBoilerplates } from "@repo/boilerplate-generator";

export const getProblems = async (_: Request, res: Response) => {
  try {
    const problems = await Problem.find({
      hidden: { $ne: true }, // ✅ include false + undefined
    })
      .select("title slug difficulty solved description")
      .lean();

    return res.status(200).json(problems);
  } catch (err) {
    console.error("Get problems error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getProblemBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const problem = await Problem.findOne({
      slug,
    }).lean();

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // 🔥 load default code for this problem
    let defaultCodes = await DefaultCode.find({
      problemId: problem._id,
    }).lean();

    // 🌍 load languages
    const languages = await Language.find().lean() as any[];

    // 🧠 build map languageId → name
    const langMap = new Map(
      languages.map((l: any) => [l._id.toString(), l.name])
    );

    // 🚀 if missing default code, generate it on the fly
    if (defaultCodes.length === 0) {
      try {
        const structurePath = path.join(__dirname, "..", "..", "..", "problems", (slug as string), "Structure.md");
        console.log(`[ProblemController] Checking structure at: ${structurePath}`);

        if (fs.existsSync(structurePath)) {
          const structureData = fs.readFileSync(structurePath, "utf-8");
          const generated = generateBoilerplates(structureData);
          console.log(`[ProblemController] Generated languages: ${Object.keys(generated).join(", ")}`);
          console.log(`[ProblemController] Available DB languages: ${languages.map(l => l.name).join(", ")}`);

          const newDefaultCodes = [];
          for (const [genName, code] of Object.entries(generated)) {
            if (genName.endsWith("Full")) continue;

            const matchOptions: Record<string, string[]> = {
              cpp: ["c++", "cpp"],
              javascript: ["javascript", "js"],
              python: ["python", "py"],
              rust: ["rust", "rs"]
            };

            const searchOptions = (matchOptions[genName] || [genName]).map(s => s.toLowerCase());

            const lang = languages.find((l: any) => {
              const ln = l.name.toLowerCase();
              return searchOptions.some(opt => ln === opt || ln.includes(opt) || opt.includes(ln));
            });

            if (lang) {
              console.log(`[ProblemController] Found matching lang for ${genName}: ${lang.name}`);
              const dc = await DefaultCode.findOneAndUpdate(
                { problemId: problem._id, languageId: lang._id },
                { code: code as string },
                { upsert: true, returnDocument: "after" }
              ).lean();
              if (dc) newDefaultCodes.push(dc);
            } else {
              console.warn(`[ProblemController] No matching lang found for ${genName} (searched options: ${searchOptions.join(", ")})`);
            }
          }
          defaultCodes = newDefaultCodes;
        } else {
          console.error(`[ProblemController] Structure file not found for slug: ${slug}`);
        }
      } catch (genErr) {
        console.error("Failed to generate boilerplates on the fly:", genErr);
      }
    }

    // 🎯 format for frontend
    const formattedDefaultCode: Record<string, string> = {};

    for (const dc of defaultCodes) {
      const languageId = (dc.languageId as any).toString();
      const langName = langMap.get(languageId);

      if (langName) {
        formattedDefaultCode[langName.toLowerCase()] = dc.code;
      }
    }

    return res.status(200).json({
      problem,
      defaultCode: formattedDefaultCode,
    });

  } catch (err) {
    console.error("Get problem error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};