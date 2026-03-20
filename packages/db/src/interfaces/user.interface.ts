import { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  studentId?: string;
  handle?: string;
  avatar?: string;
  bio?: string;
  theme?: "light" | "dark" | "cyber-orange" | "rose-pine-dawn" | "nord-light" | "solarized-light" | "vaporwave" | "gruvbox-light" | "vesper-light";
  password: string;
  program?: string;
  semester?: string;
  interests: string[];
  onboardingCompleted: boolean;
  savedPosts: string[];
}

