import { Document } from "mongoose";

export interface IChatRoom extends Document {
  name: string;
  createdBy?: any;
  createdAt: Date;
  updatedAt: Date;
}