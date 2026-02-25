import { Request, Response } from "express";
import { Problem, DefaultCode, Language } from "@repo/db";

export const getProblems = async (_: Request, res: Response) => {
  try {
    const problems = await Problem.find({
      hidden: { $ne: true }, // ✅ include false + undefined
    })
      .select("title slug difficulty solved")
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
    const defaultCodes = await DefaultCode.find({
      problemId: problem._id,
    }).lean();

    // 🌍 load languages
    const languages = await Language.find().lean();

    // 🧠 build map languageId → name
    const langMap = new Map(
      languages.map((l) => [l._id.toString(), l.name])
    );

    // 🎯 format for frontend
    const formattedDefaultCode: Record<string, string> = {};

    for (const dc of defaultCodes) {
      const langName = langMap.get(dc.languageId.toString());

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