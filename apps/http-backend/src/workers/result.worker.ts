import { Submission } from "@repo/db";
import { getBatch } from "../utils/judge0";
import { SubmissionResult } from "@repo/db";

const POLL_INTERVAL = 2000;

setInterval(async () => {
  const submissions = await Submission.find({
    status: SubmissionResult.PROCESSING,
  })
    .select("+expectedOutputs")
    .limit(10); // ⚡ prevents overload in production

  for (const sub of submissions) {
    try {
      const results = await getBatch(sub.tokens);

      // ⏳ still running
      if (results.some((r: any) => r.status.id <= 2)) continue;

      let passed = 0;
      let maxTime = 0;
      let maxMemory = 0;
      let finalStatus = SubmissionResult.ACCEPTED;
      let failedTestcase = -1;

      for (let i = 0; i < results.length; i++) {
        const r = results[i];

        maxTime = Math.max(maxTime, r.time || 0);
        maxMemory = Math.max(maxMemory, r.memory || 0);

        // ❌ Compilation error
        if (r.status.id === 6) {
          finalStatus = SubmissionResult.COMPILATION_ERROR;
          sub.compileOutput = r.compile_output;
          failedTestcase = i;
          break;
        }

        // ❌ Runtime error
        if ([11, 12].includes(r.status.id)) {
          finalStatus = SubmissionResult.RUNTIME_ERROR;
          failedTestcase = i;
          break;
        }

        // ❌ TLE
        if (r.status.id === 5) {
          finalStatus = SubmissionResult.TIME_LIMIT_EXCEEDED;
          failedTestcase = i;
          break;
        }

        // ❌ Wrong answer
        const expected = sub.expectedOutputs[i]?.trim();
        const actual = (r.stdout || "").trim();

        if (expected !== actual) {
          finalStatus = SubmissionResult.WRONG_ANSWER;
          failedTestcase = i;
          break;
        }

        passed++;
      }

      sub.testcasesPassed = passed;
      sub.time = maxTime;
      sub.memory = maxMemory;
      sub.status = finalStatus;

      if (failedTestcase !== -1) {
        sub.failedTestcase = failedTestcase + 1; // 1-based index for UI
      }

      // store last testcase stdout for UI
      sub.stdout = results[results.length - 1]?.stdout;
      sub.stderr = results[results.length - 1]?.stderr;

      await sub.save();
    } catch (err) {
      console.error("Worker error:", err);
    }
  }
}, POLL_INTERVAL);