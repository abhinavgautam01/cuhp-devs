import { Document, Types } from "mongoose";
import { SubmissionResult } from "../enums";

export interface ISubmission extends Document {
  userId: Types.ObjectId;
  problemId: Types.ObjectId;

  code: string;
  language: string;

  status: SubmissionResult;

  tokens: string[];

  totalTestcases: number;
  testcasesPassed: number;

  // 🔥 Needed by worker
  expectedOutputs: string[];

  // Execution outputs
  stdout?: string;
  stderr?: string;
  compileOutput?: string;

  memory?: number;
  time?: number;

  failedTestcase?: number;

  createdAt: Date;
  updatedAt: Date;
}