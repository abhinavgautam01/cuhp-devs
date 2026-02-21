import { Request, Response } from "express";
import { Problem, Submission } from "@repo/db";
import { verifyToken } from "../utils";

export const createSubmission = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id: userId } = verifyToken(token);

    const { problemSlug, code, language } = req.body;

    if (!problemSlug || !code || !language) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const problem = await Problem.findOne({ slug: problemSlug });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const submission = await Submission.create({
      userId,
      problemId: problem._id,
      code,
      status: "PENDING",
    });

    return res.status(201).json({
      message: "Submission created",
      submissionId: submission._id,
    });

  } catch (err) {
    console.error("Create submission error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserSubmissionsForProblem = async (
  req: Request,
  res: Response
) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id: userId } = verifyToken(token);
    const { slug } = req.params;

    const problem = await Problem.findOne({ slug });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const submissions = await Submission.find({
      userId,
      problemId: problem._id,
    })
      .select("status language createdAt")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return res.status(200).json(submissions);

  } catch (err) {
    console.error("Get user submissions error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSubmissionById = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id: userId } = verifyToken(token);
    const { id } = req.params;

    const submission = await Submission.findOne({
      _id: id,
      userId,
    }).lean();

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    return res.status(200).json(submission);

  } catch (err) {
    console.error("Get submission error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};