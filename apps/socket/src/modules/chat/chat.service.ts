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

  const normalized = decodeURIComponent(roomName).trim();

  // Check alias
  const aliasKey = normalized.toLowerCase();
  const canonicalName = ROOM_NAME_ALIASES[aliasKey];

  const nameToSearch = canonicalName || normalized;

  return ChatRoom.findOne({ name: nameToSearch });
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
export const createRoom = async (roomName: string, userId: string) => {
  const decoded = decodeURIComponent(roomName).trim();

  // Check if already exists
  const existing = await ChatRoom.findOne({ name: decoded });
  if (existing) return existing;

  const room = await ChatRoom.create({
    name: decoded,
    createdBy: userId,
  });

  return room;
};