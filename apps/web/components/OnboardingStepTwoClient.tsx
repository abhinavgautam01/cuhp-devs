"use client";

import { useRouter } from "next/navigation";
import OnboardingTwo, { OnboardingStepTwoData } from "@repo/ui/profile-setup/OnboardingPageTwo";
import { apiFetch } from "../lib/api";
import { toast } from "../store/useToastStore";
import { useOnboardingStore } from "../store/useOnboardingStore";
import { useAuthStore } from "../store/useAuthStore";

export function OnboardingStepTwoClient() {
    const router = useRouter();
    const stepOneData = useOnboardingStore((state) => state.stepOne);
    const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding);
    const setUser = useAuthStore((state) => state.setUser);

    const saveOnboarding = async (payload: { interests: string[] }) => {
        if (!stepOneData) {
            toast.error("Step 1 data not found. Please complete onboarding again.");
            router.push("/onboarding");
            return;
        }

        await apiFetch("/user/profile", {
            method: "PUT",
            body: JSON.stringify({
                ...stepOneData,
                interests: payload.interests,
            }),
        });

        const profile = await apiFetch("/user/profile");
        setUser(profile);
        resetOnboarding();
        toast.success("Onboarding completed successfully.");
        router.push("/dashboard");
    };

    const handleFinish = async (data: OnboardingStepTwoData) => {
        try {
            await saveOnboarding({ interests: data.interests });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to save onboarding.";
            toast.error(message);
            if (message.toLowerCase().includes("session invalid")) {
                router.push("/signin");
            }
            throw error;
        }
    };

    const handleSkip = async () => {
        try {
            await saveOnboarding({ interests: [] });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to save onboarding.";
            toast.error(message);
            if (message.toLowerCase().includes("session invalid")) {
                router.push("/signin");
            }
            throw error;
        }
    };

    return <OnboardingTwo onFinish={handleFinish} onSkip={handleSkip} />;
}
