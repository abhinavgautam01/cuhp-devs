import { model, models, Model } from "mongoose";
import { IPost } from "../interfaces/post.interface";
import { PostSchema } from "../schemas/post.schema";

export const Post = (models.Post as Model<IPost>) || model<IPost>("Post", PostSchema);
