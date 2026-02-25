import { Document, Types } from "mongoose";

export interface IMessage extends Document {
  roomId: Types.ObjectId;
  senderId: Types.ObjectId;
  content: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}