import { Request, Response } from "express";
import {
  Problem,
  Submission,
  SubmissionResult,
  TestCase,
  Language,
  User,
} from "@repo/db";

import { verifyToken } from "../utils";
import { buildExecutableCode } from "../utils/buildExecutableCode";

export const createSubmission = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id: userId } = verifyToken(token);
    const { problemSlug, code, language, status: reqStatus } = req.body;

    if (!problemSlug || !code || !language) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const problem = await Problem.findOne({ slug: problemSlug });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Robust language lookup: check name and aliases (case-insensitive)
    let lang = await Language.findOne({ 
      $or: [
        { name: { $regex: new RegExp(`^${language}$`, "i") } },
        { aliases: { $regex: new RegExp(`^${language}$`, "i") } }
      ]
    });

    // Fallback: substring match if exact match fails
    if (!lang) {
      lang = await Language.findOne({
        $or: [
          { name: { $regex: new RegExp(language, "i") } },
          { aliases: { $regex: new RegExp(language, "i") } }
        ]
      });
    }

    if (!lang) {
      console.error(`Invalid language requested: "${language}"`);
      return res.status(400).json({ message: "Invalid language" });
    }

    // Load testcases
    const testcases = await TestCase.find({
      problemId: problem._id,
    })
      .sort({ order: 1 })
      .lean();

    if (!testcases.length) {
      return res.status(400).json({ message: "No testcases found" });
    }

    // Build executable code
    const finalCode = buildExecutableCode(problem.slug, lang.runtime, code);

    // Initial status - if request says "Accepted" (already verified client-side/runner), we use it.
    // Otherwise fallback to PENDING for official worker execution.
    const initialStatus = reqStatus === "Accepted" ? SubmissionResult.ACCEPTED : SubmissionResult.PENDING;

    // Create submission
    const submission = await Submission.create({
      userId,
      problemId: problem._id,
      code,
      language,
      status: initialStatus,

      // store execution metadata for worker
      runtime: lang.runtime,
      version: lang.version,
      executableCode: finalCode,

      totalTestcases: testcases.length,
      expectedOutputs: testcases.map((tc) => tc.output),
    });

    let newStreak = 0;
    let alreadySolved = false;
    let isNewSolve = false;

    // STREAK LOGIC - Only increment for first-time unique problem solves
    if (initialStatus === SubmissionResult.ACCEPTED) {
      const user = await User.findById(userId);
      if (user) {
        // Check if user has already solved this problem
        const problemIdStr = problem._id.toString();
        alreadySolved = user.solvedProblems.some(
          (solvedId) => solvedId.toString() === problemIdStr
        );

        if (!alreadySolved) {
          // This is a new solve! Add to solvedProblems array
          user.solvedProblems.push(problem._id);
          isNewSolve = true;

          // Only increment streak for first-time solves
          const now = new Date();
          const lastUpdate = user.lastStreakUpdate;
          
          if (!lastUpdate) {
            // First time ever
            user.streak = 1;
          } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const lastDate = new Date(lastUpdate);
            lastDate.setHours(0, 0, 0, 0);
            
            const diffInDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
            
            if (diffInDays === 1) {
              // Consecutive day
              user.streak += 1;
            } else if (diffInDays > 1) {
              // Missed a day, restart from 1
              user.streak = 1;
            }
            // if diffInDays === 0, it's the same day, don't increment
          }
          
          user.lastStreakUpdate = now;
        }
        
        await user.save();
        newStreak = user.streak;
      }
    }

    return res.status(201).json({
      message: "Submission created",
      submissionId: submission._id,
      streak: newStreak,
      alreadySolved,
      isNewSolve
    });

  } catch (err) {
    console.error("Create submission error:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
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

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const getSubmissionById = async (
  req: Request,
  res: Response
) => {
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
      return res.status(404).json({
        message: "Submission not found",
      });
    }

    return res.status(200).json(submission);

  } catch (err) {
    console.error("Get submission error:", err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};