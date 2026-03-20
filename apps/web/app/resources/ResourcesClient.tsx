"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AcademicSyllabus } from "../../components/resources/AcademicSyllabus";
import { TechSkills } from "../../components/resources/TechSkills";
import { TelegramLinks } from "../../components/resources/TelegramLinks";
import { DirectCourses } from "../../components/resources/DirectCourses";
import { MdSchool, MdSend, MdFolderZip } from "react-icons/md";

// Define the type based on your mock data structure
interface ResourcesClientProps {
    data: any; // Replace 'any' with your actual ResourcesDataResponse type
}

export function ResourcesClient({ data }: ResourcesClientProps) {
    const [activeTab, setActiveTab] = useState("academic");

    const tabs = [
        { id: "academic", label: "Academic", icon: MdSchool },

        // TODO: will see later...if want to add this...!
        // { id: "tech", label: "Tech Skills", icon: MdTerminal },
        { id: "telegram", label: "Groups", icon: MdSend },
        { id: "vault", label: "The Vault", icon: MdFolderZip },
    ];

    return (
        <>
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-10 p-1 bg-background border border-primary-custom/10 rounded-2xl backdrop-blur-sm">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === tab.id
                            ? "bg-primary-custom text-white shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                            : "text-slate-400 hover:text-foreground hover:bg-white/5"
                            }`}
                    >
                        <tab.icon size={20} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    {/* TODO: add syllabus, previous question papers..! */}
                    {activeTab === "academic" && <AcademicSyllabus initialData={data.academicSyllabus} />}

                    {/* TODO: will see later...if want to add this...! */}
                    {/* {activeTab === "tech" && <TechSkills categories={data.techSkills} />} */}
                    {activeTab === "telegram" && <TelegramLinks />}
                    {activeTab === "vault" && <DirectCourses />}
                </motion.div>
            </AnimatePresence>
        </>
    );
}