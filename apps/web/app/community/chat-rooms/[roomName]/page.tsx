import { cookies } from "next/headers";
import { serverApiFetch } from "../../../../lib/server-api";
import { ChatWindow } from "../../../../components/ChatWindow";
import { redirect } from "next/navigation";

interface RoomPageProps {
    params: Promise<{
        roomName: string;
    }>;
}

export default async function ChatRoomPage({ params }: RoomPageProps) {
    const { roomName } = await params;
    const decodedRoomName = decodeURIComponent(roomName);

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || null;

    if (!token) {
        redirect("/login");
    }

    let initialMessages = [];
    let currentUser = null;

    try {
        // Fetch recent message history
        initialMessages = await serverApiFetch(`/user/community/rooms/${decodedRoomName}/messages`);

        // Fetch current user for ID mapping
        const profile: any = await serverApiFetch("/user/profile");
        currentUser = {
            id: profile._id || profile.id,
            name: profile.fullName || profile.name
        };
    } catch (error) {
        console.error("Failed to load chat room data:", error);
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-[#0B0B0C]">
            <ChatWindow
                roomName={decodedRoomName}
                initialMessages={initialMessages}
                token={token}
                currentUser={currentUser}
            />
        </div>
    );
}
