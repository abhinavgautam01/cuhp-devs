"use client";

import { useRouter } from "next/navigation";
import OnboardingPage, { OnboardingStepOneData } from "@repo/ui/profile-setup/OnboardingPage";
import { toast } from "../store/useToastStore";
import { useOnboardingStore } from "../store/useOnboardingStore";

export function OnboardingClient() {
    const router = useRouter();
    const setStepOne = useOnboardingStore((state) => state.setStepOne);

    const handleNext = (data: OnboardingStepOneData) => {
        setStepOne(data);
        toast.success("Academic profile saved temporarily.");
        router.push("/onboarding/step2");
    };

    return <OnboardingPage onNext={handleNext} />;
}
