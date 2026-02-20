"use client";

import { useRouter } from "next/navigation";
import avatars from "../../assets/Avatar";
import { SignUpForm } from "@repo/ui/sign-up/SignUpForm";
import { RightPanel } from "@repo/ui/sign-up/RightPanel";
import { AuthToggle } from "@repo/ui/toogle/AuthToggle";

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = async (fields: any) => {
    try {
      // TODO:Implement registration logic here
      console.log("Sign up submitted:", fields);

      // Example:
      // const res = await registerUser(fields);

      // Simulate successful registration
      const registrationSuccessful = true;

      if (registrationSuccessful) {
        //  Redirect to onboarding
        router.push("/onboarding");
      }

    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    try {
      console.log("OAuth sign-up with:", provider);
      //TODO: OAuth Logic

      // Example:
      // await signIn(provider);

      // After successful OAuth
      router.push("/onboarding");

    } catch (error) {
      console.error("OAuth failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a1033]">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-[#101322]">
        <div>
          <AuthToggle activeTab="signup" />

          <SignUpForm
            className="bg-[#101322]"
            onSubmit={handleSignUp}     //  Pass handler
            onOAuth={handleOAuth}       //  Optional OAuth support
          />
        </div>
      </div>

      {/* Right Side */}
      <RightPanel
        avatars={avatars.map((src: string) => ({ src }))}
      />
    </div>
  );
}