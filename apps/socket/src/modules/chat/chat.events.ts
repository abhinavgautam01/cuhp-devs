import { Server, Socket } from "socket.io";
import {
  getRoomByName,
  createMessage,
  deleteMessageByOwner,
  createRoom,
} from "./chat.service";

export const registerChatEvents = (
  io: Server,
  socket: Socket
) => {
  // Join room
  socket.on("join-room", async ({ roomName }) => {
    const room = await getRoomByName(roomName);
    if (!room) return;

    socket.join(room._id.toString());
  });

  // Leave room
  socket.on("leave-room", async ({ roomName }) => {
    const room = await getRoomByName(roomName);
    if (!room) return;

    socket.leave(room._id.toString());
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

  // Create room
socket.on("create-room", async ({ roomName }) => {

  const room = await createRoom(roomName, socket.data.user.id);

  if (!room) return;

  socket.join(room._id.toString());

  io.emit("room-created", {
    name: room.name,
    id: room._id
    });

  });
};