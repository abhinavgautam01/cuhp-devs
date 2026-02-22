import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { registerMessageHandlers } from "./handlers/message.handler";

export const setupSocket = (io: Server) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) return next(new Error("Unauthorized"));

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET!);
      socket.data.user = user;
      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.data.user.email);

    registerMessageHandlers(io, socket);
  });
};