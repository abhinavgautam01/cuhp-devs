"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import Interests from "./Interests";

// ─── Component ─────────────────────────────────────────────────────────────────

export default function OnboardingTwo() {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<Set<string>>(new Set());

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleNext = () => {
    const interestsArray = Array.from(selectedInterests);
    console.log("Selected interests:", interestsArray);

    // TODO: Save to database/API

    // Navigate to next step
    router.push("/onboarding/dashboard");
  };

  const handleSkip = () => {
    router.push("/onboarding/dashboard");
  };

  const isFormComplete = selectedInterests.size > 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#101322] text-slate-100 font-display relative overflow-hidden">

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(19, 55, 236, 0.15) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header with Progress */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-12 relative z-10">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs">
                Step 2 of 2
              </span>
              <h2 className="text-2xl font-bold">Customize Your Feed</h2>
            </div>
            <div className="text-sm font-medium text-slate-400">
              {isFormComplete ? "100% Complete" : "50% Complete"}
            </div>
          </div>

          <div className="w-full h-2 bg-blue-900/30 rounded-full border border-gray-600 overflow-hidden">
            <motion.div
              initial={{ width: "50%" }}
              animate={{ width: isFormComplete ? "100%" : "50%" }}
              transition={{ duration: 0.4 }}
              className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold mb-3 tracking-tight">
            What sparks your curiosity?
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Select the topics you want to see in your daily feed. We&apos;ll tailor your
            coding challenges and learning paths based on these choices.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Interests.map((interest) => {
            const isSelected = selectedInterests.has(interest.id);
            const Icon = interest.icon;

            return (
              <motion.div
                key={interest.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleInterest(interest.id)}
                className={`
                  group relative p-5 rounded-xl transition-all duration-300 cursor-pointer border-2
                  ${isSelected
                    ? "bg-blue-600/10 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.15)]"
                    : "bg-white/5 border-white/10 hover:border-blue-500/50 hover:bg-blue-600/5"
                  }
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`
                      p-3 rounded-lg transition-colors
                      ${isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-white/5 text-slate-400 group-hover:text-blue-500"
                      }
                    `}
                  >
                    <Icon size={24} />
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_10px_rgba(37,99,235,0.5)]">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold mb-1 uppercase tracking-tight text-white">
                  {interest.title}
                </h3>
                <p className="text-sm text-slate-400 leading-snug">
                  {interest.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </main>

      {/* Footer Action Bar */}
      <footer className="sticky bottom-0 w-full bg-[#101322]/80 backdrop-blur-md border-t border-white/10 p-6 z-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleSkip}
            className="text-slate-400 hover:text-white transition-colors font-medium px-4 py-2"
          >
            Skip for Now
          </button>

          <button
            onClick={handleNext}
            disabled={!isFormComplete}
            className={`
              ${isFormComplete
                ? "bg-blue-600 hover:bg-blue-500 shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
                : "bg-gray-600 cursor-not-allowed opacity-50"
              }
              text-white font-bold py-3 px-10 rounded-lg flex items-center gap-2 group transition-all
            `}
          >
            Finish Onboarding
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </footer>

      {/* Decorative Orb */}
      <div className="fixed top-0 right-0 z-0 opacity-20 pointer-events-none">
        <div className="w-100 h-100 bg-blue-600 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}