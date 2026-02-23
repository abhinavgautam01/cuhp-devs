import { Document } from "mongoose";

export interface ILanguage extends Document {
  name: string;
  judge0Id: number;
  createdAt: Date;
  updatedAt: Date;
}