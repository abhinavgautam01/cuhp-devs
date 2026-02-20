import type { Metadata } from "next";
import OnboardingPageTwo from "@repo/ui/profile-setup/OnboardingPageTwo";

export const metadata: Metadata = {
  title: "Academic Profile | OnboardingTwo",
  description: "Set up your academic profile to personalize your learning experience",
};

export default function AcademicProfilePage() {
  return <OnboardingPageTwo/>;
}