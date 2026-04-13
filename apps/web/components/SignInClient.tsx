"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignInForm } from "@repo/ui/sign-in/SignInForm";
import { AuthToggle } from "@repo/ui/toogle/AuthToggle";
import { apiFetch } from "../lib/api";
import { toast } from "../store/useToastStore";
import { useAuthStore } from "../store/useAuthStore";

interface SignInFields {
    identifier: string;
    password: string;
    remember: boolean;
}

export function SignInClient() {
    const router = useRouter();
    const { setUser, isAuthenticated, user } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated) {
            if (user?.onboardingCompleted) {
                router.push("/dashboard");
            } else {
                router.push("/onboarding");
            }
        }
    }, [isAuthenticated, user, router]);

    const handleSignIn = async (fields: SignInFields) => {
        try {
            const response = await apiFetch("/auth/signin", {
                method: "POST",
                body: JSON.stringify({
                    identifier: fields.identifier,
                    password: fields.password,
                }),
            });

            setUser(response.user, response.token || null);
            toast.success("Signed in successfully.");
            if (response.user.onboardingCompleted) {
                router.push("/dashboard");
            } else {
                router.push("/onboarding");
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Sign in failed.");
            throw error;
        }
    };

    const handleOAuth = async (provider: "google" | "github") => {
        toast.info(`${provider} OAuth is not implemented yet.`);
    };

    return (
        <div className="">
            <AuthToggle activeTab="signin" />
            <SignInForm className="bg-[#101322]" onSubmit={handleSignIn} onOAuth={handleOAuth} />
        </div>
    );
}
