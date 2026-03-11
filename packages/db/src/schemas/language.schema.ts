import { Schema } from "mongoose";
import { ILanguage } from "../interfaces";

// export const LanguageSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     judge0Id: { type: Number, required: true, unique: true },
//   },
//   { timestamps: true }
// );

export const LanguageSchema = new Schema<ILanguage>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    runtime: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
      default: "*",
    },
    aliases: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);