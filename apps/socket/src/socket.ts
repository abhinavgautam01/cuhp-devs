import { Server } from "socket.io";
import { authenticateSocket } from "./utils/authSocket";
import { registerChatEvents } from "./modules/chat/chat.events";
import { initPostChangeStream } from "./modules/post/post.events";

export const setupSocket = (io: Server) => {
  io.use(authenticateSocket);

  // Initialize change streams
  initPostChangeStream(io);

  io.on("connection", (socket) => {
    console.log("Connected:", socket.data.user.email);

    registerChatEvents(io, socket);
  });
};