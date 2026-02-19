
import type { Metadata } from "next";
import AcademicProfile from "@repo/ui/profile-setup/AcademicProfile";

export const metadata: Metadata = {
  title: "Academic Profile | Onboarding",
  description: "Set up your academic profile to personalize your learning experience",
};

export default function AcademicProfilePage() {
  return <AcademicProfile />;
}