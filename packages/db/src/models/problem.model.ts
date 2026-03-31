import mongoose from "mongoose";
import { IProblem } from "../interfaces/problem.interface";
import { ProblemSchema } from "../schemas/problem.schema";

export const Problem = mongoose.model<IProblem>("Problem", ProblemSchema, "problems");