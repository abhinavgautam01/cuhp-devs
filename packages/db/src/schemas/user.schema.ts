import { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";


export const UserSchema = new Schema<IUser>(
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
    },
    program: {
      type: String,
      required: false,
      trim: true,
    },
    semester: {
      type: String,
      required: false,
      trim: true,
    },
    interests: {
      type: [String],
      default: [],
    },
    onboardingCompleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true
  }
);
