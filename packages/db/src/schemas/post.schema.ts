import { Schema } from "mongoose";
import { IPost, IComment } from "../interfaces/post.interface";
import { PostType } from "../enums";

const CommentSchema = new Schema<IComment>({
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export const PostSchema = new Schema<IPost>(
    {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        type: { type: String, enum: Object.values(PostType), required: true },
        code: { type: String },
        imageUrl: { type: String },
        thumbnailUrl: { type: String },
        likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
        comments: [CommentSchema]
    },
    { timestamps: true }
);
