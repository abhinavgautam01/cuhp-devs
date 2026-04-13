import { Schema, Document } from "mongoose";

export interface IActivity extends Document {
  user: string;
  action: string;
  room?: string;
  timestamp: Date;
}

export const ActivitySchema = new Schema<IActivity>(
  {
    user: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    room: {
      type: String,
    },
  },
  { timestamps: { createdAt: "timestamp", updatedAt: false } }
);
