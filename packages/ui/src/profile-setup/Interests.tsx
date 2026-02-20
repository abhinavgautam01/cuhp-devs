"use client";

import {
    Brain,
    ShieldCheck,
    Layout,
    Cloud,
    BarChart3,
    Code2,
    Bitcoin,
    Gamepad2,
    Smartphone,
    Cpu,
    Network,
    Infinity
} from "lucide-react";

export interface Interest {
    id: string;
    title: string;
    description: string;
    icon: any; // Using any for Lucide component type consistency
}

export const Interests: Interest[] = [
    {
        id: "ai-ml",
        title: "AI & Machine Learning",
        description: "Neural networks, LLMs, and data-driven intelligence.",
        icon: Brain,
    },
    {
        id: "cybersecurity",
        title: "Cybersecurity",
        description: "Ethical hacking, cryptography, and network defense.",
        icon: ShieldCheck,
    },
    {
        id: "react",
        title: "React Development",
        description: "Modern component-based UI design and state management.",
        icon: Layout,
    },
    {
        id: "cloud",
        title: "Cloud Computing",
        description: "Scalable infrastructure with AWS, Azure, and Docker.",
        icon: Cloud,
    },
    {
        id: "data-science",
        title: "Data Science",
        description: "Statistical analysis, data cleaning, and visualization.",
        icon: BarChart3,
    },
    {
        id: "python",
        title: "Python Core",
        description: "Automation, scripting, and backend system design.",
        icon: Code2,
    },
    {
        id: "blockchain",
        title: "Blockchain",
        description: "Decentralized ledgers and smart contract engineering.",
        icon: Bitcoin,
    },
    {
        id: "game-dev",
        title: "Game Development",
        description: "C# in Unity, Unreal Engine, and real-time physics.",
        icon: Gamepad2,
    },
    {
        id: "mobile",
        title: "Mobile Dev",
        description: "Building native and cross-platform mobile apps.",
        icon: Smartphone,
    },
    {
        id: "rust",
        title: "Rust Systems",
        description: "Memory-safe systems programming for the modern age.",
        icon: Cpu,
    },
    {
        id: "iot",
        title: "Internet of Things",
        description: "Embedded systems and hardware-software integration.",
        icon: Network,
    },
    {
        id: "devops",
        title: "DevOps & CI/CD",
        description: "Pipeline automation and environment orchestration.",
        icon: Infinity,
    },
];

export default Interests;
