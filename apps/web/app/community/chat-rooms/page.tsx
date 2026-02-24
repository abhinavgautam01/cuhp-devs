import ChatRooms from "@repo/ui/community/ChatRooms";
import { serverApiFetch } from "../../../lib/server-api";

export default async function CommunityChatRoomsPage() {
    let roomsData = {
        trendingRooms: [],
        communityRooms: [],
        masters: [],
        liveActivity: [],
    };

    try {
        roomsData = await serverApiFetch("/user/community/rooms");
    } catch (error) {
        console.error("Failed to fetch community rooms:", error);
    }

    return <ChatRooms data={roomsData} />;
}
