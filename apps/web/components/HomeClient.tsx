"use client";

import { useState } from "react";
import Navbar from "@repo/ui/components/Navbar";

import ParticleLogo from "@repo/ui/particle/ParticleLogo";

export default function HomeClient() {
    const [heroLoaded, setHeroLoaded] = useState(false);

    return (
        <>
            {/* Cinematic Background */}
           

            {/* Sequential entry: Navbar appears after hero reassembly */}
            <div className={`fixed top-0 left-0 w-full transition-all duration-1000 ease-out z-50 ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
                <Navbar />
            </div>

            <main className="w-full h-screen flex items-end justify-center px-30 ml-40">
                <div className="w-full max-w-350">
                    <ParticleLogo
                        width={2000}
                        height={1500}
                        logoSrc="/Eagle3.png"
                        logoWidth={700}
                        logoHeight={700}
                        primaryText="CUHP"
                        secondaryText="DEVS"
                        primaryFontSize={400}
                        secondaryFontSize={150}
                        onLoadComplete={() => setHeroLoaded(true)}
                    />
                </div>
            </main>

            {/* University Image & Department Branding */}
            <section
                className={`w-full flex flex-col items-center justify-center py-2 px-6 transition-all duration-1000 delay-500 ease-out 
    ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
            >
                <div className="relative group">
                    <div className="relative">
                        <img
                            src="https://cuhimachal.ac.in/asset/images/header%2002.png"
                            className="h-16 md:h-20 w-auto "
                            alt="Uni-Image"
                        />
                    </div>
                </div>

                <div className="mt-8 text-center space-y-2">
                    <h2 className="text-sm md:text-base font-bold tracking-[0.4em] uppercase text-transparent bg-clip-text bg-linear-to-r from-slate-400 via-white to-slate-400">
                        Department of Computer Science and Informatics
                    </h2>
                    <div className="h-px w-24 mx-auto bg-linear-to-r from-transparent via-cyan-500 to-transparent"></div>
                </div>
            </section>
        </>
    );
}
