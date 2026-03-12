"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { SemesterData } from "../../lib/mock-resources-data";
import { MdSchool, MdDownload, MdStar, MdAutoStories } from "react-icons/md";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};


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
          <div className="text-primary-custom p-2 bg-primary-custom/10 rounded-lg flex items-center justify-center">
            <MdSchool size={24} />
          </div>
          <h2 className="text-2xl font-bold font-display text-foreground tracking-tight">
            Academic Syllabus
          </h2>
        </div>

        {/* Degree Selection Tabs (Now below the title) */}
        <div className="flex p-1 bg-background rounded-xl w-fit">
          {["BTech", "MCA"].map((degree) => (
            <button
              key={degree}
              onClick={() => handleDegreeChange(degree as "BTech" | "MCA")}
              className={`px-8 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 min-w-[100px] ${activeDegree === degree
                ? "bg-primary-custom text-white shadow-lg shadow-primary-custom/20"
                : "text-slate-500 hover:text-slate-300"
                }`}
            >
              {degree}
            </button>
          ))}
        </div>
      </div>

      {/* Semester Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide border-b border-primary-custom/10">
        {semesters.map((sem) => (
          <button
            key={sem}
            onClick={() => setActiveSemester(sem)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all min-w-[60px] ${activeSemester === sem
              ? "bg-primary-custom/20 text-primary-custom border border-primary-custom"
              : "border border-primary-custom/10 bg-background/50 text-slate-500 hover:border-primary-custom/30"
              }`}
          >
            {sem}
          </button>
        ))}
      </div>

      {/* Content Area: Course Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        key={`${activeDegree}-${activeSemester}`} // Re-trigger animation on tab change
        className="space-y-6"
      >
        {currentCourses.length === 0 ? (
          <div className="p-16 text-center border border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
            <MdAutoStories className="mx-auto mb-4 text-slate-700" size={48} />
            <p className="text-slate-500 font-medium font-display uppercase tracking-widest text-sm">
              No data for {activeDegree} {activeSemester}
            </p>
          </div>
        ) : (
          currentCourses.map((course) => (
            <motion.div
              variants={itemVariants}
              key={course.code}
              className="bg-background/40 backdrop-blur-sm rounded-2xl p-6 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-primary-custom uppercase tracking-[0.2em]">
                      {course.code}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {activeDegree}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-foreground group-hover:text-primary-custom transition-colors duration-300">
                    {course.title}
                  </h3>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-card-custom hover:bg-primary-custom text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all border border-card-border active:scale-95">
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
                        className="flex items-center gap-3 p-3 bg-card-custom/50 rounded-xl border border-card-border group/edu hover:border-primary-custom/20 transition-colors"
                      >
                        <div className="relative w-10 h-10 overflow-hidden rounded-full bg-slate-800 flex-shrink-0">
                          <Image
                            alt={edu.name}
                            src={
                              imgError[edu.name]
                                ? `https://ui-avatars.com/api/?name=${edu.name}&background=var(--primary)&color=fff`
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
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
