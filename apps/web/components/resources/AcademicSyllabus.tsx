"use client";

import { useState } from "react";
import Image from "next/image";
import { SemesterData } from "../../lib/mock-resources-data";
import { MdSchool, MdDownload, MdStar, MdAutoStories } from "react-icons/md";


interface AcademicSyllabusProps {
  initialData: SemesterData;
}

export function AcademicSyllabus({ initialData }: AcademicSyllabusProps) {
  const [activeDegree, setActiveDegree] = useState<"BTech" | "MCA">("BTech");
  const [activeSemester, setActiveSemester] = useState<string>("S4");
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const currentCourses = initialData[activeSemester] || [];

  const semesters =
    activeDegree === "BTech"
      ? ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"]
      : ["S1", "S2", "S3", "S4"];

  const handleDegreeChange = (degree: "BTech" | "MCA") => {
    setActiveDegree(degree);

    const semNumber = parseInt(activeSemester.replace("S", ""));
    if (degree === "MCA" && semNumber > 4) {
      setActiveSemester("S1");
    }
  };

  const handleImageError = (name: string) => {
    setImgError((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <div className="space-y-8">
      {/* Header and Degree Toggle Section */}
      <div className="flex flex-col gap-6">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="text-[#1337ec] p-2 bg-[#1337ec]/10 rounded-lg flex items-center justify-center">
            <MdSchool size={24} />
          </div>
          <h2 className="text-2xl font-bold font-display text-white tracking-tight">
            Academic Syllabus
          </h2>
        </div>

        {/* Degree Selection Tabs (Now below the title) */}
        <div className="flex p-1 bg-slate-900 border border-white/5 rounded-xl w-fit">
          {["BTech", "MCA"].map((degree) => (
            <button
              key={degree}
              onClick={() => handleDegreeChange(degree as "BTech" | "MCA")}
              className={`px-8 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 min-w-[100px] ${
                activeDegree === degree
                  ? "bg-[#1337ec] text-white shadow-lg shadow-[#1337ec]/20"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {degree}
            </button>
          ))}
        </div>
      </div>

      {/* Semester Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide border-b border-white/5">
        {semesters.map((sem) => (
          <button
            key={sem}
            onClick={() => setActiveSemester(sem)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all min-w-[60px] ${
              activeSemester === sem
                ? "bg-[#1337ec]/20 text-[#1337ec] border border-[#1337ec]"
                : "border border-slate-800 bg-slate-900/50 text-slate-500 hover:border-slate-700"
            }`}
          >
            {sem}
          </button>
        ))}
      </div>

      {/* Content Area: Course Cards */}
      <div className="space-y-6">
        {currentCourses.length === 0 ? (
          <div className="p-16 text-center border border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
            <MdAutoStories className="mx-auto mb-4 text-slate-700" size={48} />
            <p className="text-slate-500 font-medium font-display uppercase tracking-widest text-sm">
              No data for {activeDegree} {activeSemester}
            </p>
          </div>
        ) : (
          currentCourses.map((course) => (
            <div
              key={course.code}
              className="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-[#1337ec]/30 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-[#1337ec] uppercase tracking-[0.2em]">
                      {course.code}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {activeDegree}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white group-hover:text-[#1337ec] transition-colors duration-300">
                    {course.title}
                  </h3>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-[#1337ec] text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all border border-white/5 active:scale-95">
                  <MdDownload size={18} />
                  Download Syllabus
                </button>
              </div>

              {/* Recommended Educators Section */}
              {course.educators.length > 0 && (
                <div className="bg-black/20 rounded-2xl p-4 border border-white/5">
                  <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.25em] mb-4">
                    Recommended Educators
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {course.educators.map((edu, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl border border-white/5 group/edu hover:border-[#1337ec]/20 transition-colors"
                      >
                        <div className="relative w-10 h-10 overflow-hidden rounded-full bg-slate-800 flex-shrink-0">
                          <Image
                            alt={edu.name}
                            src={
                              imgError[edu.name]
                                ? `https://ui-avatars.com/api/?name=${edu.name}&background=1337ec&color=fff`
                                : edu.avatar
                            }
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            sizes="40px"
                            onError={() => handleImageError(edu.name)}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white leading-tight truncate">
                            {edu.name}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <MdStar className="text-yellow-600" size={12} />
                            <span className="text-[10px] text-slate-500 font-medium">
                              {edu.rating.toFixed(1)} • {edu.platform}
                            </span>
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
    </div>
  );
}
