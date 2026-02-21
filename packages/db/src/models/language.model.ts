import mongoose from "mongoose";
import { ILanguage } from "../interfaces/language.interface";
import { LanguageSchema } from "../schemas/language.schema";

export const LanguageModel = mongoose.model<ILanguage>(
  "Language",
  LanguageSchema
);