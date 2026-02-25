import { Response } from "express";
import { User, ChatRoom, Message, ChatRoomName } from "@repo/db/index.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

export const updateProfile = async (req: AuthRequest, res: Response) => {
    try {
        const { program, semester, interests } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            {
                program,
                semester,
                interests: Array.isArray(interests) ? interests : [],
                onboardingCompleted: Boolean(program && semester),
            },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            res.clearCookie("token");
            return res.status(401).json({ message: "Session invalid. Please sign in again." });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
        });
    } catch (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = await User.findById(userId).select("-password");
        if (!user) {
            res.clearCookie("token");
            return res.status(401).json({ message: "Session invalid. Please sign in again." });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Get profile error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Helper to ensure chat rooms exist
const seedRooms = async () => {
    for (const name of Object.values(ChatRoomName)) {
        await ChatRoom.findOneAndUpdate(
            { name },
            { name },
            { upsert: true, new: true }
        );
    }
};

// Seed rooms lazily on first dashboard/community request
let roomsSeeded = false;

const ROOM_NAME_ALIASES: Record<string, ChatRoomName> = {
    "machine learning": ChatRoomName.ML,
    "deep learning": ChatRoomName.DL,
    "data structures & algorithms": ChatRoomName.DSA,
    "blockchain": ChatRoomName.BLOCKCHAIN,
    "blockchain tech": ChatRoomName.BLOCKCHAIN,
    "deep learning mastery": ChatRoomName.DL,
    "rust systems dev": ChatRoomName.DSA,
    "system design": ChatRoomName.DSA,
    "web ecosystem": ChatRoomName.DL,
};

const normalizeRoomName = (rawRoomName: string): ChatRoomName | null => {
    const normalized = decodeURIComponent(rawRoomName).trim().toLowerCase();
    return ROOM_NAME_ALIASES[normalized] ?? null;
};

export const getDashboardData = async (req: AuthRequest, res: Response) => {
    try {
        if (!roomsSeeded) {
            await seedRooms();
            roomsSeeded = true;
        }
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const user = await User.findById(userId).select("-password");
        if (!user) {
            res.clearCookie("token");
            return res.status(401).json({ message: "Session invalid. Please sign in again." });
        }
        //TODO: 

        //This is Mock dashboard data based on user profile
        // In a real app, this would be fetched from various collections
        const dashboardData = {
            user: {
                name: user.fullName,
                role: "Student",
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.fullName}`,
                program: user.program || "Not selected",
                semester: user.semester || "Not selected",
                interests: user.interests || [],
                level: 0,
                xp: 0,
                xpTarget: 100,
                streakDays: 0,
            },
            badges: [
                { id: "1", icon: "school", color: "#1337ec", label: "Freshman" },
                { id: "2", icon: "code", color: "#10b981", label: "First Code" },
                { id: "3", icon: "local_fire_department", color: "#f59e0b", label: "Hot Streak" },
            ],
            feedItems: [
                {
                    id: "f1",
                    type: "announcement",
                    content: "Welcome to the new semester! Check out your updated curriculum.",
                    time: "2h ago",
                    meta: "University",
                    highlight: "New Curriculum",
                },
                {
                    id: "f2",
                    type: "achievement",
                    user: {
                        name: "System",
                        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=system",
                    },
                    content: "You've successfully set up your academic profile!",
                    time: "Just now",
                    meta: "Profile",
                    highlight: "Onboarding Complete",
                }
            ],
            events: [
                {
                    id: "e1",
                    title: "Intro to Web Architecture",
                    date: "24",
                    month: "FEB",
                    time: "10:00 AM",
                    location: "Lab A",
                    isHighlighted: true,
                },
                {
                    id: "e2",
                    title: "Coding Club Meetup",
                    date: "26",
                    month: "FEB",
                    time: "4:00 PM",
                    location: "Online",
                }
            ],
            stats: {
                topPercentile: 0,
                activeStudents: 124,
                registeredCount: 850,
            },
        };

        return res.status(200).json(dashboardData);
    } catch (error) {
        console.error("Get dashboard data error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getCommunityFeed = async (req: AuthRequest, res: Response) => {
    try {
        const feedData = {
            trendingTags: ["#javascript", "#rust", "#algorithms", "#internship", "#react_tips", "#python"],
            posts: [
                {
                    id: "p1",
                    author: {
                        name: "Sarah Jenkins",
                        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAes5h4fmh72X8ydxiowrLL-ybzOL38IODt3PqyfCRPSo-ARtBXANbfbKzMb-bN7y3CFm5AxwBoPDb-R7_UJFcDB1Z_mh4iADbuaLxu1R7QfXupK-do-lkCAvWnI2h6LCQ_0kHPFRm-ybbZiBJ2who5yOndYpLqUkFm4xBNOsZc5ZW0XhNw_t2DXhtQ2_e7VdFEvsrI2kplh3Kgp5GkNs3xDPfIKOGP2zPKGo0qtltg8J-4YM3WUDqkJujrv748MIRE6mCRuI_qD5G4",
                    },
                    time: "2h ago",
                    type: "Snippet",
                    content: "Just optimized my binary search tree traversal. Check out this cleaner way to handle recursive cases! 🚀",
                    code: "function traverse(node) {\n  if (!node) return;\n  // Process left child first\n  traverse(node.left);\n  console.log(node.value);\n  // Then process right\n  traverse(node.right);\n}",
                    likes: 142,
                    comments: 24,
                },
                {
                    id: "p2",
                    author: {
                        name: "Emily Chen",
                        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiHXl0P06fpJnbhQctvcP96mrHRjEHG_v5CCxmj1EesAwjaLDW7psQM_Qs9fuwyz59btEc9Avof9pJuR0ZXeBznXEQsE4sWcCMcd5mWt7C_HTvvQcGT_wqQkFD1Vq58M_SRSbFWUuSTuM-7Gs8DrYf5FlHS5f4--8cY6WgUVy2gLF2LplRYIppQloKsxbArJ6NE3FKC3nf0vUibSHrJUR5lh7ZlcWXF4IQXYS1KxNpXecFAycr3WcuPWjuGQ5MrQjK4aHHHBRZKLoi",
                    },
                    time: "5h ago",
                    type: "Win",
                    content: "Finally landed the Summer SWE Intern role at a top fintech firm! 💳 Thanks everyone for the help!",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiVRIzUad66d9ef4seusla2H8r0wawxNaTwkt8Lv3nGBo45XkHsryONe_eIoecB0DNcKnz99p_MU91D5aJcfbKLbNpHupf77TX3oW10irkz60K9L9wD3TUV1pP1tnTVgm2kSka_es_xUQzl4zdEFn4Y4W-r4yLjyAZQXLjDUZvstM9KHLDAg-wLIyqI__mDXFXKPvfxGAm8U-lmNHjIGL7l3F7rZFfoY1lsBelc5MQWIfk2lIbMWrMOm6a6vwkBlCD2o-85dqEGlGx",
                    likes: 892,
                    comments: 156,
                }
            ],
            leaderboard: [
                {
                    rank: 1,
                    name: "Marcus Zhao",
                    streak: "🔥 42 day streak",
                    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfpcVKWjO4AEFrvRQbTlN2oFj7Cg9JZIGigtJzhKAjVEVG4qtYijisaj3cfaD0tJ23nms7jQi3WiRtD-WrjQZp8Cb9oRV1f7TOWJoXypeK5IFQL6HgIcoflooNNfDvsjFRiLCMNTQ8ftdkBYmoznaZQizRJGzXc9gsvfnW_X7OziwtMw6_WlfcaiDyHLWTrZXkDUwWiz_BWN5femIxz4bnoGrtD9e5qdcAsJ3XZek9lMAh2GE7wSCJ6SLaJG6iqFopyOsBtPfmp4Yy",
                    badges: [{ icon: "pest_control", color: "text-blue-400" }, { icon: "military_tech", color: "text-yellow-500" }]
                },
                {
                    rank: 2,
                    name: "Lena Schmidt",
                    streak: "🔥 28 day streak",
                    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_dN-P2YZa5kDQqH7CYbZO5NGTikg84BA26wobBYF0FIiC0gEtBILB2A1JXSvMhQ5zxEYAZrgJp4vGQF0KeAOnxbwRzAc7qjqDqPzRNt2i9gK2Zdc1lPfAXls80p3RcoC0VeAZFrtq40z1TN2CGkYK4SVDSqgtGD4pmudN227jpEHQSBUFxhFhmRqHMjMqsuFI9uWWQ7LkucLSxrxhuU2KyvQF4E7grbt8WRkc0zbRCBsmnQ-FP12G1aSn484wh84bbG6_GCdv2MMN",
                    badges: [{ icon: "school", color: "text-[#8b5cf6]" }]
                }
            ],
            events: [
                { id: "ev1", month: "Nov", day: "12", title: "Mock Interview Night", time: "6:00 PM • CS Hall" },
                { id: "ev2", month: "Nov", day: "15", title: "Rust Workshop", time: "4:30 PM • Zoom" }
            ]
        };
        return res.status(200).json(feedData);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getCommunityRooms = async (req: AuthRequest, res: Response) => {
    try {
        if (!roomsSeeded) {
            await seedRooms();
            roomsSeeded = true;
        }

        const roomsData = {
            trendingRooms: [
                {
                    id: 1,
                    title: "Deep Learning",
                    description: "Discussing PyTorch, TensorFlow and Neural Network architectures.",
                    badge: "Hot Room",
                    members: "2.1k",
                    icon: "neurology",
                    avatars: [
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuD_MRocfAc3G7cAcAopZxpRTMMkXNFumYLVw-XomndRyV5EcHVrdD65-55rfGYIg9iKQQutDwr02e3qB7zJ9OzKXwQupZ5tFbqDUnYYubfQ4T-T2FIrp9YJehyWAr-3jJa7sbeGZLm54o6NJ1kDiI6bx7ji575hLuMPxdcC2Z6qUj2gEqH50i5Org4eFRMTWk1yUi6iI0bRhR7pUdJEd7x1RRkuVu5wrK5eWw_cCaf5vvoRzSSRupJ-qD87iz1dVtL0uKo5B85b2dmr",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuAes5h4fmh72X8ydxiowrLL-ybzOL38IODt3PqyfCRPSo-ARtBXANbfbKzMb-bN7y3CFm5AxwBoPDb-R7_UJFcDB1Z_mh4iADbuaLxu1R7QfXupK-do-lkCAvWnI2h6LCQ_0kHPFRm-ybbZiBJ2who5yOndYpLqUkFm4xBNOsZc5ZW0XhNw_t2DXhtQ2_e7VdFEvsrI2kplh3Kgp5GkNs3xDPfIKOGP2zPKGo0qtltg8J-4YM3WUDqkJujrv748MIRE6mCRuI_qD5G4",
                    ]
                },
                {
                    id: 2,
                    title: "Data Structures & Algorithms",
                    description: "Memory safety, ownership, and low-level optimization in Rust.",
                    badge: "Featured",
                    members: "890",
                    icon: "data_object",
                    avatars: [
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuBiHXl0P06fpJnbhQctvcP96mrHRjEHG_v5CCxmj1EesAwjaLDW7psQM_Qs9fuwyz59btEc9Avof9pJuR0ZXeBznXEQsE4sWcCMcd5mWt7C_HTvvQcGT_wqQkFD1Vq58M_SRSbFWUuSTuM-7Gs8DrYf5FlHS5f4--8cY6WgUVy2gLF2LplRYIppQloKsxbArJ6NE3FKC3nf0vUibSHrJUR5lh7ZlcWXF4IQXYS1KxNpXecFAycr3WcuPWjuGQ5MrQjK4aHHHBRZKLoi",
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuCfpcVKWjO4AEFrvRQbTlN2oFj7Cg9JZIGigtJzhKAjVEVG4qtYijisaj3cfaD0tJ23nms7jQi3WiRtD-WrjQZp8Cb9oRV1f7TOWJoXypeK5IFQL6HgIcoflooNNfDvsjFRiLCMNTQ8ftdkBYmoznaZQizRJGzXc9gsvfnW_X7OziwtMw6_WlfcaiDyHLWTrZXkDUwWiz_BWN5femIxz4bnoGrtD9e5qdcAsJ3XZek9lMAh2GE7wSCJ6SLaJG6iqFopyOsBtPfmp4Yy",
                    ]
                }
            ],
            communityRooms: [
                { id: 1, title: "Machine Learning", members: "1.2k", icon: "smart_toy", contributor: "@zhao_dev" },
                { id: 2, title: "Blockchain", members: "450", icon: "hub", contributor: "@lena_s" },
                { id: 3, title: "Data Structures & Algorithms", members: "3.4k", icon: "memory", contributor: "@jordan_s" },
                { id: 4, title: "Deep Learning", members: "5.1k", icon: "javascript", contributor: "@sarah_j" }
            ],
            masters: [
                { name: "Marcus Zhao", subtitle: "ML Expert • 42 streak", rank: "Top" },
                { name: "Lena Schmidt", subtitle: "Web3 Guru • 28 streak", rank: "#2" }
            ],
            liveActivity: [
                { user: "Sarah Jenkins", action: "joined", room: "Data Structures & Algorithms", time: "2 mins ago" },
                { user: "Emily Chen", action: "shared a paper in", room: "Deep Learning", time: "14 mins ago" }
            ]
        };
        return res.status(200).json(roomsData);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getCommunitySnippets = async (req: AuthRequest, res: Response) => {
    try {
        const snippetsData = {
            snippets: [
                {
                    id: 1,
                    title: "Efficient QuickSort Impl",
                    language: "Python",
                    code: "def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)",
                    tags: ["#Python", "#DSA", "#Algorithms"],
                    updated: "Updated 2h ago",
                    collection: "Interview Prep",
                },
                {
                    id: 2,
                    title: "Local Storage Custom Hook",
                    language: "React",
                    code: "const useLocalStorage = (key, initialValue) => {\n  const [storedValue, setStoredValue] = useState(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch (error) {\n      return initialValue;\n    }\n  });\n  return [storedValue, setStoredValue];\n};",
                    tags: ["#React", "#Hooks", "#Utils"],
                    updated: "Updated yesterday",
                    collection: "Project X Utils",
                }
            ],
            collections: [
                { label: "All Snippets", count: 42, active: true },
                { label: "Interview Prep", count: 12, active: false },
                { label: "Project X Utils", count: 8, active: false },
                { label: "Favorites", count: 5, active: false },
            ],
            recentTags: ["#Python", "#React", "#DSA", "#Typescript", "#Hooks", "#Algorithms"]
        };
        return res.status(200).json(snippetsData);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getChatMessages = async (req: AuthRequest, res: Response) => {
    try {
        if (!roomsSeeded) {
            await seedRooms();
            roomsSeeded = true;
        }

        const { roomName } = req.params;
        if (typeof roomName !== "string") {
            return res.status(400).json({ message: "Invalid chat room name" });
        }

        const normalizedRoomName = normalizeRoomName(roomName);
        if (!normalizedRoomName) {
            return res.status(404).json({ message: "Chat room not found" });
        }

        const room = await ChatRoom.findOne({ name: normalizedRoomName });

        if (!room) {
            return res.status(404).json({ message: "Chat room not found" });
        }

        const messages = await Message.find({ roomId: room._id, isDeleted: false })
            .sort({ createdAt: -1 })
            .limit(50)
            .populate("senderId", "fullName email");

        // Reverse to get chronological order for the client
        return res.status(200).json(messages.reverse());
    } catch (error) {
        console.error("Get chat messages error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
