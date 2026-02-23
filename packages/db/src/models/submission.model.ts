import mongoose from "mongoose";
import { ISubmission } from "../interfaces/submission.interface";
import { SubmissionSchema } from "../schemas/submission.schema";

export const Submission = mongoose.model<ISubmission>(
  "Submission",
  SubmissionSchema
);