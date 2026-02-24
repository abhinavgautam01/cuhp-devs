import { ChatRoom, Message } from "@repo/db";

export const getRoomByName = async (roomName: string) => {
  return ChatRoom.findOne({ name: roomName });
};

export const createMessage = async (
  roomId: string,
  senderId: string,
  content: string
) => {
  return Message.create({
    roomId,
    senderId,
    content,
  });
};

export const deleteMessageByOwner = async (
  messageId: string,
  userId: string
) => {
  const message = await Message.findById(messageId);
  if (!message) return null;

  if (message.senderId.toString() !== userId) return null;

  message.isDeleted = true;
  return message.save();
};