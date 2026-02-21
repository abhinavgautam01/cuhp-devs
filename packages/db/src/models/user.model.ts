import mongoose, { model, models } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { UserSchema } from "../schemas/user.schema";

export const User = mongoose.model<IUser>("User", UserSchema);



