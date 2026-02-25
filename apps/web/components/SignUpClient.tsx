"use client";

import { useRouter } from "next/navigation";
import { SignUpForm } from "@repo/ui/sign-up/SignUpForm";
import { AuthToggle } from "@repo/ui/toogle/AuthToggle";
import { apiFetch } from "../lib/api";
import { toast } from "../store/useToastStore";

interface SignUpFields {
    fullName: string;
    studentId: string;
    email: string;
    password: string;
    acceptTerms: boolean;
}

export function SignUpClient() {
    const router = useRouter();

    const handleSignUp = async (fields: SignUpFields) => {
        try {
            await apiFetch("/auth/signup", {
                method: "POST",
                body: JSON.stringify({
                    fullName: fields.fullName,
                    studentId: fields.studentId,
                    email: fields.email,
                    password: fields.password,
                }),
            });

            toast.success("Account created successfully.");
            router.push("/onboarding");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Registration failed.");
            throw error;
        }
    };

    const handleOAuth = async (provider: "google" | "github") => {
        toast.info(`${provider} OAuth is not implemented yet.`);
    };

    return (
        <div className="">
            <AuthToggle activeTab="signup" />
            <SignUpForm
                className="bg-[#101322]"
                onSubmit={handleSignUp}
                onOAuth={handleOAuth}
            />
        </div>
    );
}
