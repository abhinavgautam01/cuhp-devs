import { Document, Types } from "mongoose";

export interface ITestCase extends Document {
  problemId: Types.ObjectId;

  input: string;
  output: string;

  isSample: boolean;

  order: number;

  createdAt: Date;
  updatedAt: Date;
}