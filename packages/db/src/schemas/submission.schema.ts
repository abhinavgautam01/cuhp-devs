import { Schema } from "mongoose";
import { SubmissionResult } from "../enums";

export const SubmissionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    problemId: {
      type: Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
      index: true,
    },

    code: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(SubmissionResult),
      default: SubmissionResult.PENDING,
      index: true,
    },

    // 🔥 Judge0 execution tracking
    tokens: {
      type: [String],
      default: [],
    },

    totalTestcases: {
      type: Number,
      default: 0,
    },

    testcasesPassed: {
      type: Number,
      default: 0,
    },

    // ✅ REQUIRED FOR WORKER COMPARISON
    expectedOutputs: {
      type: [String],
      default: [],
      select: false, // ⚡ hidden from normal queries (important)
    },

    // 📤 Execution outputs (final aggregated)
    stdout: String,
    stderr: String,
    compileOutput: String,

    // ⏱ Performance
    memory: Number,
    time: Number,

    // ⭐ Optional but HIGHLY recommended
    failedTestcase: Number, // which testcase failed first

  },
  { timestamps: true }
);