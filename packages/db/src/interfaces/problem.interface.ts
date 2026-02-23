import { Document, Types } from "mongoose";

// import { Difficulty } from "../enums";

// export interface IProblem extends Document {
//   title: string;
//   description: string;
//   slug: string;
//   hidden: boolean;
//   difficulty: Difficulty;
//   solved: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface IProblem extends Document {
	title: string;
	slug: string;
	description: string;
	difficulty: "EASY" | "MEDIUM" | "HARD";
	sampleTestCases: {
    input: string;
    output: string;
  }[];
  tags: Types.ObjectId[];
  createdBy: Types.ObjectId;
}