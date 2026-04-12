"use client";

import type { IconType } from "react-icons";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const socialLinks: {
    name: string;
    href: string;
    description: string;
    icon: IconType;
}[] = [
    {
        name: "GitHub",
        href: "https://github.com/abhinavgautam01/cuhp-devs",
        description: "Source code and contributions",
        icon: FaGithub,
    },
    {
        name: "X",
        href: "https://x.com/cuhpdevs",
        description: "Community updates and announcements",
        icon: FaXTwitter,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/cuhp-devs",
        description: "Professional network and highlights",
        icon: FaLinkedinIn,
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-white/10 bg-[#040810]/2 backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-14 md:flex-row md:items-start md:justify-between">
                <div className="max-w-2xl space-y-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.42em] text-cyan-300/70">
                        CUHP Devs
                    </p>
                    <h4 className="text-xl font-semibold text-white sm:text-2xl">
                        Department of Computer Science and Informatics
                    </h4>
                    <p className="max-w-xl text-sm text-slate-300/80">
                        Built by student developers at Central University of Himachal Pradesh
                        for collaborative coding, learning, and community growth.
                    </p>
                </div>

                <div className="grid w-full max-w-xl gap-3 sm:grid-cols-3">
                    {socialLinks.map(({ name, href, description, icon: Icon }) => (
                        <a
                            key={name}
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-cyan-400/[0.05]"
                        >
                            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/35 bg-cyan-300/10 text-cyan-200">
                                <Icon className="h-4 w-4" />
                            </div>
                            <p className="text-sm font-semibold text-white">{name}</p>
                            <p className="mt-1 text-xs text-slate-400 transition-colors group-hover:text-slate-300">
                                {description}
                            </p>
                        </a>
                    ))}
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                    <p>{`\u00A9 ${currentYear} CUHP Devs. All rights reserved.`}</p>
                    <p>Central University of Himachal Pradesh</p>
                </div>
            </div>
        </footer>
    );
}
