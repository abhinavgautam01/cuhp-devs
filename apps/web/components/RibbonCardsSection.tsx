"use client";

import { useEffect, useRef, useState } from "react";

const developers = [
    {
        name: "Developer 01",
        role: "Core Team",
        photo: "/developer-0.jpg",
    },
    {
        name: "Developer 02",
        role: "Core Team",
        photo: "/developer-1.jpg",
    },
    {
        name: "Developer 03",
        role: "Core Team",
        photo: "/developer-2.jpg",
    },
];

const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function RibbonCardsSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);

    const targetProgressRef = useRef(0);
    const smoothProgressRef = useRef(0);
    const emittedProgressRef = useRef(0);

    const targetFlipRef = useRef(0);
    const smoothFlipRef = useRef(0);
    const emittedFlipRef = useRef(0);

    const mouseXRef = useRef(0);
    const mouseYRef = useRef(0);
    const isHoveringRef = useRef(false);

    const [scrollProgress, setScrollProgress] = useState(0);
    const [flipProgress, setFlipProgress] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateTargetProgress = () => {
            const section = sectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight || 1;
            const start = viewportHeight * 0.18;
            const end = -viewportHeight * 1.1;
            const raw = clamp((start - rect.top) / (start - end), 0, 1);

            targetProgressRef.current = raw;

            // Tight flip zone: 0.2 → 0.32 = snaps fast
            const rawFlip = clamp((raw - 0.32) / 0.12, 0, 1);
            targetFlipRef.current = rawFlip;
        };

        const animate = () => {
            // Scroll — slow & cinematic
            smoothProgressRef.current = lerp(
                smoothProgressRef.current,
                targetProgressRef.current,
                0.04
            );
            if (Math.abs(smoothProgressRef.current - emittedProgressRef.current) > 0.0008) {
                emittedProgressRef.current = smoothProgressRef.current;
                setScrollProgress(smoothProgressRef.current);
            }

            // Flip — fast & smooth
            smoothFlipRef.current = lerp(
                smoothFlipRef.current,
                targetFlipRef.current,
                0.18
            );
            if (Math.abs(smoothFlipRef.current - emittedFlipRef.current) > 0.0008) {
                emittedFlipRef.current = smoothFlipRef.current;
                setFlipProgress(smoothFlipRef.current);
            }

            rafRef.current = window.requestAnimationFrame(animate);
        };

        updateTargetProgress();
        rafRef.current = window.requestAnimationFrame(animate);

        window.addEventListener("scroll", updateTargetProgress, { passive: true });
        window.addEventListener("resize", updateTargetProgress);

        return () => {
            window.removeEventListener("scroll", updateTargetProgress);
            window.removeEventListener("resize", updateTargetProgress);
            if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseXRef.current = e.clientX - rect.left;
            mouseYRef.current = e.clientY - rect.top;
            setMousePos({ x: mouseXRef.current, y: mouseYRef.current });
        };

        const handleMouseEnter = () => {
            isHoveringRef.current = true;
            setIsHovering(true);
        };

        const handleMouseLeave = () => {
            isHoveringRef.current = false;
            setIsHovering(false);
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    const spreadProgress = clamp((scrollProgress - 0.08) / 1, 0, 1);
    const swingDirections = [-1, 1, -1];

    const cardStates = developers.map((developer, index) => {
        const offset = index - 1;
        const baseCenter = ((index + 0.5) / developers.length) * 100;

        let cursorDisplaceX = 0;
        let cursorDisplaceY = 0;
        let cursorRotateZ = 0;

        if (isHovering && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const containerWidth = rect.width;
            const containerHeight = rect.height;
            
            const cardCenterX = (baseCenter / 100) * containerWidth;
            const cardCenterY = containerHeight * 0.5;

            const dx = mousePos.x - cardCenterX;
            const dy = mousePos.y - cardCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const maxInfluenceDistance = 280;
            const influence = Math.max(0, 1 - distance / maxInfluenceDistance);
            
            if (influence > 0) {
                const repulsionStrength = 80;
                const angle = Math.atan2(dy, dx);
                cursorDisplaceX = -Math.cos(angle) * influence * repulsionStrength;
                cursorDisplaceY = -Math.sin(angle) * influence * repulsionStrength;
                cursorRotateZ = (offset * 8 - dx * 0.03) * influence;
            }
        }

        

        const translateXPercent = offset * 54 * spreadProgress;
        const swingWave = Math.sin(scrollProgress * Math.PI * 9 + index * 0.8);
        const swingDirection = swingDirections[index] ?? 1;
        const swingAngle =
            (swingDirections[index] ?? 1) *
            swingWave *
            (5.5 + Math.abs(offset) * 2.3) *
            (0.25 + spreadProgress * 0.75) *
            (1 - flipProgress) +
            cursorRotateZ; // Clean clamp to 0 as flip completes

        const liftY =
            -Math.abs(offset) * 16 * spreadProgress +
            Math.cos(scrollProgress * Math.PI * 5 + index) * 2.4 * spreadProgress +
            cursorDisplaceY;

        const tiltX = 10 + spreadProgress * 5 + Math.abs(swingAngle) * 0.2;
        const depth = (1 - Math.abs(offset) * 0.3) * spreadProgress * 20;

        const innerRadius = Math.round(2 + spreadProgress * 22);
        const leftRadius = index === 0 ? 26 : innerRadius;
        const rightRadius = index === developers.length - 1 ? 26 : innerRadius;
        const borderRadius = `${leftRadius}px ${rightRadius}px ${rightRadius}px ${leftRadius}px`;

        const mountX = baseCenter + offset * 1.8;
        const anchorX = baseCenter + translateXPercent / 3 + (cursorDisplaceX * 0.08);
        const ribbonSag =
            7 + spreadProgress * 13 + Math.abs(swingAngle) * 0.95 + (1 - flipProgress) * 6;
        const endY = 36 + spreadProgress * 4.2 + Math.abs(liftY) * 0.06;
        const c1x = mountX + offset * 2.6;
        const c2x = anchorX + swingAngle * 0.15;
        const c1y = 7 + ribbonSag * 0.28;
        const c2y = 14 + ribbonSag;

        const ribbonPath = `M ${mountX} 3 C ${c1x} ${c1y}, ${c2x} ${c2y}, ${anchorX} ${endY}`;

        return {
            developer,
            index,
            borderRadius,
            mountX,
            anchorX,
            endY,
            ribbonPath,
            cardTransform: `translateX(calc(${translateXPercent}% + ${cursorDisplaceX}px)) translateY(${liftY}px) rotateZ(${swingAngle}deg) rotateX(${tiltX}deg) translateZ(${depth}px)`,
            zIndex: 40 - Math.abs(offset),
        };
    });

    return (
        <section ref={sectionRef} className="relative w-full min-h-[260vh] pb-20">
            <div className="sticky top-20 h-[calc(100vh-5rem)] flex items-center justify-center px-3 sm:px-6 md:px-8">
                <div className="w-full max-w-6xl rounded-[2rem] from-white/10 to-white/[0.02] px-4 py-8 sm:px-6 md:px-10 md:py-12 shadow-[0_25px_90px_rgba(0,0,0,0.45)] backdrop-blur-md">
                    <div className="text-center">
                        <p className="text-[0.62rem] md:text-xs uppercase tracking-[0.45em] text-cyan-300/75">
                            CUHP Team
                        </p>
                        <h3 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white">
                            Devs
                        </h3>
                        <div className="mt-4 h-px w-28 mx-auto bg-linear-to-r from-transparent via-cyan-400/70 to-transparent" />
                    </div>

                    <div 
                        ref={containerRef}
                        className="relative mx-auto mt-8 md:mt-10 w-[min(96vw,920px)] h-[min(68vh,540px)]"
                    >
                        <svg
                            className="absolute inset-0 h-full w-full overflow-visible"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <defs>
                                <filter id="ribbon-glow" x="-120%" y="-120%" width="340%" height="340%">
                                    <feGaussianBlur stdDeviation="1.2" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                {cardStates.map(({ index }) => (
                                    <linearGradient
                                        key={`grad-${index}`}
                                        id={`ribbon-gradient-${index}`}
                                        x1="0%"
                                        y1="0%"
                                        x2="0%"
                                        y2="100%"
                                    >
                                        <stop offset="0%" stopColor="#b8fff8" stopOpacity="0.95" />
                                        <stop offset="45%" stopColor="#67e8f9" stopOpacity="0.88" />
                                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.45" />
                                    </linearGradient>
                                ))}
                            </defs>

                            <line
                                x1="8"
                                y1="3"
                                x2="92"
                                y2="3"
                                stroke="rgba(125, 211, 252, 0.3)"
                                strokeWidth="0.7"
                            />

                            {cardStates.map(({ index, ribbonPath, mountX, anchorX, endY }) => (
                                <g key={`ribbon-${index}`}>
                                    <path
                                        d={ribbonPath}
                                        stroke={`url(#ribbon-gradient-${index})`}
                                        strokeWidth="2.8"
                                        fill="none"
                                        strokeLinecap="round"
                                        opacity="0.34"
                                        filter="url(#ribbon-glow)"
                                    />
                                    <path
                                        d={ribbonPath}
                                        stroke={`url(#ribbon-gradient-${index})`}
                                        strokeWidth="1.35"
                                        fill="none"
                                        strokeLinecap="round"
                                    />
                                    <circle cx={mountX} cy="3" r="0.95" fill="#a5f3fc" opacity="0.95" />
                                    <circle cx={anchorX} cy={endY} r="0.85" fill="#67e8f9" opacity="0.85" />
                                </g>
                            ))}
                        </svg>

                        <div className="absolute inset-x-0 top-[33%] flex justify-center [perspective:2200px]">
                            <div className="relative flex w-full max-w-[920px] [transform-style:preserve-3d]">
                                {cardStates.map(({ developer, index, cardTransform, borderRadius, zIndex }) => (
                                    <article
                                        key={index}
                                        className="relative aspect-[2/3] w-1/3 [transform-style:preserve-3d] will-change-transform transition-transform duration-150 ease-out"
                                        style={{ transform: cardTransform, zIndex }}
                                    >
                                        <div
                                            className="relative h-full w-full [transform-style:preserve-3d] will-change-transform"
                                            style={{
                                                transform: `rotateY(${180 * flipProgress}deg)`,
                                            }}
                                        >
                                            {/* Front */}
                                            <div
                                                className="absolute inset-0 overflow-hidden border border-white/15 [backface-visibility:hidden] shadow-[0_18px_45px_rgba(0,0,0,0.58)]"
                                                style={{ borderRadius }}
                                            >
                                                <div
                                                    className="absolute inset-0"
                                                    style={{
                                                        backgroundImage: "url('/Eagle2.svg')",
                                                        backgroundSize: "300% 100%",
                                                        backgroundPosition: `${index * 50}% center`,
                                                        backgroundRepeat: "no-repeat",
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
                                            </div>

                                            {/* Back */}
                                            <div
                                                className="absolute inset-0 overflow-hidden border border-white/20 [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_20px_50px_rgba(0,0,0,0.62)]"
                                                style={{ borderRadius }}
                                            >
                                                <img
                                                    src={developer.photo}
                                                    alt={developer.name}
                                                    className="h-full w-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
                                                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-5">
                                                    <p className="text-[0.54rem] sm:text-[0.62rem] md:text-[0.72rem] tracking-[0.24em] uppercase text-cyan-300/90">
                                                        {developer.role}
                                                    </p>
                                                    <p className="mt-1 text-[0.78rem] sm:text-sm md:text-xl font-semibold text-white leading-tight">
                                                        {developer.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
