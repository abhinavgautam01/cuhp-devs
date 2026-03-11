// Judge0 code..!
// import { Request, Response } from "express";
// import { Problem, Language, TestCase } from "@repo/db";
// import { buildExecutableCode } from "../utils/buildExecutableCode";
// import { createBatchSubmissions, getBatch } from "../utils/judge0";

// export const runCode = async (req: Request, res: Response) => {
//   try {
//     const { problemSlug, code, language } = req.body;

//     if (!problemSlug || !code || !language) {
//       return res.status(400).json({ message: "Missing fields" });
//     }

//     const problem = await Problem.findOne({ slug: problemSlug });
//     if (!problem) {
//       return res.status(404).json({ message: "Problem not found" });
//     }

//     const lang = await Language.findOne({ name: language });
//     if (!lang) {
//       return res.status(400).json({ message: "Invalid language" });
//     }

//     // 🧠 get sample testcases
//     const testcases = await TestCase.find({
//       problemId: problem._id,
//       isSample: true,
//     })
//       .sort({ order: 1 })
//       .lean();

//     if (!testcases.length) {
//       return res.status(400).json({ message: "No sample testcases" });
//     }

//     // 🧠 build executable code
//     const finalCode = buildExecutableCode(problem.slug, language, code);
//     console.log("finalCode: ", finalCode);
//     // 🧠 prepare Judge0 batch
//     const batch = testcases.map((tc) => ({
//       source_code: finalCode,
//       language_id: lang.judge0Id,
//       stdin: tc.input,
//     }));

//     console.log("LANG:", lang);
//     console.log("LANG ID:", lang.judge0Id);

//     const judge0Response = await createBatchSubmissions(batch);
//     const tokens = judge0Response.map((r: any) => r.token);

//     // ⏳ poll Judge0 until finished
//     let results;

//     while (true) {
//       results = await getBatch(tokens);

//       const allDone = results.every((r: any) => r.status.id > 2);
//       if (allDone) break;

//       await new Promise((r) => setTimeout(r, 1000));
//     }

//     // 🎯 format response for UI
//     const formatted = results.map((r: any, i: number) => ({
//       testcase: i + 1,
//       stdout: r.stdout,
//       stderr: r.stderr,
//       compile_output: r.compile_output,
//       status: r.status.description,
//       time: r.time,
//       memory: r.memory,
//     }));

//     return res.status(200).json({
//       results: formatted,
//     });

//   } catch (err) {
//     console.error("Run code error:", err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

import { Request, Response } from "express";
import { Problem, Language, TestCase } from "@repo/db";
import { buildExecutableCode } from "../utils/buildExecutableCode";
import { executeCode } from "../utils/piston";
import pLimit from "p-limit";

export const runCode = async (req: Request, res: Response) => {
  try {
    const { problemSlug, code, language } = req.body;

    // Validate request
    if (!problemSlug || !code || !language) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Find problem
    const problem = await Problem.findOne({ slug: problemSlug });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Validate language
    const lang = await Language.findOne({ name: language });
    if (!lang) {
      return res.status(400).json({ message: "Invalid language" });
    }

    // Fetch sample testcases
    const testcases = await TestCase.find({
      problemId: problem._id,
      isSample: true,
    })
      .sort({ order: 1 })
      .lean();

    if (!testcases.length) {
      return res.status(400).json({ message: "No sample testcases found" });
    }

    // Build executable code
    const finalCode = buildExecutableCode(problem.slug, lang.runtime, code);

    console.log("Running code for:", problem.slug);
    console.log("Language:", lang.runtime);
    console.log("Version:", lang.version);
    console.log("Total testcases:", testcases.length);

    // Limit parallel executions
    const limit = pLimit(5);

    // Parallel execution with concurrency limit
    const results = await Promise.all(
      testcases.map((tc, i) =>
        limit(async () => {
          try {
            const pistonResult = await executeCode(
              lang.runtime,
              lang.version,
              finalCode,
              tc.input
            );

            const run = pistonResult.run;

            return {
              testcase: i + 1,
              stdout: run.stdout?.trim(),
              stderr: run.stderr?.trim(),
              status: run.code === 0 ? "Accepted" : "Runtime Error",
              time: run.cpu_time,
              memory: run.memory,
            };

          } catch (err) {
            console.error(`Execution failed for testcase ${i + 1}`, err);

            return {
              testcase: i + 1,
              stdout: "",
              stderr: "Execution error",
              status: "Error",
              time: null,
              memory: null,
            };
          }
        })
      )
    );

    return res.status(200).json({
      results,
    });

  } catch (err) {
    console.error("Run code error:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};