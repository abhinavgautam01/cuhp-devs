"use client";

import { useState, useEffect, useRef } from "react";
import { useSocket } from "../hooks/useSocket";
import {
    Send,
    Hash,
    Users,
    Shield,
    Plus,
    Smile,
    ImageIcon,
    Bell,
    ChevronDown,
    Brain,
    Info,
    MoreVertical,
    Paperclip,
    Mic,
    Copy,
    Check,
    Search,
    Settings,
    User,
    FileText,
    LinkIcon
} from "../lib/icons";

interface Message {
    _id: string;
    content: string;
    senderId: {
        _id: string;
        fullName: string;
        email: string;
        avatar?: string;
    };
    createdAt: string;
    isOptimistic?: boolean;
}

interface Member {
    _id: string;
    fullName?: string;
    email?: string;
    avatar?: string;
    isOnline?: boolean;
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
    const [showSidebar, setShowSidebar] = useState(true);
    const [members, setMembers] = useState<Member[]>([]);
    const [onlineMemberIds, setOnlineMemberIds] = useState<string[]>([]);

    const scrollRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { isConnected, joinRoom, leaveRoom, sendMessage, socket } = useSocket(token);

    useEffect(() => {
        setMounted(true);
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: mounted ? "smooth" : "auto",
            });
        }
    }, [messages, typingUsers, mounted]);

    useEffect(() => {
        joinRoom(roomName);
        return () => leaveRoom(roomName);
    }, [roomName, isConnected]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/community/rooms/${roomName}/members`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setMembers(data);
                }
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };

        if (roomName && token) {
            fetchMembers();
        }
    }, [roomName, token]);

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (message: Message) => {
            setMessages((prev) => {
                const filtered = prev.filter(m => !(m.isOptimistic && m.content === message.content && m.senderId._id === message.senderId._id));
                return [...filtered, message];
            });

            // If sender is not in members list (first time message), refresh members
            setMembers(prev => {
                if (!prev.find(m => m._id === message.senderId._id)) {
                    const isSelf = message.senderId._id === currentUser?.id;
                    return [...prev, {
                        ...message.senderId,
                        fullName: isSelf ? (currentUser?.name || message.senderId.fullName) : message.senderId.fullName,
                        isOnline: true
                    }];
                }
                return prev;
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

        const handleOnlineMembers = ({ onlineMembers }: { onlineMembers: any[] }) => {
            setOnlineMemberIds(onlineMembers.map(m => m._id));

            // Sync online members into the members list
            setMembers(prev => {
                const combined = [...prev];
                onlineMembers.forEach(om => {
                    const existingIndex = combined.findIndex(m => m._id === om._id);
                    const isSelf = om._id === currentUser?.id;
                    const resolvedName = isSelf ? (currentUser?.name || om.fullName) : om.fullName;

                    if (existingIndex === -1) {
                        combined.push({
                            _id: om._id,
                            fullName: resolvedName,
                            email: om.email
                        });
                    } else {
                        const existing = combined[existingIndex];
                        // Only update if we have a name and the existing one is missing
                        if (existing && resolvedName && !existing.fullName) {
                            combined[existingIndex] = { ...existing, fullName: resolvedName };
                        }
                    }
                });
                return combined;
            });
        };

        socket.on("new-message", handleNewMessage);
        socket.on("user-typing", handleTyping);
        socket.on("user-stop-typing", handleStopTyping);
        socket.on("room-members-online", handleOnlineMembers);

        return () => {
            socket.off("new-message", handleNewMessage);
            socket.off("user-typing", handleTyping);
            socket.off("user-stop-typing", handleStopTyping);
            socket.off("room-members-online", handleOnlineMembers);
        };
    }, [socket, currentUser]);

    const handleSend = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
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
        if (textareaRef.current) textareaRef.current.style.height = "auto";

        if (socket) {
            socket.emit("stop-typing", { roomName });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);

        // Auto-expand textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }

        if (socket && !isTyping && e.target.value.trim()) {
            setIsTyping(true);
            socket.emit("typing", { roomName });
            setTimeout(() => {
                setIsTyping(false);
                socket.emit("stop-typing", { roomName });
            }, 3000);
        }
    };

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

    const getUtcDateKey = (iso: string) => {
        try {
            return new Date(iso).toISOString().slice(0, 10);
        } catch (e) { return ""; }
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

    const renderMessageContent = (content: string) => {
        // Detect code blocks (multiline content starting with def/class or indent)
        if (content.includes("def ") || content.includes("class ") || content.includes("import ")) {
            return (
                <div className="mt-3 bg-card-custom rounded-xl border border-card-border overflow-hidden max-w-2xl shadow-2xl">
                    <div className="px-4 py-2 bg-foreground/5 border-b border-card-border flex items-center justify-between">
                        <span className="text-[10px] font-mono text-muted-custom uppercase tracking-widest">code_snippet.py</span>
                        <button className="text-muted-custom/40 hover:text-foreground transition-colors">
                            <Copy size={14} />
                        </button>
                    </div>
                    <div className="p-4 font-mono text-[13px] leading-relaxed text-foreground/80">
                        <pre className="whitespace-pre-wrap">{content}</pre>
                    </div>
                </div>
            );
        }

        // Simple mention highlight
        const parts = content.split(/(@\w+)/g);
        return parts.map((part, i) => {
            if (part.startsWith("@")) {
                return (
                    <span key={i} className="text-primary-custom font-bold cursor-pointer hover:underline">
                        {part}
                    </span>
                );
            }
            return part;
        });
    };

    return (
        <div className="flex-1 flex overflow-hidden bg-background relative border-x border-primary-custom/10">
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0 h-full">
                {/* Header */}
                <header className="h-16 shrink-0 border-b border-card-border px-6 flex items-center justify-between bg-background/80 backdrop-blur-md z-30">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary-custom/10 flex items-center justify-center text-primary-custom shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                            <Brain size={24} />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg leading-tight text-foreground/90">{roomName}</h2>
                            <p className="text-[11px] text-muted-custom flex items-center gap-1.5 font-medium uppercase tracking-wider">
                                <span className={`w-1.5 h-1.5 rounded-full ${onlineMemberIds.length > 0 ? "bg-green-500 animate-pulse" : "bg-muted-custom/20"}`} />
                                {onlineMemberIds.length} members active now
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">

                        <button
                            onClick={() => setShowSidebar(!showSidebar)}
                            className={`p-2 rounded-lg transition-all ${showSidebar ? 'text-primary-custom bg-primary-custom/10' : 'text-muted-custom hover:text-foreground hover:bg-foreground/5'}`}
                        >
                            <Info size={18} />
                        </button>
                    </div>
                </header>

                {/* Messages Space */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                    {messages.map((msg, i) => {
                        const prevMsg = messages[i - 1];
                        const showDateDivider = !prevMsg || getUtcDateKey(msg.createdAt) !== getUtcDateKey(prevMsg.createdAt);

                        return (
                            <div key={msg._id} className="w-full">
                                {showDateDivider && (
                                    <div className="flex items-center gap-6 my-10">
                                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-card-border to-transparent" />
                                        <span className="text-[10px] font-black text-muted-custom uppercase tracking-[0.3em]">
                                            {formatDateDivider(msg.createdAt)}
                                        </span>
                                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-card-border to-transparent" />
                                    </div>
                                )}

                                <div className="flex gap-4 group animate-[fadeSlideUp_0.3s_ease_forwards]">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-card-border flex items-center justify-center shrink-0 overflow-hidden relative shadow-lg">
                                        {msg.senderId?.email ? (
                                            <img
                                                src={((currentUser && (msg.senderId as any)._id === currentUser.id) ? currentUser.avatar : msg.senderId.avatar) || `https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.senderId.fullName}`}
                                                className="w-full h-full object-cover"
                                                alt="User"
                                            />
                                        ) : (
                                            <span className="text-sm font-bold text-primary-custom">{msg.senderId?.fullName?.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-baseline gap-3 mb-1">
                                            <span className="font-bold text-sm text-primary-custom hover:underline cursor-pointer">{msg.senderId?.fullName}</span>
                                            <span className="text-[10px] text-muted-custom uppercase tracking-tighter font-medium">{formatTime(msg.createdAt)}</span>
                                        </div>
                                        <div className="text-[13.5px] text-foreground/70 leading-relaxed max-w-3xl">
                                            {renderMessageContent(msg.content)}
                                        </div>
                                    </div>

                                    {msg.isOptimistic && (
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}

                    {typingUsers.length > 0 && (
                        <div className="flex items-center gap-3 px-2">
                            <div className="flex gap-1">
                                <span className="w-1 h-1 bg-primary-custom rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-1 h-1 bg-primary-custom rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-1 h-1 bg-primary-custom rounded-full animate-bounce" />
                            </div>
                            <p className="text-[10px] text-muted-custom/30 font-bold uppercase tracking-widest italic">
                                {typingUsers.join(", ")} is typing...
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer Input */}
                <footer className="p-4 bg-background/50 border-none backdrop-blur-xl">
                    <div className="max-w-4xl mx-auto relative">
                        <form
                            onSubmit={(e) => {
                                handleSend(e);
                                if (textareaRef.current) textareaRef.current.focus();
                            }}
                            className="flex items-end gap-3 bg-foreground/[0.03] rounded-2xl p-3 focus-within:bg-foreground/[0.06] transition-all duration-300 shadow-2xl"
                        >

                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                rows={1}
                                className="flex-1 bg-transparent border-0 outline-none focus:ring-0 resize-none py-2.5 text-[13.5px] text-foreground/90 placeholder:text-muted-custom/20 custom-scrollbar max-h-[200px]"
                                placeholder={`Message # ${roomName}...`}
                            />
                            <div className="flex items-center gap-1.5 px-1.5 pb-1">
                                <button type="button" className="p-2 text-muted-custom/30 hover:text-foreground transition-colors hover:bg-foreground/5 rounded-xl">
                                    <Smile size={20} />
                                </button>
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className={`p-2.5 rounded-xl transition-all duration-500 shadow-lg ${input.trim()
                                        ? 'bg-primary-custom text-primary-foreground-custom shadow-primary-custom/20 hover:scale-105 hover:bg-primary-hover-custom'
                                        : 'bg-foreground/5 text-muted-custom/10'
                                        }`}
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </div>
                </footer>
            </div>

            {/* Room Sidebar */}
            {showSidebar && (
                <aside className="hidden xl:flex flex-col w-80 shrink-0 p-6 space-y-8 overflow-y-auto custom-scrollbar border-l border-card-border bg-background/30 animate-[fadeSlideLeft_0.4s_ease_forwards]">
                    {/* Room Details Bundle */}
                    <section>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-bold text-[10px] tracking-[0.2em] text-muted-custom uppercase">Room Overview</h3>
                            <button className="text-muted-custom/20 hover:text-foreground transition-colors">
                                <Settings size={14} />
                            </button>
                        </div>
                        <div className="bg-card-custom rounded-2xl border border-card-border overflow-hidden transition-all hover:border-primary-custom/30 shadow-xl">
                            <div className="h-24 bg-gradient-to-br from-primary-custom/40 to-purple-500/40 relative">
                                <div className="absolute inset-0 bg-black/20" />
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-20" />
                            </div>
                            <div className="p-5 -mt-10 relative z-10 text-center flex flex-col items-center">
                                <div className="w-16 h-16 rounded-2xl bg-background border-4 border-background flex items-center justify-center text-primary-custom mb-4 shadow-2xl group">
                                    <Brain size={32} className="group-hover:scale-110 transition-transform" />
                                </div>
                                <h4 className="font-bold text-xl mb-1.5 text-foreground/90">{roomName}</h4>
                                <p className="text-xs text-muted-custom leading-relaxed mb-6 max-w-[200px]">Advanced topics in {roomName.toLowerCase()} and neural research.</p>

                            </div>
                        </div>
                    </section>

                    {/* Active Members section */}
                    <section>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-bold text-[10px] tracking-[0.2em] text-muted-custom uppercase">Members — {members.length}</h3>
                        </div>
                        <div className="space-y-4">
                            {members
                                .sort((a, b) => {
                                    const aOnline = onlineMemberIds.includes(a._id);
                                    const bOnline = onlineMemberIds.includes(b._id);
                                    if (aOnline && !bOnline) return -1;
                                    if (!aOnline && bOnline) return 1;

                                    const aIsSelf = a._id === currentUser?.id;
                                    const bIsSelf = b._id === currentUser?.id;
                                    const nameA = (aIsSelf ? currentUser?.name : a.fullName) || a.fullName || "User";
                                    const nameB = (bIsSelf ? currentUser?.name : b.fullName) || b.fullName || "User";
                                    return nameA.localeCompare(nameB);
                                })
                                .map((member) => {
                                    const isOnline = onlineMemberIds.includes(member._id);
                                    const isSelf = member._id === currentUser?.id;
                                    const displayName = (isSelf ? (currentUser?.name || member.fullName) : member.fullName) || "User";
                                    return (
                                        <div key={member._id} className="flex items-center gap-3 p-1 group cursor-pointer">
                                            <div className="relative">
                                                <div className="w-9 h-9 rounded-xl overflow-hidden border border-card-border group-hover:border-primary-custom/50 transition-colors">
                                                    <img
                                                        src={((isSelf && currentUser) ? currentUser.avatar : member.avatar) || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.fullName}`}
                                                        className="w-full h-full object-cover"
                                                        alt="Member"
                                                    />
                                                </div>
                                                <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-background ${isOnline ? 'bg-green-500' : 'bg-muted-custom/20'}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold truncate text-foreground/80 group-hover:text-foreground transition-colors">
                                                    {displayName} {isSelf && "(You)"}
                                                </p>
                                                <p className="text-[10px] text-muted-custom uppercase font-bold tracking-widest">{isOnline ? "Online" : 'Offline'}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </section>

                    {/* Shared Assets grid */}
                    <section>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-bold text-[10px] tracking-[0.2em] text-muted-custom uppercase">Shared Assets</h3>
                            <button className="text-[10px] text-primary-custom font-bold uppercase hover:underline">View All</button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="aspect-square rounded-xl bg-foreground/[0.03] border border-card-border flex items-center justify-center hover:border-primary-custom/40 hover:bg-foreground/[0.05] transition-all cursor-pointer group">
                                <FileText size={18} className="text-muted-custom/20 group-hover:text-primary-custom transition-colors" />
                            </div>
                            <div className="aspect-square rounded-xl bg-foreground/[0.03] border border-card-border flex items-center justify-center hover:border-primary-custom/40 hover:bg-foreground/[0.05] transition-all cursor-pointer group">
                                <LinkIcon size={18} className="text-muted-custom/20 group-hover:text-primary-custom transition-colors" />
                            </div>
                            <div className="aspect-square rounded-xl bg-foreground/[0.03] border border-card-border overflow-hidden hover:border-primary-custom/40 transition-all cursor-pointer relative group">
                                <img
                                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=200"
                                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                                    alt="Asset"
                                />
                                <div className="absolute inset-0 bg-primary-custom/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </section>
                </aside>
            )}
        </div>
    );
}
