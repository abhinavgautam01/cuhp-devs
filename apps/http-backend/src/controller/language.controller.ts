import { Request, Response } from "express";
import { Language } from "@repo/db";

export const getLanguages = async (_: Request, res: Response) => {
  try {
    const languages = await Language.find()
      .select("name runtime version aliases")
      .lean();

    return res.status(200).json(languages);

  } catch (err) {
    console.error("Get languages error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
