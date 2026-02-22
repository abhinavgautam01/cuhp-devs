import { model } from "mongoose";
import { ITestCase } from "../interfaces/testcase.interface";
import { TestCaseSchema } from "../schemas/testcase.schema";

export const TestCase = model<ITestCase>("TestCase", TestCaseSchema);