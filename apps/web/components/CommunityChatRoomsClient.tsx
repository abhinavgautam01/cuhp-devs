"use client";

import { useEffect, useState } from "react";
import ChatRooms from "@repo/ui/community/ChatRooms";
import { apiFetch } from "../lib/api";
import { useAuthStore } from "../store/useAuthStore";

const DEFAULT_ROOMS_DATA = {
    trendingRooms: [],
    communityRooms: [],
    masters: [],
    liveActivity: [],
};

export function CommunityChatRoomsClient() {
    const token = useAuthStore((state) => state.token);
    const [roomsData, setRoomsData] = useState(DEFAULT_ROOMS_DATA);

    useEffect(() => {
        let isMounted = true;

        const loadRooms = async () => {
            try {
                const data = await apiFetch("/user/community/rooms");
                if (isMounted && data) {
                    setRoomsData(data);
                }
            } catch (error) {
                console.error("Failed to fetch community rooms:", error);
            }
        };

        loadRooms();

        return () => {
            isMounted = false;
        };
    }, []);

    return <ChatRooms data={roomsData} token={token} />;
}
