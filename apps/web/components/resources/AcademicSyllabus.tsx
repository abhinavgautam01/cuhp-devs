"use client";

import { useState } from "react";
import { SemesterData } from "../../lib/mock-resources-data";
import { MdSchool, MdDownload, MdStar } from "react-icons/md";

export function AcademicSyllabus({ initialData }: { initialData: SemesterData }) {
    const [activeSemester, setActiveSemester] = useState<string>("S4");

    // Fallback if semester doesn't exist in data
    const currentCourses = initialData[activeSemester] || [];
    const semesters = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"];

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-[#1337ec] p-2 bg-[#1337ec]/10 rounded-lg flex items-center justify-center">
                        <MdSchool size={24} />
                    </div>
                    <h2 className="text-2xl font-bold font-display text-white">Academic Syllabus</h2>
                </div>
            </div>

            {/* Semester Toggles */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
                {semesters.map((sem) => (
                    <button
                        key={sem}
                        onClick={() => setActiveSemester(sem)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeSemester === sem
                            ? "bg-[#1337ec] text-white shadow-[0_0_10px_rgba(19,55,236,0.5)]"
                            : "border border-[#1337ec]/20 bg-[#1337ec]/5 hover:bg-[#1337ec]/10 text-slate-300"
                            }`}
                    >
                        {sem}
                    </button>
                ))}
            </div>

            {/* Course List for Active Semester */}
            <div className="space-y-6">
                {currentCourses.length === 0 ? (
                    <div className="p-8 text-center border border-dashed border-slate-700 rounded-2xl text-slate-500">
                        No courses available for {activeSemester} yet.
                    </div>
                ) : (
                    currentCourses.map((course) => (
                        <div key={course.code} className="bg-slate-900 border border-[#1337ec]/10 rounded-2xl p-6 hover:border-[#1337ec]/30 transition-all shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <span className="text-xs font-bold text-[#1337ec] uppercase tracking-wider mb-1 block">
                                        Course Code: {course.code}
                                    </span>
                                    <h3 className="text-xl font-bold font-display text-white">{course.title}</h3>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-[#1337ec]/10 hover:text-[#1337ec] text-slate-200 rounded-xl text-sm font-bold transition-all">
                                    <MdDownload size={16} />
                                    Download Syllabus
                                </button>
                            </div>

                            {/* Recommended Educators Section */}
                            {course.educators.length > 0 && (
                                <div className="bg-slate-800/50 rounded-xl p-4">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Recommended Educators</p>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {course.educators.map((edu, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg border border-[#1337ec]/5">
                                                <img alt={edu.name} className="w-10 h-10 rounded-full object-cover" src={edu.avatar} />
                                                <div>
                                                    <p className="text-sm font-bold text-white">{edu.name}</p>
                                                    <div className="flex items-center gap-1">
                                                        <MdStar className="text-yellow-500" size={14} />
                                                        <span className="text-[10px] text-slate-500">{edu.rating.toFixed(1)} • {edu.platform}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
