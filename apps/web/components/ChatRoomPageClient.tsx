"use client";

import { useEffect, useMemo, useState } from "react";
import { ChatWindow } from "./ChatWindow";
import { useAuthStore } from "../store/useAuthStore";
import { apiFetch } from "../lib/api";

interface ChatRoomPageClientProps {
    roomName: string;
}

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
}

export function ChatRoomPageClient({ roomName }: ChatRoomPageClientProps) {
    const user = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);
    const [initialMessages, setInitialMessages] = useState<Message[]>([]);

    useEffect(() => {
        let isMounted = true;

        const loadMessages = async () => {
            const url = `/user/community/rooms/${encodeURIComponent(roomName)}/messages`;
            console.log(`[ChatRoomPageClient] Fetching history from: ${url}`);
            try {
                const messages = await apiFetch(url);
                console.log(`[ChatRoomPageClient] Received ${Array.isArray(messages) ? messages.length : 'error/null'} messages`);
                if (isMounted && Array.isArray(messages)) {
                    setInitialMessages(messages);
                }
            } catch (error) {
                console.error("[ChatRoomPageClient] Failed to load chat room data:", error);
            }
        };

        loadMessages();

        return () => {
            isMounted = false;
        };
    }, [roomName]);

    const currentUser = useMemo(() => {
        if (!user) return null;
        return {
            id: user.id,
            name: user.fullName,
            avatar: user.avatar,
        };
    }, [user]);

    return (
        <div className="flex-1 flex flex-col h-full bg-background">
            <ChatWindow
                roomName={roomName}
                initialMessages={initialMessages}
                token={token}
                currentUser={currentUser}
            />
        </div>
    );
}
