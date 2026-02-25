import { Schema } from "mongoose";
import { IChatRoom } from "../interfaces/chat.room.interface";
import { ChatRoomName } from "../enums/index";

export const ChatRoomSchema = new Schema<IChatRoom>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: Object.values(ChatRoomName),
    },
  },
  { timestamps: true }
);