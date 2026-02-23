import { Schema } from "mongoose";

export const LanguageSchema = new Schema(
  {
    name: { type: String, required: true },
    judge0Id: { type: Number, required: true, unique: true },
  },
  { timestamps: true }
);