import { model, models, Model } from "mongoose";
import { ChatRoomSchema } from "../schemas/chatroom.schema";
import { IChatRoom } from "../interfaces/chat.room.interface";

// 'models.ChatRoom' prevents re-compiling the model during Next.js HMR/Hot Reloads
export const ChatRoom = (models.ChatRoom as Model<IChatRoom>) || model<IChatRoom>("ChatRoom", ChatRoomSchema);