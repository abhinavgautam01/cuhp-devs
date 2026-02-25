

import Link from "next/link";
import { motion } from "framer-motion";

interface AuthToggleProps {
  activeTab: "signin" | "signup";
  className?: string;
}

export function AuthToggle({ activeTab, className = "" }: AuthToggleProps) {
  return (
    <div className={`mb-10 flex justify-center ${className}`}>
      <div className="relative inline-flex p-1 rounded-xl bg-[#121a3f] border border-blue-700/20">
        
        {/* Sign In Link */}
        <Link
          href="/signin"
          className={`relative z-10 px-10 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
            activeTab === "signin" ? "text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          {activeTab === "signin" && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-blue-600 rounded-lg -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          Sign In
        </Link>

        {/* Sign Up Link */}
        <Link
          href="/signup"
          className={`relative z-10 px-10 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
            activeTab === "signup" ? "text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          {activeTab === "signup" && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-blue-600 rounded-lg -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          Sign Up
        </Link>
        
      </div>
    </div>
  );
}