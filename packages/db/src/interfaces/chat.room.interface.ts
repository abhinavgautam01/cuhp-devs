import { Document } from "mongoose";
import { ChatRoomName } from "../enums/index";

export interface IChatRoom extends Document {
  name: ChatRoomName;
  createdAt: Date;
  updatedAt: Date;
}