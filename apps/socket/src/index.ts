import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "@repo/db";
import { setupSocket } from "./socket";

dotenv.config();

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    credentials: true,
  },
});

setupSocket(io);

connectDB();

server.listen(4001, () => {
  console.log("Socket server running on port 4001");
});