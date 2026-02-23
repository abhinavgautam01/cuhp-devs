import { Document, Types } from "mongoose";

export interface IDefaultCode extends Document {
  problemId: Types.ObjectId;
  languageId: Types.ObjectId;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}