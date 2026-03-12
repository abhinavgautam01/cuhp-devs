import { ChatRoom, Message, User } from "@repo/db";

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

export const getUserById = async (userId: string) => {
  return User.findById(userId).select("fullName email avatar").lean();
};

export class RoomManager {
  private static instance: RoomManager;
  private roomUsers: Map<string, Map<string, any>> = new Map(); // roomId -> Map<userId, userData>
  private activityLog: any[] = [];
  private readonly MAX_LOG_SIZE = 20;

  private constructor() { }

  static getInstance(): RoomManager {
    if (!RoomManager.instance) {
      RoomManager.instance = new RoomManager();
    }
    return RoomManager.instance;
  }

  logActivity(user: string, action: string, room: string) {
    const activity = {
      user,
      action,
      room,
      time: "Just now" // Simplified for now, could use relative timestamps on client
    };
    this.activityLog.unshift(activity);
    if (this.activityLog.length > this.MAX_LOG_SIZE) {
      this.activityLog.pop();
    }
    return activity;
  }

  getActivityLog() {
    return this.activityLog;
  }

  addUser(roomId: string, userId: string, userData: any) {
    if (!this.roomUsers.has(roomId)) {
      this.roomUsers.set(roomId, new Map());
    }
    this.roomUsers.get(roomId)!.set(userId, userData);
  }

  removeUser(roomId: string, userId: string) {
    if (this.roomUsers.has(roomId)) {
      this.roomUsers.get(roomId)!.delete(userId);
      if (this.roomUsers.get(roomId)!.size === 0) {
        this.roomUsers.delete(roomId);
      }
    }
  }

  getOnlineUsers(roomId: string) {
    const usersMap = this.roomUsers.get(roomId);
    return usersMap ? Array.from(usersMap.values()) : [];
  }

  getAllRoomStats() {
    const stats: Record<string, number> = {};
    this.roomUsers.forEach((users, roomId) => {
      // Map roomId back to roomName if needed, or just return counts by ID
      // For the UI, we probably need canonical names.
      // But let's just return a map of roomId to count first.
      stats[roomId] = users.size;
    });
    return stats;
  }

  // Find all rooms a user is in and remove them
  removeUserFromAllRooms(userId: string): string[] {
    const roomsAffected: string[] = [];
    this.roomUsers.forEach((users, roomId) => {
      if (users.has(userId)) {
        users.delete(userId);
        roomsAffected.push(roomId);
        if (users.size === 0) {
          this.roomUsers.delete(roomId);
        }
      }
    });
    return roomsAffected;
  }
}
