"use client";

import { useEffect, useRef } from "react";

type RibbonCardProps = {
    developer: {
        name: string;
        role: string;
        photo: string;
    };
    index: number;
    scrollProgress: number;
};

export default function RibbonCard({ developer, index, scrollProgress }: RibbonCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const ribbonRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        if (!cardRef.current || !ribbonRef.current) return;

        const baseStretch = 60;
        const maxStretch = 200;
        const stretch = baseStretch + scrollProgress * (maxStretch - baseStretch);

        const ribbonPath = `M 50 0 Q 50 ${stretch * 0.5} 50 ${stretch}`;
        ribbonRef.current.setAttribute("d", ribbonPath);

        const rotation = scrollProgress * 15 * (index % 2 === 0 ? 1 : -1);
        const swing = Math.sin(scrollProgress * Math.PI) * 10 * (index % 2 === 0 ? 1 : -1);

        cardRef.current.style.transform = `
            translateX(${swing}px) 
            rotateY(${rotation}deg) 
            rotateX(${scrollProgress * -5}deg)
        `;
    }, [scrollProgress, index]);

    const offsetX = (index - 1) * 320;

    return (
        <div
            className="absolute top-0"
            style={{
                left: `calc(50% + ${offsetX}px)`,
                transform: "translateX(-50%)",
            }}
        >
            <svg
                className="absolute top-0 left-1/2 -translate-x-1/2 overflow-visible"
                width="100"
                height="250"
                style={{ zIndex: 10 }}
            >
                <defs>
                    <linearGradient id={`ribbon-gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
                    </linearGradient>
                </defs>
                <path
                    ref={ribbonRef}
                    d="M 50 0 Q 50 30 50 60"
                    stroke={`url(#ribbon-gradient-${index})`}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    style={{
                        filter: "drop-shadow(0 2px 8px rgba(96, 165, 250, 0.3))",
                    }}
                />
                <circle cx="50" cy="0" r="4" fill="#60a5fa" />
            </svg>

            <div
                ref={cardRef}
                className="relative w-64 h-96 mt-16"
                style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.1s ease-out",
                }}
            >
                <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-gradient-to-br from-slate-800 to-slate-900">
                    <img
                        src={developer.photo}
                        alt={developer.name}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                        <p className="text-xs tracking-[0.25em] uppercase text-cyan-300/90 mb-2">
                            {developer.role}
                        </p>
                        <p className="text-2xl font-semibold text-white">
                            {developer.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
