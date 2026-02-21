import mongoose from "mongoose";
import { ILanguage } from "../interfaces/language.interface";
import { LanguageSchema } from "../schemas/language.schema";

export const Language = mongoose.model<ILanguage>(
  "Language",
  LanguageSchema
);