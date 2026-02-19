
import type { Metadata } from "next";
import OnboardingPage from "@repo/ui/profile-setup/OnbaordingPage";

export const metadata: Metadata = {
  title: "Academic Profile | Onboarding",
  description: "Set up your academic profile to personalize your learning experience",
};

export default function AcademicProfilePage() {
  return <OnboardingPage/>;
}