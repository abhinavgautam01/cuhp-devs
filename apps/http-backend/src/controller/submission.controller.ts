import { Request, Response } from "express";
import { Problem, Submission, SubmissionResult, TestCase } from "@repo/db";
import { verifyToken } from "../utils";
import { Language } from "@repo/db";
import { loadTestcases } from "../utils/loadTestcases";
import { createBatchSubmissions } from "../utils/judge0";
import { buildExecutableCode } from "../utils/buildExecutableCode";

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

    const lang = await Language.findOne({ name: language });
    if (!lang) {
      return res.status(400).json({ message: "Invalid language" });
    }

    // 🧠 1️⃣ Create submission immediately
    const submission = await Submission.create({
      userId,
      problemId: problem._id,
      code,
      language,
      status: SubmissionResult.PENDING,
    });

    // 🧠 2️⃣ Load testcases from DB
    const testcases = await TestCase.find({ problemId: problem._id })
      .sort({ order: 1 })
      .lean();

    if (!testcases.length) {
      return res.status(400).json({ message: "No testcases found" });
    }

    // 🧠 3️⃣ Build executable code (boilerplate + user code)
    const finalCode = buildExecutableCode(problem.slug, language, code);

    // 🧠 4️⃣ Prepare Judge0 batch
    const batch = testcases.map((tc) => ({
      source_code: finalCode,
      language_id: lang.judge0Id,
      stdin: tc.input,
    }));

    // 🧠 5️⃣ Send to Judge0
    const judge0Response = await createBatchSubmissions(batch);
    const tokens = judge0Response.map((r: any) => r.token);

    // 🧠 6️⃣ Update submission for worker
    submission.tokens = tokens;
    submission.totalTestcases = testcases.length;
    submission.expectedOutputs = testcases.map((tc) => tc.output);
    submission.status = SubmissionResult.PROCESSING;

    await submission.save();

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
  res: Response,
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
