import avatars from "../../assets/Avatar";
import { RightPanel } from "@repo/ui/sign-up/RightPanel";
import { SignUpClient } from "../../components/SignUpClient";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen bg-[#0a1033]">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-[#101322]">
        <SignUpClient />
      </div>

      <RightPanel
        avatars={avatars.map((src: string) => ({ src }))}
      />
    </div>
  );
}
