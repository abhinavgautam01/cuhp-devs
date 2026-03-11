import { connectDB, Submission, TestCase } from "@repo/db";
import { SubmissionResult } from "@repo/db";
import { executeCode } from "../utils/piston";
import "dotenv/config"

async function startWorker() {

  await connectDB();

  console.log("Worker DB connected");

  runWorker();
}

async function runWorker() {

  const POLL_INTERVAL = 2000;

  setInterval(async () => {

    const submissions = await Submission.find({
      status: SubmissionResult.PENDING
    })
    .select("+expectedOutputs +executableCode")
    .limit(5);

    for (const sub of submissions) {

      console.log("Processing submission:", sub._id);

      try {

        sub.status = SubmissionResult.PROCESSING;
        await sub.save();

        const testcases = await TestCase.find({
          problemId: sub.problemId
        }).sort({ order: 1 });

        let passed = 0;

        for (let i = 0; i < testcases.length; i++) {

          const tc = testcases[i];
          if(!tc){
            return
          }
          const result = await executeCode(
            sub.runtime,
            sub.version,
            sub.executableCode,
            tc.input
          );

          const expected = sub.expectedOutputs[i]?.trim();
          const actual = result.run.stdout?.trim();

          if (expected !== actual) {

            sub.status = SubmissionResult.WRONG_ANSWER;
            sub.failedTestcase = i + 1;

            await sub.save();
            return;
          }

          passed++;
        }

        sub.testcasesPassed = passed;
        sub.status = SubmissionResult.ACCEPTED;

        await sub.save();

      } catch (err) {

        console.error("Worker error:", err);

        sub.status = SubmissionResult.INTERNAL_ERROR;
        await sub.save();
      }
    }

  }, POLL_INTERVAL);
}

startWorker();