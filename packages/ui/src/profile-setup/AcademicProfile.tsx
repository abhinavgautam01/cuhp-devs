"use client";

import React, { useState } from "react";
import { FaArrowRight, FaRegCalendar } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { GoInfo } from "react-icons/go"
import { MdOutlineExpandMore } from "react-icons/md"
import Link from "next/link";
import { motion } from "framer-motion";

export default function OnboardingAcademic() {
  const [formData, setFormData] = useState({
    program: "",
    semester: "",
  });

  const programs = [
    "B.Tech Computer Science",
    "MCA",
    
  ];

  const semesters = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center bg-[#101322] text-slate-100 font-display relative overflow-hidden">
      {/* Circuit Background Effect */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(19, 55, 236, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Header / Progress Bar */}
      <header className="w-full max-w-4xl mx-auto px-6 pt-12 relative z-10">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs">Step 1 of 2</span>
              <h2 className="text-2xl font-bold">Academic Profile</h2>
            </div>
            <div className="text-sm font-medium text-slate-400">0% Complete</div>
          </div>
          <div className="w-full h-2 bg-blue-900/30 rounded-full border border-gray-600 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "0%" }}
              className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
            />
          </div>
        </div>
      </header>

      {/* Main Form Area */}
      <main className="grow w-full max-w-4xl mx-auto px-6 py-12 flex flex-col justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold mb-3 tracking-tight">Let's set up your profile</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            We'll use this information to personalize your learning roadmap and connect you with peers in your cohort.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Degree Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold uppercase tracking-wider text-slate-400 ml-1">
              Select Your Degree/Course
            </label>
            <div className="relative group rounded-xl border-2 border-white/10 bg-white/5 transition-all duration-300 focus-within:border-blue-600 focus-within:shadow-[0_0_15px_rgba(37,99,235,0.2)] overflow-hidden">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-blue-500">
                <GiGraduateCap />
              </div>
              <select
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                className="w-full bg-transparent border-none py-5 pl-14 pr-10 appearance-none focus:ring-0 cursor-pointer font-medium text-lg text-white"
              >
                <option value="" disabled className="bg-[#101322]">Choose your program...</option>
                {programs.map(p => <option key={p} value={p} className="bg-[#101322]">{p}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <MdOutlineExpandMore />
              </div>
            </div>
          </div>

          {/* Semester Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold uppercase tracking-wider text-slate-400 ml-1">
              Current Semester
            </label>
            <div className="relative group rounded-xl border-2 border-white/10 bg-white/5 transition-all duration-300 focus-within:border-blue-600 focus-within:shadow-[0_0_15px_rgba(37,99,235,0.2)] overflow-hidden">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-focus-within:text-blue-500">
               <FaRegCalendar />
              </div>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="w-full bg-transparent border-none py-5 pl-14 pr-10 appearance-none focus:ring-0 cursor-pointer font-medium text-lg text-white"
              >
                <option value="" disabled className="bg-[#101322]">Select semester...</option>
                {semesters.map(s => <option key={s} value={s} className="bg-[#101322]">{s}</option>)}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <MdOutlineExpandMore />
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 opacity-60">
          <div className="p-6 rounded-xl border border-dashed border-white/10 flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
            <GoInfo />
            </div>
            <p className="text-sm text-slate-400">
              Choosing your academic profile helps us synchronize your dashboard with the current university curriculum and specific course resources.
            </p>
          </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 w-full bg-[#101322]/80 backdrop-blur-md border-t border-white/10 p-6 z-20">
        <div className="max-w-4xl mx-auto flex justify-end item-end">
          <Link
            href="/onboarding/step2"
            className="bg-blue-600 hover:bg-blue-500 hover:text-lg   text-white font-bold py-3 px-10 rounded-lg shadow-[0_4px_20px_rgba(37,99,235,0.3)] flex items-center gap-2 group transition-all"
          >
            Next: Tech Interests
            <FaArrowRight />
            
          </Link>
        </div>
      </footer>

      {/* Decorative Orbs */}
      <div className="fixed top-0 right-0 -z-0 opacity-30 pointer-events-none">
        <div className="w-100 h-100 bg-blue-600 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}