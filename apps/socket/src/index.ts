import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "@repo/db";
import { setupSocket } from "./socket";

// dotenv.config({ path: path.resolve(__dirname, "../http-backend/.env") });
dotenv.config(); // Local fallback/overrides


const app = express();
app.use(cors());
const isProduction = process.env.NODE_ENV === "production";


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



void connectDB().catch((error) => {
  if (isProduction) {
    console.error("Socket service failed to connect to MongoDB", error);
    process.exit(1);
  }


});

const port = Number(process.env.PORT || 4001);

server.listen(port, () => {
  console.log(`Socket server running on port ${port}`);
});
