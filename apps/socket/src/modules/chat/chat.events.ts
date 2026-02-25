import { Server, Socket } from "socket.io";
import {
  getRoomByName,
  createMessage,
  deleteMessageByOwner,
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
};