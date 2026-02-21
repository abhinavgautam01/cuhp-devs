import { Schema } from "mongoose";
import { SubmissionResult } from "../enums";

export const SubmissionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    problemId: { type: Schema.Types.ObjectId, ref: "Problem", required: true },
    code: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(SubmissionResult),
      default: SubmissionResult.PENDING,
    },
    memory: Number,
    time: Number,
  },
  { timestamps: true }
);