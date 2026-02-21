import { Document } from "mongoose";

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

export interface IUser extends Document {
  fullName: string;
  email: string;
  studentId: string;
  password: string;
}

