import { Server, Socket } from "socket.io";
import {
  getRoomByName,
  createMessage,
  deleteMessageByOwner,
  RoomManager,
  getUserById,
} from "./chat.service";

export const registerChatEvents = (
  io: Server,
  socket: Socket
) => {
  const roomManager = RoomManager.getInstance();

  // Join room
  socket.on("join-room", async ({ roomName }) => {
    const room = await getRoomByName(roomName);
    if (!room) return;

    const roomId = room._id.toString();
    socket.join(roomId);

    // Track online user
    let fullName = socket.data.user.fullName;
    let email = socket.data.user.email;

    // Fallback for legacy tokens that don't have fullName
    if (!fullName) {
      const user = await getUserById(socket.data.user.id);
      if (user) {
        fullName = user.fullName;
        email = user.email;
      }
    }

    const userData = {
      _id: socket.data.user.id,
      fullName,
      email,
    };
    roomManager.addUser(roomId, userData._id, userData);
    const activity = roomManager.logActivity(userData.fullName || "User", "joined", room.name);

    // Broadcast full online list to the room
    io.to(roomId).emit("room-members-online", {
      roomName,
      onlineMembers: roomManager.getOnlineUsers(roomId),
    });

    // Global broadcasts
    io.emit("global-user-activity", activity);
    io.emit("global-rooms-stats", {
      stats: roomManager.getAllRoomStats()
    });
  });

  // Get initial global stats
  socket.on("get-global-stats", () => {
    socket.emit("global-stats", {
      stats: roomManager.getAllRoomStats(),
      activityLog: roomManager.getActivityLog()
    });
  });

  // Leave room
  socket.on("leave-room", async ({ roomName }) => {
    const room = await getRoomByName(roomName);
    if (!room) return;

    const roomId = room._id.toString();
    socket.leave(roomId);

    roomManager.removeUser(roomId, socket.data.user.id);
    const activity = roomManager.logActivity(socket.data.user.fullName || "User", "left", room.name);

    // Broadcast update
    io.to(roomId).emit("room-members-online", {
      roomName,
      onlineMembers: roomManager.getOnlineUsers(roomId),
    });

    // Global broadcasts
    io.emit("global-user-activity", activity);
    io.emit("global-rooms-stats", {
      stats: roomManager.getAllRoomStats()
    });
  });

  // Disconnect handler to clean up all rooms
  socket.on("disconnect", () => {
    const userId = socket.data.user.id;
    const roomsAffected = roomManager.removeUserFromAllRooms(userId);

    roomsAffected.forEach(roomId => {
      // We don't have the roomName here easily without storing it, 
      // but the client can identify by room if we send it or if they are listening on the room channel.
      io.to(roomId).emit("room-members-online", {
        roomId, // Sending roomId as fallback
        onlineMembers: roomManager.getOnlineUsers(roomId),
      });
    });

    if (roomsAffected.length > 0) {
      io.emit("global-rooms-stats", {
        stats: roomManager.getAllRoomStats()
      });
    }
  });

  // Send message
  socket.on("send-message", async ({ roomName, content }) => {
    const room = await getRoomByName(roomName);
    if (!room) return;

    const message = await createMessage(
      room._id.toString(),
      socket.data.user.id,
      content
    );

    const populated = await message.populate(
      "senderId",
      "fullName email"
    );

    io.to(room._id.toString()).emit("new-message", populated);
  });

  // Delete message
  socket.on("delete-message", async ({ messageId }) => {
    const message = await deleteMessageByOwner(
      messageId,
      socket.data.user.id
    );

    if (!message) return;

    io.to(message.roomId.toString()).emit("message-deleted", {
      messageId,
    });
  });

  // Typing
  socket.on("typing", async ({ roomName }) => {
    const room = await getRoomByName(roomName);
    if (!room) return;
    socket.to(room._id.toString()).emit("user-typing", {
      user: socket.data.user.fullName,
    });
  });

  // Stop typing
  socket.on("stop-typing", async ({ roomName }) => {
    const room = await getRoomByName(roomName);
    if (!room) return;
    socket.to(room._id.toString()).emit("user-stop-typing", {
      user: socket.data.user.fullName,
    });
  });
};