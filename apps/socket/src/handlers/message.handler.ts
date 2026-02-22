import { Server, Socket } from "socket.io";
import { Message } from "@repo/db";

export const registerMessageHandlers = (
  io: Server,
  socket: Socket
) => {
  socket.on("send-message", async ({ content }) => {
    const message = await Message.create({
      senderId: socket.data.user.id,
      content,
    });

    const populated = await message.populate(
      "senderId",
      "name email"
    );

    io.emit("new-message", populated);
  });

  socket.on("delete-message", async ({ messageId }) => {
    const message = await Message.findById(messageId);

    if (!message) return;

    if (message.senderId.toString() !== socket.data.user.id)
      return;

    message.isDeleted = true;
    await message.save();

    io.emit("message-deleted", { messageId });
  });
};