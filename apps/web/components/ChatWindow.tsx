"use client";

import { useState, useEffect, useRef } from "react";
import { useSocket } from "../hooks/useSocket";
import { Send, Hash, Users, Shield, Plus, Smile, Image as ImageIcon, Bell, ChevronDown } from "lucide-react";

interface Message {
    _id: string;
    content: string;
    senderId: {
        _id: string;
        fullName: string;
        email: string;
    };
    createdAt: string;
    isOptimistic?: boolean;
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
    const [isTyping, setIsTyping] = useState(false);
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const [mounted, setMounted] = useState(false);
    const [showNewMessageBanner, setShowNewMessageBanner] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { isConnected, joinRoom, leaveRoom, sendMessage, socket } = useSocket(token);

    useEffect(() => {
        setMounted(true);
        // Initial scroll to bottom
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, []);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (scrollRef.current) {
            // Only auto-scroll if user is already near the bottom (optional refinement)
            // For now, mirroring user's request: auto scroll to recent
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: mounted ? "smooth" : "auto",
            });
        }
    }, [messages, typingUsers, mounted]);

    const formatTime = (iso: string) => {
        if (!mounted) return "";
        try {
            return new Intl.DateTimeFormat(undefined, {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            }).format(new Date(iso));
        } catch (e) { return "" }
    };

    const formatDateDivider = (iso: string) => {
        if (!mounted) return "";
        try {
            return new Intl.DateTimeFormat(undefined, {
                month: "long",
                day: "numeric",
                year: "numeric"
            }).format(new Date(iso));
        } catch (e) { return "" }
    };

    const getUtcDateKey = (iso: string) => {
        try {
            return new Date(iso).toISOString().slice(0, 10);
        } catch (e) {
            return "";
        }
    };

    useEffect(() => {
        joinRoom(roomName);
        return () => leaveRoom(roomName);
    }, [roomName, isConnected]);

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (message: Message) => {
            setMessages((prev) => {
                const filtered = prev.filter(m => !(m.isOptimistic && m.content === message.content && m.senderId._id === message.senderId._id));
                return [...filtered, message];
            });
        };

        const handleTyping = ({ user }: { user: string }) => {
            if (user !== currentUser?.name) {
                setTypingUsers(prev => prev.includes(user) ? prev : [...prev, user]);
            }
        };

        const handleStopTyping = ({ user }: { user: string }) => {
            setTypingUsers(prev => prev.filter(u => u !== user));
        };

        socket.on("new-message", handleNewMessage);
        socket.on("user-typing", handleTyping);
        socket.on("user-stop-typing", handleStopTyping);

        return () => {
            socket.off("new-message", handleNewMessage);
            socket.off("user-typing", handleTyping);
            socket.off("user-stop-typing", handleStopTyping);
        };
    }, [socket, currentUser]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const optimisticMsg: Message = {
            _id: `temp-${Date.now()}`,
            content: input.trim(),
            senderId: {
                _id: currentUser?.id || "temp-id",
                fullName: currentUser?.name || "You",
                email: ""
            },
            createdAt: new Date().toISOString(),
            isOptimistic: true
        };

        setMessages(prev => [...prev, optimisticMsg]);
        sendMessage(roomName, input.trim());
        setInput("");

        if (socket) {
            socket.emit("stop-typing", { roomName });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        if (socket && !isTyping && e.target.value.trim()) {
            setIsTyping(true);
            socket.emit("typing", { roomName });
            setTimeout(() => {
                setIsTyping(false);
                socket.emit("stop-typing", { roomName });
            }, 3000);
        }
    };

    const renderMessageContent = (content: string) => {
        // Simple mention highlight for now
        const parts = content.split(/(@\w+)/g);
        return parts.map((part, i) => {
            if (part.startsWith("@")) {
                return (
                    <span key={i} className="bg-[#1337ec]/20 text-[#1337ec] px-1 rounded font-medium cursor-pointer hover:underline">
                        {part}
                    </span>
                );
            }
            return part;
        });
    };

    return (
        <div className="flex-1 flex flex-col bg-[#1A1B1E] h-14 overflow-hidden relative">
            {/* Header */}
            <div className="px-6 py-3 border-b border-white/[0.05] flex items-center justify-between bg-[#1A1B1E] z-20">
                <div className="flex items-center gap-3">
                    <Hash size={24} className="text-white/40" />
                    <div>
                        <h2 className="font-bold text-base text-white/90">{roomName}</h2>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-white/60">
                    <Users size={20} className="cursor-pointer hover:text-white transition-colors" />
                    <Shield size={20} className="cursor-pointer hover:text-white transition-colors" />
                </div>
            </div>



            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar">
                <div className="py-4 space-y-0.5">
                    {messages.map((msg, i) => {
                        const prevMsg = messages[i - 1];
                        const showDateDivider = !prevMsg ||
                            getUtcDateKey(msg.createdAt) !== getUtcDateKey(prevMsg.createdAt);

                        return (
                            <div key={msg._id}>
                                {showDateDivider && (
                                    <div className="flex items-center gap-4 my-6 px-6">
                                        <div className="flex-1 h-px bg-white/[0.05]" />
                                        <span suppressHydrationWarning className="text-[11px] font-bold text-white/40 uppercase tracking-wider whitespace-nowrap">
                                            {formatDateDivider(msg.createdAt)}
                                        </span>
                                        <div className="flex-1 h-px bg-white/[0.05]" />
                                    </div>
                                )}

                                <div className="group flex gap-4 px-6 py-2 hover:bg-white/[0.02] transition-colors relative">
                                    <div className="w-10 h-10 rounded-full bg-[#2A2B2F] flex items-center justify-center shrink-0 border border-white/5 overflow-hidden">
                                        <span className="text-sm font-bold text-blue-400">
                                            {msg.senderId?.fullName?.charAt(0) || "?"}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-baseline gap-2 mb-0.5">
                                            <span className="text-sm font-bold text-white hover:underline cursor-pointer">
                                                {msg.senderId?.fullName || "Ghost User"}
                                            </span>
                                            <span className="text-[10px] font-medium text-white/30">
                                                {formatTime(msg.createdAt)}
                                            </span>
                                        </div>
                                        <div className="text-[13.5px] leading-relaxed text-white/80">
                                            {renderMessageContent(msg.content)}
                                        </div>
                                    </div>

                                    {msg.isOptimistic && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                            <div className="w-3 h-3 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {/* Typing Indicator */}
                    {typingUsers.length > 0 && (
                        <div className="px-6 py-2 flex items-center gap-2">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce" />
                            </div>
                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                                {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Input Area */}
            <div className="px-6 pb-6 pt-2 bg-[#1A1B1E]">
                <form onSubmit={handleSend} className="relative group">
                    <div className="flex items-center bg-[#2A2B2F] rounded-lg px-4 py-2.5 transition-shadow group-focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                        <button type="button" className="p-1.5 text-white/30 hover:text-white transition-colors">
                            <Plus size={20} />
                        </button>
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder={`Message # ${roomName}`}
                            className="flex-1 bg-transparent border-none outline-none px-4 text-[13.5px] text-white/90 placeholder:text-white/10"
                        />
                        <div className="flex items-center gap-3">
                            <button type="button" className="p-1.5 text-white/30 hover:text-white transition-colors">
                                <Smile size={20} />
                            </button>
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className={`p-1.5 transition-all ${input.trim() ? "text-blue-500 scale-110" : "text-white/10"}`}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </form>
                <div className="mt-2 flex items-center justify-between text-[10px] font-medium text-white/20 uppercase tracking-wider px-1">
                    <span>Press Enter to send</span>
                    <div className="flex items-center gap-1.5">
                        <Shield size={10} />
                        <span>Slowmode is enabled</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
