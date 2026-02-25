import { ChatRoom, Message } from "@repo/db";

const ROOM_NAME_ALIASES: Record<string, string> = {
  "machine learning": "Machine Learning",
  "deep learning": "Deep Learning",
  "data structures & algorithms": "Data Structures & Algorithms",
  blockchain: "Blockchain",
  "blockchain tech": "Blockchain",
  "deep learning mastery": "Deep Learning",
  "rust systems dev": "Data Structures & Algorithms",
  "system design": "Data Structures & Algorithms",
  "web ecosystem": "Deep Learning",
};

export const getRoomByName = async (roomName: string) => {
  const normalized = decodeURIComponent(roomName).trim().toLowerCase();
  const canonicalName = ROOM_NAME_ALIASES[normalized];
  if (!canonicalName) return null;

  return ChatRoom.findOne({ name: canonicalName });
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
