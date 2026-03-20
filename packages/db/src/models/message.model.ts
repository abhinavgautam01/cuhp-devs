import { model, models, Model } from "mongoose";
import { IMessage } from "../interfaces/message.interface";
import { MessageSchema } from "../schemas/message.schema";

export const Message = (models.Message as Model<IMessage>) || model<IMessage>("Message", MessageSchema);