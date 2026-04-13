import { create } from "zustand";

export interface OnboardingStepOneData {
    program: string;
    semester: string;
    handle: string;
}

export interface OnboardingStepTwoData {
    interests: string[];
}

interface OnboardingState {
    stepOne: OnboardingStepOneData | null;
    stepTwo: OnboardingStepTwoData | null;
    setStepOne: (data: OnboardingStepOneData) => void;
    setStepTwo: (data: OnboardingStepTwoData) => void;
    resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
    stepOne: null,
    stepTwo: null,
    setStepOne: (data) => set({ stepOne: data }),
    setStepTwo: (data) => set({ stepTwo: data }),
    resetOnboarding: () => set({ stepOne: null, stepTwo: null }),
}));
