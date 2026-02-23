import { Schema } from "mongoose";

export const DefaultCodeSchema = new Schema(
  {
    problemId: { type: Schema.Types.ObjectId, ref: "Problem", required: true },
    languageId: {
      type: Schema.Types.ObjectId,
      ref: "Language",
      required: true,
    },
    code: { type: String, required: true },
  },
  { timestamps: true }
);

DefaultCodeSchema.index({ problemId: 1, languageId: 1 }, { unique: true });