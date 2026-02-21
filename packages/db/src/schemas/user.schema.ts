import { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";


// import { UserRole } from "../enums";

// export const UserSchema = new Schema(
//   {
//     email: { type: String, required: true, unique: true },
//     name: String,
//     token: String,
//     password: { type: String, required: true },
//     role: {
//       type: String,
//       enum: Object.values(UserRole),
//       default: UserRole.USER,
//     },
//   },
//   { timestamps: true }
// );

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
    }
  },
  {
    timestamps: true
  }
);