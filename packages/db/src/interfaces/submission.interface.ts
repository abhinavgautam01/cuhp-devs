import { Document, Types } from "mongoose";
import { SubmissionResult } from "../enums";

export interface ISubmission extends Document {
  userId: Types.ObjectId;
  problemId: Types.ObjectId;
  code: string;
  language: string;
  status: SubmissionResult;
  memory?: number;
  time?: number;
  createdAt: Date;
  updatedAt: Date;
}