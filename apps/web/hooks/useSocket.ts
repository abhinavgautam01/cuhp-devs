"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4001";

export const useSocket = (token: string | null): {
    socket: Socket | null;
    isConnected: boolean;
    joinRoom: (roomName: string) => void;
    leaveRoom: (roomName: string) => void;
    sendMessage: (roomName: string, content: string) => void;
} => {
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!token) return;

        const socket = io(SOCKET_URL, {
            auth: { token },
            transports: ["websocket"],
            timeout: 10000,
        });

        socketRef.current = socket;

        socket.on("connect", () => {
            setIsConnected(true);
            console.log("Socket connected:", socket.id);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
            console.log("Socket disconnected");
        });

        socket.on("connect_error", (err) => {
            console.error("Socket connection error:", err.message);
        });

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, [token]);

    const joinRoom = (roomName: string) => {
        if (socketRef.current) {
            socketRef.current.emit("join-room", { roomName });
        }
    };

    const leaveRoom = (roomName: string) => {
        if (socketRef.current) {
            socketRef.current.emit("leave-room", { roomName });
        }
    };

    const sendMessage = (roomName: string, content: string) => {
        if (socketRef.current) {
            socketRef.current.emit("send-message", { roomName, content });
        }
    };

    return {
        socket: socketRef.current,
        isConnected,
        joinRoom,
        leaveRoom,
        sendMessage,
    };
};
