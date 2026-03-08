import { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  studentId?: string;
  password: string;
  program?: string;
  semester?: string;
  interests: string[];
  onboardingCompleted: boolean;
  savedPosts: string[];
}

