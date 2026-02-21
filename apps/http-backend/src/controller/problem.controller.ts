import { Request, Response } from "express";
import { Problem } from "@repo/db";

export const getProblems = async (_: Request, res: Response) => {
  try {
    const problems = await Problem.find({ hidden: false })
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
      hidden: false,
    }).lean();

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    return res.status(200).json(problem);
  } catch (err) {
    console.error("Get problem error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};