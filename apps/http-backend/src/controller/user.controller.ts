import { Response } from "express";
import { User } from "@repo/db/index.js";
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

export const getDashboardData = async (req: AuthRequest, res: Response) => {
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
