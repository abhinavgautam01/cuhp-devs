import { Schema } from "mongoose";
import { IProblem } from "../interfaces/problem.interface";


// import { Difficulty } from "../enums";

// export const ProblemSchema = new Schema(
//   {
//     title: { type: String, required: true },
//     description: String,
//     slug: { type: String, required: true, unique: true },
//     hidden: { type: Boolean, default: true },
//     solved: { type: Number, default: 0 },
//     difficulty: {
//       type: String,
//       enum: Object.values(Difficulty),
//       default: Difficulty.MEDIUM,
//     },
//   },
//   { timestamps: true }
// );

export const ProblemSchema = new Schema<IProblem>(
	{
		title: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		description: {
			type: String,
			required: true
		},
		difficulty: {
			type: String,
			enum: ["EASY", "MEDIUM", "HARD"],
			default: "EASY",
			required: true,
		},
		sampleTestCases: [
			{
				input: String,
				output: String,
			},
		],
		tags: [
			{
				type: Schema.Types.ObjectId, 
				ref: "User",
			  reqired: true,	
			}
		],
		createdBy: { 
			type: Schema.Types.ObjectId, 
			ref: "User", 
			required: true 
		},
  },
  { timestamps: true }	
);