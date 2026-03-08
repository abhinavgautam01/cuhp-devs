import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "@repo/db";
import { setupSocket } from "./socket";

dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();

const app = express();
app.use(cors());

const server = http.createServer(app);
const allowedOrigins = (process.env.SOCKET_CORS_ORIGINS ?? "http://localhost:3000,http://localhost:3001")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

setupSocket(io);

connectDB();

server.listen(4001, () => {
  console.log("Socket server running on port 4001");
});