import { Document, Schema } from "mongoose";
import { PostType } from "../enums";

export interface IComment {
    author: Schema.Types.ObjectId;
    text: string;
    timestamp: Date;
}

export interface IPost extends Document {
    author: Schema.Types.ObjectId;
    content: string;
    type: PostType;
    code?: string;
    imageUrl?: string;
    thumbnailUrl?: string;
    likes: Schema.Types.ObjectId[];
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
}
