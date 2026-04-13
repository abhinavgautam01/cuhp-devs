import { ChatRoomPageClient } from "../../../../components/ChatRoomPageClient";

interface RoomPageProps {
    params: Promise<{
        roomName: string;
    }>;
}

export default async function ChatRoomPage({ params }: RoomPageProps) {
    const { roomName } = await params;
    const decodedRoomName = decodeURIComponent(roomName);

    return <ChatRoomPageClient roomName={decodedRoomName} />;
}
