import { Schema } from "mongoose";

export const TestCaseSchema = new Schema(
  {
    problemId: {
      type: Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
      index: true,
    },

    input: {
      type: String,
      required: true,
    },

    output: {
      type: String,
      required: true,
    },

    order: { type: Number, required: true },

    isSample: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);