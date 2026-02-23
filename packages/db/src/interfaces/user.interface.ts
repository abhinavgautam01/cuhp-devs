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
// import { UserRole } from "../enums";

// export interface IUser extends Document {
//   email: string;
//   name?: string;
//   token?: string;
//   password: string;
//   role: UserRole;
//   createdAt: Date;
//   updatedAt: Date;
// }


}

