"use client";

import { useState, useEffect, useRef } from "react";
import { useSocket } from "../hooks/useSocket";
import { Send, Hash, Users, Shield } from "lucide-react";

interface Message {
    _id: string;
    content: string;
    senderId: {
        _id: string;
        fullName: string;
        email: string;
    };
    createdAt: string;
}

interface ChatWindowProps {
    roomName: string;
    initialMessages: Message[];
    token: string | null;
    currentUser: any;
}

export function ChatWindow({ roomName, initialMessages, token, currentUser }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const { isConnected, joinRoom, leaveRoom, sendMessage, socket } = useSocket(token);

    useEffect(() => {
        joinRoom(roomName);
        return () => leaveRoom(roomName);
    }, [roomName, isConnected]);

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (message: Message) => {
            setMessages((prev) => [...prev, message]);
        };

        socket.on("new-message", handleNewMessage);
        return () => {
            socket.off("new-message", handleNewMessage);
        };
    }, [socket]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage(roomName, input);
        setInput("");
    };

    return (
        <div className="flex-1 flex flex-col bg-[#0B0B0C] border-l border-[#1337ec]/10 h-[calc(100vh-64px)] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-[#1337ec]/10 flex items-center justify-between bg-[#161618]/50 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#1337ec]/10 rounded-xl flex items-center justify-center text-[#1337ec]">
                        <Hash size={20} />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">{roomName}</h2>
                        <div className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`}></span>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                                {isConnected ? "Connected" : "Reconnecting..."}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-white/40 hover:text-white transition-colors">
                        <Users size={20} />
                    </button>
                    <button className="text-white/40 hover:text-white transition-colors">
                        <Shield size={20} />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg) => (
                    <div key={msg._id} className={`flex gap-4 ${msg.senderId?._id === currentUser?.id ? "flex-row-reverse" : ""}`}>
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 font-bold text-[10px] text-[#1337ec] border border-white/5">
                            {msg.senderId?.fullName?.charAt(0) || "?"}
                        </div>
                        <div className={`max-w-[70%] space-y-1 ${msg.senderId?._id === currentUser?.id ? "items-end text-right" : ""}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-white/60">{msg.senderId?.fullName || "Ghost User"}</span>
                                <span className="text-[10px] text-white/20">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.senderId?._id === currentUser?.id
                                ? "bg-[#1337ec] text-white rounded-tr-none shadow-lg shadow-[#1337ec]/10"
                                : "bg-white/5 text-white/80 rounded-tl-none border border-white/5"
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-6 bg-gradient-to-t from-[#0B0B0C] to-transparent">
                <form onSubmit={handleSend} className="relative group">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Message # ${roomName}`}
                        className="w-full bg-[#161618] border border-[#1337ec]/10 rounded-2xl py-4 pl-6 pr-16 focus:border-[#1337ec]/50 outline-none transition-all placeholder:text-white/20 text-sm shadow-2xl"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#1337ec] text-white rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-lg shadow-[#1337ec]/20"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
}
