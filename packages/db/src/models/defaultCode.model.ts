import mongoose from "mongoose";
import { IDefaultCode } from "../interfaces/defaultCode.interface";
import { DefaultCodeSchema } from "../schemas/defaultCode.schema";

export const DefaultCodeModel = mongoose.model<IDefaultCode>(
  "DefaultCode",
  DefaultCodeSchema
);