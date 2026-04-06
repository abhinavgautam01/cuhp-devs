"use client";

import type { RefObject } from "react";

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

type CardAnimationSectionProps = {
    heroLoaded: boolean;
    cardsSectionRef: RefObject<HTMLElement | null>;
    spreadProgress: number;
    flipProgress: number;
};

export default function CardAnimationSection({
    heroLoaded,
    cardsSectionRef,
    spreadProgress,
    flipProgress,
}: CardAnimationSectionProps) {
    return (
        <section
            id="devs"
            ref={cardsSectionRef}
            className={`relative w-full min-h-[170vh] transition-all duration-1000 delay-700 ease-out ${
                heroLoaded ? "opacity-100" : "opacity-0"
            }`}
        >
            <div className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-8 py-14">
                <div className="mx-auto w-full max-w-6xl rounded-[2rem] px-4 py-10 md:px-10 md:py-14 backdrop-blur-sm shadow-[0_25px_90px_rgba(0,0,0,0.45)]">
                    <div className="text-center">
                        <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.45em] text-cyan-300/70">
                            CUHP Team
                        </p>
                        <h3 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-white">
                            Devs
                        </h3>
                        <div className="mt-4 h-px w-28 mx-auto bg-linear-to-r from-transparent via-cyan-400/70 to-transparent" />
                    </div>

                    <div className="mt-10 flex justify-center">
                        <div className="relative flex w-[min(96vw,930px)] overflow-visible [perspective:1800px]">
                            {developers.map((developer, index) => {
                                const offset = index - 1;
                                const translateXPercent = offset * 58 * spreadProgress;
                                const rotateY = 180 * flipProgress;
                                const rotateZ = offset * 4 * spreadProgress;
                                const liftY = -12 * Math.abs(offset) * spreadProgress;
                                const scale = 1 - 0.03 * Math.abs(offset) * spreadProgress;
                                const innerRadius = Math.round(26 * spreadProgress);
                                const leftRadius = index === 0 ? 26 : innerRadius;
                                const rightRadius = index === developers.length - 1 ? 26 : innerRadius;
                                const borderRadius = `${leftRadius}px ${rightRadius}px ${rightRadius}px ${leftRadius}px`;

                                return (
                                    <article
                                        key={developer.photo}
                                        className="relative aspect-[2/3] w-1/3 [transform-style:preserve-3d]"
                                        style={{
                                            transform: `translateX(${translateXPercent}%) translateY(${liftY}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                                            zIndex: 50 - Math.abs(offset),
                                        }}
                                    >
                                        <div
                                            className="absolute inset-0 overflow-hidden border border-white/15 [backface-visibility:hidden] shadow-[0_18px_45px_rgba(0,0,0,0.55)]"
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
                                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                                        </div>

                                        <div
                                            className="absolute inset-0 overflow-hidden border border-white/20 [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                                            style={{ borderRadius }}
                                        >
                                            <img
                                                src={developer.photo}
                                                alt={developer.name}
                                                className="h-full w-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                                            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                                                <p className="text-[0.6rem] md:text-[0.7rem] tracking-[0.25em] uppercase text-cyan-300/85">
                                                    {developer.role}
                                                </p>
                                                <p className="text-sm md:text-xl font-semibold text-white">
                                                    {developer.name}
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
