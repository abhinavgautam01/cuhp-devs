import { model, models } from "mongoose";
import { IMessage } from "../interfaces/message.interface";
import { MessageSchema } from "../schemas/message.schema";

export const Message = models.Message || model<IMessage>("Message", MessageSchema);