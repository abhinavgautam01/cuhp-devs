"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion"
// ─── Types ─────────────────────────────────────────────────────────────────────

interface Interest {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const INTERESTS: Interest[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Neural networks, LLMs, and data-driven intelligence.",
    icon: "psychology",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Ethical hacking, cryptography, and network defense.",
    icon: "security",
  },
  {
    id: "react",
    title: "React Development",
    description: "Modern component-based UI design and state management.",
    icon: "web",
  },
  {
    id: "cloud",
    title: "Cloud Computing",
    description: "Scalable infrastructure with AWS, Azure, and Docker.",
    icon: "cloud",
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Statistical analysis, data cleaning, and visualization.",
    icon: "bar_chart",
  },
  {
    id: "python",
    title: "Python Core",
    description: "Automation, scripting, and backend system design.",
    icon: "code",
  },
  {
    id: "blockchain",
    title: "Blockchain",
    description: "Decentralized ledgers and smart contract engineering.",
    icon: "currency_bitcoin",
  },
  {
    id: "game-dev",
    title: "Game Development",
    description: "C# in Unity, Unreal Engine, and real-time physics.",
    icon: "sports_esports",
  },
  {
    id: "mobile",
    title: "Mobile Dev",
    description: "Building native and cross-platform mobile apps.",
    icon: "smartphone",
  },
  {
    id: "rust",
    title: "Rust Systems",
    description: "Memory-safe systems programming for the modern age.",
    icon: "settings_input_component",
  },
  {
    id: "iot",
    title: "Internet of Things",
    description: "Embedded systems and hardware-software integration.",
    icon: "router",
  },
  {
    id: "devops",
    title: "DevOps & CI/CD",
    description: "Pipeline automation and environment orchestration.",
    icon: "all_inclusive",
  },
];

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

  return (
    <>

      <div className="bg-[#f6f6f8] dark:bg-[#101322] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col circuit-bg">
        {/* Header with Progress */}
        <header className="w-full max-w-6xl mx-auto px-6 pt-12">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-[#1337ec] font-bold uppercase tracking-widest text-xs">
                  Step 2 of 2
                </span>
                <h2 className="text-2xl font-bold">Customize Your Feed</h2>
              </div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {selectedInterests.size} interest{selectedInterests.size !== 1 ? 's' : ''} selected
              </div>
            </div>
            
           <div className="w-full h-2 bg-blue-900/30 rounded-full border border-gray-600 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%"  }}
              transition={{ duration: 0.4 }}
              className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
            />
          </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow w-full max-w-6xl mx-auto px-6 py-12">
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-3 tracking-tight">
              What sparks your curiosity?
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
              Select the topics you want to see in your daily feed. We&apos;ll tailor your 
              coding challenges and learning paths based on these choices.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {INTERESTS.map((interest) => {
              const isSelected = selectedInterests.has(interest.id);
              
              return (
                <div
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`
                    group relative p-5 rounded-xl transition-all duration-300 cursor-pointer
                    ${isSelected
                      ? 'bg-white dark:bg-[#1337ec]/5 border-2 border-[#1337ec]/20 hover:border-[#1337ec]/50 neon-border-glow'
                      : 'bg-white dark:bg-white/5 border-2 border-slate-200 dark:border-white/5 hover:border-[#1337ec]/40 hover:bg-[#1337ec]/5'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className={`
                        p-3 rounded-lg transition-colors
                        ${isSelected
                          ? 'bg-[#1337ec]/10 text-[#1337ec]'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 group-hover:text-[#1337ec]'
                        }
                      `}
                    >
                      <span className="material-icons-round text-3xl">
                        {interest.icon}
                      </span>
                    </div>
                    
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[#1337ec] flex items-center justify-center">
                        <span className="material-icons-round text-white text-xs">
                          check
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold mb-1 uppercase tracking-tight">
                    {interest.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">
                    {interest.description}
                  </p>
                </div>
              );
            })}
          </div>
        </main>

        {/* Footer Action Bar */}
        <footer className="sticky bottom-0 w-full bg-white/80 dark:bg-[#101322]/80 backdrop-blur-md border-t border-slate-200 dark:border-white/10 p-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleSkip}
              className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-medium px-4 py-2"
            >
              Skip for Now
            </button>
            
            <button
              onClick={handleNext}
              className="bg-[#1337ec] hover:bg-[#1337ec]/90 text-white font-bold py-3 px-10 rounded-lg shadow-[0_4px_20px_rgba(19,55,236,0.3)] flex items-center gap-2 group transition-all"
            >
              Next: Personalize My Dashboard
             <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>
        </footer>

        
      </div>
    </>
  );
}