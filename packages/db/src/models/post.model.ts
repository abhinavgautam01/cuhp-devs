import { model, models } from "mongoose";
import { IPost } from "../interfaces/post.interface";
import { PostSchema } from "../schemas/post.schema";

export const Post = models.Post || model<IPost>("Post", PostSchema);
