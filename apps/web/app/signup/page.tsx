"use client";

import avatars from "../../assets/page";
import { SignUpForm } from "@repo/ui/sign-up/SignUpForm";
import { RightPanel } from "@repo/ui/sign-up/RightPanel";
import { AuthToggle } from "@repo/ui/toogle/AuthToggle";

export default function SignUpPage() {
  const handleSignUp = async (fields: any) => {
    // TODO: Implement your registration logic here
    // Example: await registerUser(fields);
    console.log("Sign up submitted:", fields);
  };

  const handleOAuth = (provider: "google" | "github") => {
    // TODO: Implement your OAuth logic here
    // Example: await signIn(provider);
    console.log("OAuth sign-up with:", provider);
  };

  return (
    <div className="flex min-h-screen bg-[#0a1033]">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16  bg-[#101322]">
        <div className="">
          <AuthToggle activeTab="signup" />
          <SignUpForm className="bg-[#101322]" />
        </div>
      </div>
      <RightPanel avatars={avatars.map((src: string) => ({ src }))} />
    </div>
  );
}
