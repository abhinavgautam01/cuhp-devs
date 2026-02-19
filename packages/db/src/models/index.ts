import { Schema, model, models, Document } from "mongoose";


export interface IUser extends Document {
  fullName: string;
  email: string;
  studentId: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    studentId: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const User = models.User || model<IUser>("User", UserSchema);